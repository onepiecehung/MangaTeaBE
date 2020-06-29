const RABBIT = require("./init");
const {
    JOB_NAME
} = require("../../../globalConstant/index")
const logger = require("../../../util/logger")

async function createQueue() {
    try {
        await RABBIT.initChannel();
        RABBIT.initQueue(JOB_NAME.TEST_RABBIT, true);
        RABBIT.initQueue(JOB_NAME.SEND_EMAIL_REG, true);
        RABBIT.initQueue(JOB_NAME.FORGOT_PASSWORD, true);
        logger.info('AMPQ queue is running...');
    } catch (error) {
        logger.error('AMPQ: createQueue initChannel error:');
        logger.error(error);
    }
}

function createWorkers() {
    RABBIT.initChannel().then(() => {
        require('./channel.rabbit');
        logger.info('AMPQ worker is running...');
    }).catch(error => {
        logger.error('AMPQ: createWorkers initChannel error:');
        logger.error(error);
    });
}

module.exports = {
    createWorkers,
    createQueue
};
