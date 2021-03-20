var amqp = require('amqplib/callback_api');
require('dotenv').config({path:'../.env'});
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
                durable: true // True verilirse rabbitmq sunucu kapansa dahi kuyrukda datalar kalır,hızdan kazanmak için false(diske yazmıyor)ver 
            });
            channel.sendToQueue(queue, Buffer.from(data));

            console.log(" [x] Sent %s", data);
        });
        setTimeout(() => {
            connection.close();
        }, 1000);
    });
}