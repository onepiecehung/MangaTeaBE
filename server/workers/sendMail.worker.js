import { TEMPLATE, JOB_NAME } from "../../globalConstant/index";
import * as logger from "../../util/logger";
import * as SendGrid from "../../util/sendGird/index";
import RABBIT from "../connector/rabbitmq/init/index";

import * as UserRepository from "../../packages/repository/user.repository";

RABBIT.consumeData(JOB_NAME.SEND_EMAIL_REG, async (msg, channel) => {
    try {
        let message = JSON.parse(msg.content.toString());
        logger.debug(message);
        let userInfo = await UserRepository.findByEmail(message.email);
        if (!userInfo) {
            logger.debug("email not found");
            return true;
        }
        // logger.info(userInfo)
        await SendGrid.sendEmail(message.email, TEMPLATE.REG, message);
        // userInfo.set("verifyEmail", true);
        // await UserRepository.save(userInfo);
        logger.info(`send email register success to: ${message.fullName}`);
        channel.ack(msg);
        return true;
    } catch (error) {
        logger.error('send email register error');
        logger.error(error);
        channel.nack(msg);
        return false;
    }
})
