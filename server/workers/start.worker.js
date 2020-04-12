const {
    createQueue, createWorkers
} = require('../connector/rabbitmq/index');
const {
    testAMQP
} = require('../connector/rabbitmq/__test__/__test__.worker');


createQueue().then(() => {
    setTimeout(() => {
        createWorkers(),
            testAMQP();
    }, 5000);
}).catch(error => {
   console.log('Error init rabbit : ', error);
});