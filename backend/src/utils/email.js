const nodemailer = require('nodemailer');
const env = require('../config/env');
const logger = require('./logger');

let transporter;

const getTransporter = () => {
  if (transporter) {
    return transporter;
  }

  if (env.smtpHost && env.smtpUser && env.smtpPass) {
    transporter = nodemailer.createTransport({
      host: env.smtpHost,
      port: env.smtpPort,
      secure: env.smtpSecure,
      auth: {
        user: env.smtpUser,
        pass: env.smtpPass,
      },
    });
    return transporter;
  }

  transporter = nodemailer.createTransport({
    jsonTransport: true,
  });
  return transporter;
};

const sendEmail = async ({ to, subject, html, text }) => {
  const info = await getTransporter().sendMail({
    from: env.smtpFrom,
    to,
    subject,
    html,
    text,
  });

  if (info.message) {
    logger.info(`Email prepared for ${to}`);
  }

  return info;
};

const sendRegistrationEmail = ({ to, fullName }) =>
  sendEmail({
    to,
    subject: 'Welcome to Business for All',
    text: `Hi ${fullName}, your Business for All account has been created successfully.`,
    html: `<p>Hi ${fullName},</p><p>Your <strong>Business for All</strong> account has been created successfully.</p><p>You can now explore franchise categories and submit your application.</p>`,
  });

const sendApplicationStatusEmail = ({ to, fullName, categoryTitle, status, adminNotes }) =>
  sendEmail({
    to,
    subject: `Application ${status}: ${categoryTitle}`,
    text: `Hi ${fullName}, your application for ${categoryTitle} is now ${status}.${adminNotes ? ` Notes: ${adminNotes}` : ''}`,
    html: `<p>Hi ${fullName},</p><p>Your application for <strong>${categoryTitle}</strong> is now <strong>${status}</strong>.</p>${adminNotes ? `<p><strong>Admin notes:</strong> ${adminNotes}</p>` : ''}`,
  });

const sendSupportLeadEmail = ({ name, email, phone, message }) =>
  sendEmail({
    to: env.supportEmail,
    subject: `New contact lead from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nMessage: ${message}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone || 'N/A'}</p><p><strong>Message:</strong> ${message}</p>`,
  });

module.exports = {
  sendEmail,
  sendRegistrationEmail,
  sendApplicationStatusEmail,
  sendSupportLeadEmail,
};
