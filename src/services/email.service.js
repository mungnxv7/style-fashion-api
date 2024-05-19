import nodemailer from "nodemailer";
import config from "../config/config.js";
import { layoutMail, mailType } from "../config/email.js";

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
console.log(config.env);
if (config.env !== "test") {
  transport
    .verify()
    .then(() => console.log("Connected to email server"))
    .catch(() =>
      console.log(
        "Unable to connect to email server. Make sure you have configured the SMTP options in .env"
      )
    );
}

const sendEmail = async (to, subject, type, verificationEmailUrl, token) => {
  const msg = {
    from: config.email.from,
    to,
    subject,
    html: layoutMail(type, verificationEmailUrl, token),
  };
  await transport.sendMail(msg);
};

const sendResetPasswordEmail = async (to, token) => {
  const subject = "Reset password";
  const resetPasswordUrl = `http://localhost:8000/reset-password?token=${token}`;
  await sendEmail(
    to,
    subject,
    mailType.FORGOT_PASSWORD,
    resetPasswordUrl,
    token
  );
};

const sendVerificationEmail = async (to, token) => {
  const subject = "Email Verification";
  const verificationEmailUrl = `http://localhost:8000//verify-email?token=${token}`;
  await sendEmail(
    to,
    subject,
    mailType.VERIFICATION_EMAIL,
    verificationEmailUrl,
    token
  );
};

const emailService = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
};

export default emailService;
