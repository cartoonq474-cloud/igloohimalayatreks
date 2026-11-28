'use strict';

const express = require('express');
const { z } = require('zod');

const { prisma } = require('../db/prisma');
const { AppError, asyncHandler, sendSuccess } = require('../utils/http');
const { validate } = require('../middleware/validate');
const { requireAuth, requirePermission } = require('../middleware/auth');
const { requireCsrf } = require('../middleware/csrf');
const { recordAuditLog } = require('../services/auditService');

const router = express.Router();
router.use(requireAuth);

const idParamSchema = z.object({
  id: z.coerce.number().int().positive()
});

const listQuerySchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'QUOTED', 'NEGOTIATING', 'BOOKED', 'ARCHIVED', 'SPAM']).optional(),
  priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT']).optional(),
  source: z.enum(['MODAL', 'CONTACT_PAGE', 'CUSTOM_PLAN', 'WHATSAPP_CALLBACK']).optional(),
  assignedToId: z.coerce.number().int().positive().optional(),
  q: z.string().trim().max(150).optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(25)
});

const updateInquirySchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'QUOTED', 'NEGOTIATING', 'BOOKED', 'ARCHIVED', 'SPAM']).optional(),
  priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT']).optional(),
  assignedToId: z.number().int().positive().nullable().optional()
});

const addNoteSchema = z.object({
  noteText: z.string().trim().min(2).max(3000),
  nextFollowUpAt: z.string().datetime().optional().nullable()
});

function buildWhereClause(query) {
  const where = {};
  if (query.status) where.status = query.status;
  if (query.priority) where.priority = query.priority;
  if (query.source) where.source = query.source;
  if (query.assignedToId) where.assignedToId = query.assignedToId;
  if (query.q) {
    where.OR = [
      { referenceCode: { contains: query.q, mode: 'insensitive' } },
      { name: { contains: query.q, mode: 'insensitive' } },
      { email: { contains: query.q, mode: 'insensitive' } },
      { subject: { contains: query.q, mode: 'insensitive' } },
      { phone: { contains: query.q, mode: 'insensitive' } }
    ];
  }
  return where;
}

function escapeCsvCell(val) {
  const str = val === null || val === undefined ? '' : String(val);
  // Neutralize spreadsheet formula injection
  const safe = /^[=+\-@]/.test(str) ? `'${str}` : str;
  return `"${safe.replace(/"/g, '""')}"`;
}

router.get(
  '/staff-options',
  requirePermission('inquiries:read'),
  asyncHandler(async (_req, res) => {
    const staff = await prisma.user.findMany({
      where: { isActive: true },
      orderBy: { fullName: 'asc' },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: { select: { name: true, displayName: true } }
      }
    });
    return sendSuccess(res, { staff });
  })
);

router.get(
  '/export.csv',
  requirePermission('inquiries:export'),
  validate({ query: listQuerySchema }),
  asyncHandler(async (req, res) => {
    const where = buildWhereClause(req.query);
    const items = await prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 5000,
      include: {
        assignedTo: { select: { fullName: true, email: true } }
      }
    });

    const headers = [
      'Reference',
      'Status',
      'Priority',
      'Source',
      'Name',
      'Email',
      'Phone',
      'Travelers',
      'Preferred Date',
      'Subject',
      'Assigned To',
      'Created At'
    ];
    const rows = items.map((inq) =>
      [
        inq.referenceCode,
        inq.status,
        inq.priority,
        inq.source,
        inq.name,
        inq.email,
        inq.phone,
        inq.travelersLabel || '',
        inq.preferredDate || '',
        inq.subject,
        inq.assignedTo ? inq.assignedTo.fullName : 'Unassigned',
        inq.createdAt.toISOString()
      ]
        .map(escapeCsvCell)
        .join(',')
    );

    const csv = [headers.map(escapeCsvCell).join(','), ...rows].join('\r\n');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="igloo-inquiries-export.csv"');
    return res.status(200).send(csv);
  })
);

router.get(
  '/',
  requirePermission('inquiries:read'),
  validate({ query: listQuerySchema }),
  asyncHandler(async (req, res) => {
    const where = buildWhereClause(req.query);
    const skip = (req.query.page - 1) * req.query.limit;

    const [items, total, countsByStatus] = await Promise.all([
      prisma.inquiry.findMany({
        where,
        skip,
        take: req.query.limit,
        orderBy: { createdAt: 'desc' },
        include: {
          assignedTo: { select: { id: true, fullName: true, email: true } },
          package: { select: { id: true, slug: true, title: true } },
          _count: { select: { notes: true } }
        }
      }),
      prisma.inquiry.count({ where }),
      prisma.inquiry.groupBy({
        by: ['status'],
        _count: { _all: true }
      })
    ]);

    return sendSuccess(
      res,
      {
        inquiries: items,
        statusSummary: countsByStatus.reduce((acc, row) => {
          acc[row.status] = row._count._all;
          return acc;
        }, {})
      },
      200,
      {
        page: req.query.page,
        limit: req.query.limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / req.query.limit))
      }
    );
  })
);

router.get(
  '/:id',
  requirePermission('inquiries:read'),
  validate({ params: idParamSchema }),
  asyncHandler(async (req, res, next) => {
    const inquiry = await prisma.inquiry.findUnique({
      where: { id: req.params.id },
      include: {
        assignedTo: { select: { id: true, fullName: true, email: true } },
        package: { select: { id: true, slug: true, title: true } },
        notes: {
          orderBy: { createdAt: 'desc' },
          include: {
            author: { select: { id: true, fullName: true, email: true } }
          }
        }
      }
    });

    if (!inquiry) {
      return next(new AppError(404, 'INQUIRY_NOT_FOUND', 'Inquiry not found.'));
    }

    return sendSuccess(res, { inquiry });
  })
);

router.patch(
  '/:id',
  requireCsrf,
  requirePermission('inquiries:write'),
  validate({ params: idParamSchema, body: updateInquirySchema }),
  asyncHandler(async (req, res, next) => {
    const existing = await prisma.inquiry.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      return next(new AppError(404, 'INQUIRY_NOT_FOUND', 'Inquiry not found.'));
    }

    if (req.body.assignedToId !== undefined && !req.currentUser.hasPermission('inquiries:assign')) {
      return next(new AppError(403, 'FORBIDDEN', 'Missing required permission: inquiries:assign'));
    }

    const updateData = {};
    if (req.body.status !== undefined) updateData.status = req.body.status;
    if (req.body.priority !== undefined) updateData.priority = req.body.priority;
    if (req.body.assignedToId !== undefined) {
      if (req.body.assignedToId !== null) {
        const assignee = await prisma.user.findUnique({ where: { id: req.body.assignedToId } });
        if (!assignee || !assignee.isActive) {
          return next(new AppError(400, 'INVALID_ASSIGNEE', 'Selected staff member is not active.'));
        }
      }
      updateData.assignedToId = req.body.assignedToId;
    }

    const updated = await prisma.inquiry.update({
      where: { id: req.params.id },
      data: updateData,
      include: {
        assignedTo: { select: { id: true, fullName: true, email: true } }
      }
    });

    await recordAuditLog({
      userId: req.currentUser.id,
      action: req.body.assignedToId !== undefined ? 'ASSIGN' : 'UPDATE',
      entityType: 'Inquiry',
      entityId: updated.id,
      summary: `Updated inquiry ${updated.referenceCode} (${updated.status})`,
      diffJson: updateData,
      req
    });

    return sendSuccess(res, { inquiry: updated });
  })
);

router.post(
  '/:id/notes',
  requireCsrf,
  requirePermission('inquiries:write'),
  validate({ params: idParamSchema, body: addNoteSchema }),
  asyncHandler(async (req, res, next) => {
    const inquiry = await prisma.inquiry.findUnique({ where: { id: req.params.id } });
    if (!inquiry) {
      return next(new AppError(404, 'INQUIRY_NOT_FOUND', 'Inquiry not found.'));
    }

    const note = await prisma.inquiryNote.create({
      data: {
        inquiryId: inquiry.id,
        authorId: req.currentUser.id,
        noteText: req.body.noteText,
        nextFollowUpAt: req.body.nextFollowUpAt ? new Date(req.body.nextFollowUpAt) : null
      },
      include: {
        author: { select: { id: true, fullName: true, email: true } }
      }
    });

    await recordAuditLog({
      userId: req.currentUser.id,
      action: 'ADD_NOTE',
      entityType: 'Inquiry',
      entityId: inquiry.id,
      summary: `Added follow-up note to inquiry ${inquiry.referenceCode}`,
      req
    });

    return sendSuccess(res, { note }, 201);
  })
);

module.exports = router;
