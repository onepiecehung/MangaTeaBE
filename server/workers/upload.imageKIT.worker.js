import { JOB_NAME } from "../connector/rabbitmq/config/index";
import RABBIT from "../connector/rabbitmq/init/index";

import * as ChapterRepository from "../../packages/repository/chapter.repository";

RABBIT.consumeData(JOB_NAME.UPLOAD_KIT, async (msg, channel) => {
    try {
        let message = JSON.parse(msg.content.toString());

    } catch (error) {
        logger.error('upload to KIT error');
        logger.error(error);
        channel.nack(msg);
        return false;
    }
})