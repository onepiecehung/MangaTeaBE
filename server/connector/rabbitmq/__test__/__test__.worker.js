const RABBIT = require('../init');
const {
  JOB_NAME
} = require("../config/index")

function testAMQP() {
  RABBIT.sendDataToRabbit(JOB_NAME.TEST_RABBIT, { msg: '[RABBIT] Test ampq success.' });
}

module.exports = {
  testAMQP
};
