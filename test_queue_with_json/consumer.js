const amqp = require('amqplib/callback_api');
require('dotenv').config({path:'../.env'});
const data = require('../data.json');
const queueName = process.argv[2] || 'test';

//Step1 : Create Connection (RabbitMQ sunucusuna bağlanma)
amqp.connect(process.env.AMQP_URL, (connError, connection) => {
    if (connError) {
        throw connError;
    }
    //Step2 : Create channel (Kanal oluşturma)
    connection.createChannel((channelError, channel) => {
        if (channelError) {
            throw channelError
        }
        //Step3 : Assert Queue (Dinleyeceği kuyruğun belirtilmesi)
        channel.assertQueue(queueName);
        console.log(`${queueName} listening!`)

        //Step4 : Receive Messages (Dinlenen kuyruktan mesajın alınması ve işlenmesi)
        channel.consume(queueName, msg => {
            console.log('Message received: ', msg.content.toString());
            /* =========== With JSON Example ===========
            const messageInfo = JSON.parse(msg.content.toString());
            const userInfo = data.find(i => i.id == messageInfo.id);
            if(userInfo){
                console.log('Message received: ',userInfo);
                channel.ack(msg)
            }
            =========== With JSON Example =========== */
        }, { noAck: true });
    })
})
