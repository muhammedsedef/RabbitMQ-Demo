var amqp = require('amqplib/callback_api');
require('dotenv').config({ path: '../.env' });
const rabbitUrl = process.env.AMQP_URL;

exports.sendRabbitMQ = (queueName, data) => {
    amqp.connect(rabbitUrl, (err, connection) => {
        if (err) {
            throw err;
        }
        connection.createChannel((err1, channel) => {
            if (err1) {
                throw err1;
            }
            var queue = queueName;
            channel.assertQueue(queue, {
                /* 
                If true is given, rabbitmq data remains in the queue even if the server is shut down, 
                give false (not writing to disk) to gain speed. 
                */
                durable: true // 
            });
            channel.sendToQueue(queue, Buffer.from(data));

            console.log(" [x] Sent %s", data);
        });
        setTimeout(() => {
            connection.close();
        }, 1000);
    });
}