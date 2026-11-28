'use strict';

const express = require('express');
const { prisma } = require('../db/prisma');
const { asyncHandler, sendSuccess } = require('../utils/http');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.use(requireAuth);

router.get(
  '/summary',
  asyncHandler(async (_req, res) => {
    const [
      packagesCount,
      publishedPackagesCount,
      destinationsCount,
      blogsCount,
      pagesCount,
      mediaCount,
      newInquiriesCount,
      totalInquiriesCount,
      pendingReviewsCount,
      approvedReviewsCount,
      usersCount,
      recentInquiries,
      recentAuditLogs
    ] = await Promise.all([
      prisma.package.count(),
      prisma.package.count({ where: { status: 'PUBLISHED' } }),
      prisma.destination.count(),
      prisma.blogPost.count(),
      prisma.page.count(),
      prisma.mediaAsset.count(),
      prisma.inquiry.count({ where: { status: 'NEW' } }),
      prisma.inquiry.count(),
      prisma.review.count({ where: { status: 'PENDING' } }),
      prisma.review.count({ where: { status: 'APPROVED' } }),
      prisma.user.count({ where: { isActive: true } }),
      prisma.inquiry.findMany({
        take: 6,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          referenceCode: true,
          name: true,
          email: true,
          subject: true,
          status: true,
          priority: true,
          createdAt: true
        }
      }),
      prisma.auditLog.findMany({
        take: 8,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          action: true,
          entityType: true,
          summary: true,
          createdAt: true,
          user: { select: { fullName: true, email: true } }
        }
      })
    ]);

    return sendSuccess(res, {
      metrics: {
        packages: { total: packagesCount, published: publishedPackagesCount },
        destinations: { total: destinationsCount },
        blogs: { total: blogsCount },
        pages: { total: pagesCount },
        media: { total: mediaCount },
        inquiries: { openNew: newInquiriesCount, total: totalInquiriesCount },
        reviews: { pending: pendingReviewsCount, approved: approvedReviewsCount },
        staff: { active: usersCount }
      },
      recentInquiries,
      recentAuditLogs
    });
  })
);

module.exports = router;
