const amqp = require('amqplib/callback_api');
require('dotenv').config({path:'../.env'});

const data = require('../data.json');
const queueName = process.argv[2] || 'test';

//Step1 : Create Connection
amqp.connect(process.env.AMQP_URL, (connError, connection) => {
    if (connError) {
        throw connError;
    }
    //Step2 : Create channel
    connection.createChannel((channelError, channel) => {
        if (channelError) {
            throw channelError
        }
        //Step3 : Assert Queue
        channel.assertQueue(queueName);
        //Step 4 : Send Message to queue
        setInterval(() => {
            const time = new Date().getTime();
            const message = `Test Message ${time}`
            channel.sendToQueue(queueName, Buffer.from(message));
            console.log(`Sended message: ${message}`);
        }, 100)

        /* =========== With JSON Example ===========
        data.forEach(i => {
            const id = i.id;
            const message = {id:id};
            channel.sendToQueue('test',Buffer.from(JSON.stringify(message)));
            console.log(`Sended queue: ${JSON.stringify(message)}`);
        }) 
        setTimeout(function () {
            connection.close();
        }, 500);
        =========== With JSON Example =========== */
    })
})


