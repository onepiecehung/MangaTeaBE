const RABBIT = require("./init");
const {
  JOB_NAME
} = require("./config/index")
const logger = require("../../../util/logger")

async function createQueue() {
  try {
    await RABBIT.initChannel();
    RABBIT.initQueue(JOB_NAME.TEST_RABBIT, false);
    logger.info('AMPQ queue is running...');
  } catch (error) {
    console.log('AMPQ: createQueue initChannel error:');
    console.log(error);
  }
}

function createWorkers() {
  RABBIT.initChannel().then(() => {
    require('./channel.rabbit');
    logger.info('AMPQ worker is running...');
  }).catch(error => {
    console.log('AMPQ: createWorkers initChannel error:');
    console.log(error);
  });
}

module.exports = {
  createWorkers,
  createQueue
};
