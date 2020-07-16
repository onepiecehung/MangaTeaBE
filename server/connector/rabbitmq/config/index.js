const JOB_NAME = {
    TEST_RABBIT: 'TEST_RABBIT',
    SEND_EMAIL: 'SEND_EMAIL',
    SEND_EMAIL_REG: "SEND_EMAIL_REG",
    REGISTER_BONUS: 'REGISTER_BONUS',
    FORGOT_PASSWORD: "FORGOT_PASSWORD",
    RESEND_OTP: "RESEND_OTP",
    UPLOAD_KIT: "UPLOAD_KIT"
};

/**
 * @param RABBIT
 * @param RABBIT.URL
 */

const RABBIT_URL = process.env.RABBIT_URL || `amqp://ds112:ds112@localhost:5672/truyentranh`;

module.exports = {
    JOB_NAME,
    RABBIT_URL
}