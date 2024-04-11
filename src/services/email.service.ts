import nodemailer from 'nodemailer';
import config from '../config/config';
import logger from '../config/logger';
import AppDataSource from '../database/config';

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to: string, subject: string, text: string): Promise<any> => {
  const msg = { from: config.email.from, to, subject, text };
  await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to: string, token: string): Promise<any> => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://link-to-app/reset-password?token=${token}`;
  const text = `Querido usuário,
  Para redefinir sua senha, clique neste link: ${resetPasswordUrl}
  Se você não solicitou nenhuma redefinição de senha, ignore este e-mail.`;
  await sendEmail(to, subject, text);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to: string, token: string): Promise<any> => {
  const subject = 'Email Verification';
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
  const text = `Querido usuário,
  Para verificar seu e-mail, clique neste link: ${verificationEmailUrl}
  Se você não criou uma conta, ignore este e-mail.`;
  await sendEmail(to, subject, text);
};

export = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
};
