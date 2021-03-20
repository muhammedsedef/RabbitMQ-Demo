const mailService = require('./aws-ses.js');
var amqp = require('amqplib/callback_api');
require('dotenv').config({path:'../.env'});
const rabbitUrl = process.env.AMQP_URL;

const queueName = process.argv[2];

listenRabbitMQ(queueName)

function listenRabbitMQ(queueName) {
    amqp.connect(rabbitUrl, (err, connection) => {
        if (err) {
            throw err;
        }
        connection.createChannel((err1, channel) => {
            console.log('kuyruk dinleniyor')
            if (err1) {
                throw err1;
            }

            channel.assertQueue(queueName, {
                durable: true // True verilirse rabbitmq sunucu kapansa dahi kuyrukda datalar kalır,hızdan kazanmak için false(diske yazmıyor)ver 
            });
            channel.consume(queueName, function (data) {
                dataObject = JSON.parse(data.content.toString());
                mailService.emailService(dataObject.email, dataObject);
            }, {
                noAck: true
            });
        });
    });
}