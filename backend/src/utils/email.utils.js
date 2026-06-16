const nodemailer = require("nodemailer");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let transporter;

const getFromAddress = () => {
  const emailFrom = process.env.SMTP_FROM || process.env.SMTP_USER;

  if (!emailFrom || !emailPattern.test(emailFrom)) {
    throw new Error("SMTP_FROM or SMTP_USER must be a valid email address");
  }

  return `"IJAHT Journal" <${emailFrom}>`;
};

const getTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    throw new Error("SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS are required for email delivery");
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });
  }

  return transporter;
};

const sendEmail = async ({ to, subject, html, attachments }) => {
  if (!to || !emailPattern.test(String(to).trim())) {
    throw new Error("A valid recipient email address is required");
  }

  if (!subject || !html) {
    throw new Error("Email subject and html body are required");
  }

  try {
    const result = await getTransporter().sendMail({
      from: getFromAddress(),
      to,
      subject,
      html,
      attachments,
    });

    console.log("Email sent successfully:", {
      to,
      subject,
      messageId: result.messageId,
      accepted: result.accepted,
      rejected: result.rejected,
    });

    return result;
  } catch (error) {
    console.error("Email sending failed:", {
      to,
      subject,
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
    });
    throw error;
  }
};

exports.sendMailToAdmin = async ({ subject, html, attachments }) => {
  if (!process.env.ADMIN_EMAIL || !emailPattern.test(process.env.ADMIN_EMAIL)) {
    throw new Error("ADMIN_EMAIL must be configured as a valid email address");
  }

  return sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject,
    html,
    attachments,
  });
};

exports.sendMailToUser = async ({ userEmail, subject, html }) => {
  return sendEmail({
    to: userEmail,
    subject,
    html,
  });
};

exports.sendEmail = sendEmail;
exports.verifyEmailTransport = async () => getTransporter().verify();
