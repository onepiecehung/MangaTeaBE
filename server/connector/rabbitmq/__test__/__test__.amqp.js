const RABBIT = require("../init");
const JOB_NAME = require("../config/index").JOB_NAME

RABBIT.consumeData(JOB_NAME.TEST_RABBIT, async (msg, channel) => {
  try {
    let message = JSON.parse(msg.content.toString());
    console.log('rabbitmq: ' + message.msg);
    return true;
  } catch (error) {
    console.error('TEST_AMQP error');
    console.error(error);
    return true;
  }
});
