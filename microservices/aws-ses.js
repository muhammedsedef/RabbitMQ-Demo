// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
require('dotenv').config({path:'../.env'});
// Set the region 

exports.emailService = (receivedEmail, userInfo) => {
    AWS.config.update({
        secretAccessKey: process.env.AWS_SECRET_KEY,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        region: process.env.AWS_REGION
    });
    const ses = new AWS.SES({ apiVersion: "2010-12-01" });
    console.log(receivedEmail)
    console.log(userInfo)
    // Create sendEmail params 
    var paramsForSender = {
        Destination: { /* required */

            ToAddresses: [
                receivedEmail//Email address/addresses that you want to send your email
                /* more items */
            ]
        },
        Message: { /* required */
            Body: { /* required  HTML Format of the email */
                Html: {
                    Charset: 'UTF-8',
                    Data: "<html><body><h1>Dear " + userInfo.firstName + "</h1><p style='color:red'>Thank you for join</p></body></html>"
                },
                Text: {
                    Charset: 'UTF-8',
                    Data: 'Thank you for join'
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Thank you for join'
            }
        },
        Source: 'muhammetsedef34@gmail.com',  /* required */
        ReplyToAddresses: [
            'muhammetsedef34@gmail.com',
            /* more items */
        ],
    };

    var paramsForAdmin = {
        Destination: { /* required */

            ToAddresses: [
                'muhammetsedef34@gmail.com'//Email address/addresses that you want to send your email
                /* more items */
            ]
        },
        Message: { /* required */
            Body: { /* required  HTML Format of the email */
                Html: {
                    Charset: 'UTF-8',
                    Data: "<html><h2>Report from Company </h2><h3>Name: " + userInfo.firstName + "</h3><h3>Email: " + userInfo.email + "</h3><h3>Message: " + userInfo.message + "</h3><h3>Date: " + userInfo.date + "</h3></html>"
                },
                Text: {
                    Charset: 'UTF-8',
                    Data: 'This is the feedback message from user'
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: "Feedback from " + userInfo.firstName
            }
        },
        Source: 'muhammetsedef34@gmail.com',  /* required */
        ReplyToAddresses: [
            'muhammetsedef34@gmail.com',
            /* more items */
        ],
    };

    // Create the promise and SES service object
    const sendEmailReceiver = ses.sendEmail(paramsForSender).promise();
    const sendEmailAdmin = ses.sendEmail(paramsForAdmin).promise();
    // Handle promise's fulfilled/rejected states
    sendEmailReceiver.then(data => {
        console.log(`receiver mail id: ${data.MessageId}`);
        sendEmailAdmin.then(data1 => {
            console.log(`admin mail id: ${data1.MessageId}`);
        })
            .catch(err => {
                console.error(err, err.stack);
            });
    })
        .catch(err => {
            console.error(err, err.stack);
        });
}
