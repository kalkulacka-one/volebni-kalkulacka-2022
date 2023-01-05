import nodemailer from 'nodemailer';

function getTransporter() {
  if (!process.env.EMAIL_SERVER_HOST) {
    throw new Error('EMAIL_SERVER_HOST not set');
  }
  if (!process.env.EMAIL_SERVER_PORT) {
    throw new Error('EMAIL_SERVER_PORT not set');
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT),
    secure: process.env.EMAIL_SERVER_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASS,
    },
  });
}

export function sendEmail(
  to: string,
  subject: string,
  html: string,
  text?: string
) {
  const transporter = getTransporter();
  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
    text,
  });
}
