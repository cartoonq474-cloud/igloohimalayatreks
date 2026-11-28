'use strict';

const nodemailer = require('nodemailer');

let cachedTransporter = null;

function isSmtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function getTransporter() {
  if (!isSmtpConfigured()) return null;
  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: parseInt(process.env.SMTP_PORT || '587', 10) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }
  return cachedTransporter;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function sendInquiryNotifications(inquiry) {
  const transporter = getTransporter();
  if (!transporter) {
    return { sent: false, reason: 'SMTP_NOT_CONFIGURED' };
  }

  const fromAddress = process.env.MAIL_FROM || 'Igloo Himalaya Treks <info@igloohimalayatreks.com>';
  const toAddress = process.env.MAIL_TO_INQUIRIES || 'info@igloohimalayatreks.com';

  try {
    await transporter.sendMail({
      from: fromAddress,
      to: toAddress,
      replyTo: inquiry.email,
      subject: `[${inquiry.referenceCode}] ${inquiry.subject} — ${inquiry.name}`,
      html: `
        <h2>New Website Inquiry (${escapeHtml(inquiry.referenceCode)})</h2>
        <table cellpadding="6" cellspacing="0" border="1" style="border-collapse:collapse;font-family:Arial,sans-serif;">
          <tr><td><strong>Reference</strong></td><td>${escapeHtml(inquiry.referenceCode)}</td></tr>
          <tr><td><strong>Source</strong></td><td>${escapeHtml(inquiry.source)}</td></tr>
          <tr><td><strong>Name</strong></td><td>${escapeHtml(inquiry.name)}</td></tr>
          <tr><td><strong>Email</strong></td><td>${escapeHtml(inquiry.email)}</td></tr>
          <tr><td><strong>Phone / WhatsApp</strong></td><td>${escapeHtml(inquiry.phone)}</td></tr>
          <tr><td><strong>Travelers</strong></td><td>${escapeHtml(inquiry.travelersLabel || 'Not specified')}</td></tr>
          <tr><td><strong>Preferred Date</strong></td><td>${escapeHtml(inquiry.preferredDate || 'Flexible')}</td></tr>
          <tr><td><strong>Package</strong></td><td>${escapeHtml(inquiry.packageTitleSnapshot || inquiry.subject)}</td></tr>
          <tr><td><strong>Message</strong></td><td>${escapeHtml(inquiry.message).replace(/\n/g, '<br>')}</td></tr>
          <tr><td><strong>Source URL</strong></td><td>${escapeHtml(inquiry.sourceUrl || '')}</td></tr>
        </table>
      `
    });

    await transporter.sendMail({
      from: fromAddress,
      to: inquiry.email,
      subject: `Namaste ${inquiry.name} — Inquiry Received (${inquiry.referenceCode})`,
      html: `
        <p>Namaste <strong>${escapeHtml(inquiry.name)}</strong>,</p>
        <p>Thank you for contacting <strong>Igloo Himalaya Treks Pvt. Ltd.</strong>! We have received your inquiry (Reference: <strong>${escapeHtml(inquiry.referenceCode)}</strong>) regarding <strong>${escapeHtml(inquiry.subject)}</strong>.</p>
        <p>Our senior Sherpa expedition planner in Kathmandu is reviewing your request and will reply within <strong>2–4 hours</strong> with your personalized route proposal and confirmed quote.</p>
        <p>For immediate assistance, message us 24/7 on WhatsApp: <a href="https://wa.me/9779860843980">+977 9860843980</a>.</p>
        <p>Warm Himalayan regards,<br><strong>Igloo Himalaya Treks Team</strong><br>Kathmandu, Nepal</p>
      `
    });

    return { sent: true };
  } catch (err) {
    console.warn('[MailService] Failed to send inquiry email:', err.message);
    return { sent: false, reason: err.message };
  }
}

module.exports = {
  isSmtpConfigured,
  sendInquiryNotifications
};
