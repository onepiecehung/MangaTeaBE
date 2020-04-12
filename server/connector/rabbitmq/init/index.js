const amqp = require('amqplib');
const RABBIT_URL = require("../config/index").RABBIT_URL

class RABBIT {
  constructor() {
    this.channel = null;
    this.queues = {}
  }

  initChannel() {
    return new Promise((resolve, reject) => {
      let channel = this.channel;
      if (channel) {
        return resolve(channel);
      }
      // Connect to RabbitQM
      amqp.connect(RABBIT_URL).then(async conn => {
        // Create channel
        console.info(`'\n['${new Date().toTimeString()}'] => Connect rabbit success'`);
        channel = await conn.createChannel();
        this.channel = channel;
        return resolve(channel);
      }).catch(error => {
        console.log('amqp connection failed, please check it carefully:');
        console.log(error);
        return reject(error);
      });
    })
  }

  getChannel() {
    return this.channel;
  }

  initQueue(queueName, durable = true) {
    let channel;
    try {
      channel = this.getChannel();
    } catch (error) {
      console.log('initQueue error:');
      console.log(error);
      throw error;
    }

    if (!this.queues[queueName]) {
      this.queues[queueName] = channel.assertQueue(queueName, { durable: durable });
    }

    return this.queues[queueName];
  }

  sendDataToRabbit(queueName, data) {
    if (!data || !(typeof data === 'object' || typeof data === 'string')) {
      throw Error('Data must be object or string');
    }

    if (typeof data === 'object') {
      data = JSON.stringify(data);
    }

    try {
      // Convert data to Binary type before send it to Queue
      this.channel.sendToQueue(queueName, Buffer.from(data));
    } catch (error) {
      // Do your stuff to handle this error
      console.log('sendDataToRabbit error:');
      console.log(error);
      throw error;
    }
  }

  /**
   *
   * @param queueName
   * @param callback
   * @param options
   * @param options.noAck, if need to make sure the message proceed let set noAck = false
   */
  consumeData(queueName, callback, options) {
    if (!queueName) {
      throw new Error('You must implement queueName in consumer child');
    }
    let noAck = options ? options.noAck : undefined;
    if (typeof noAck === 'undefined') {
      noAck = true;
    }

    this.channel.consume(queueName, (msg) => {
      callback(msg, this.channel);
    }, {
      noAck: noAck,
    });
  }
}

module.exports = new RABBIT();
