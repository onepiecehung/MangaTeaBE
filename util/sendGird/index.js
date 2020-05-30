import SendGridMail from '@sendgrid/mail';
import logger from "../logger";
import { SENDGRID_API_KEY, SENDER_EMAIL, FOOTER_EMAIL } from '../../globalConstant/index';

SendGridMail.setApiKey(SENDGRID_API_KEY);
/**
 * Send email sendgird
 * @param {string} to Email To
 * @param {string} templateId Template in Dynamic Templates
 * @param {object} data Object Data
 * */
export async function sendEmail(to, templateId, data) {
  try {
    return SendGridMail.send({
      from: SENDER_EMAIL,
      to: to,
      templateId: templateId,
      dynamic_template_data: Object.assign(data, FOOTER_EMAIL),
    });
  } catch (error) {
    logger.error('SendGrid sendEmail error:', error);
    logger.error('SendGrid sendEmail from, to, templateId:', from, to, templateId);
    logger.error('SendGrid sendEmail data:', data);
    throw error;
  }
}
