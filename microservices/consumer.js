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
            console.log(`${queueName} queue listening`)
            if (err1) {
                throw err1;
            }

            channel.assertQueue(queueName, {
                /* 
                If true is given, rabbitmq data remains in the queue even if the server is shut down, 
                give false (not writing to disk) to gain speed. 
                */
                durable: true 
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