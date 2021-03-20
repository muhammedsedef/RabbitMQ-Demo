const Post = require('../model/Post.model');
const queueService = require('../microservices/producer.js');
const mailService = require('../microservices/aws-ses.js');

exports.newPost = (req, res) => {
    var post = new Post(req.body);
    post.save()
        .then((result) => {
            queueService.sendRabbitMQ('feedbackQueue', JSON.stringify(post));
            //mailService.emailService(post.email,post);
            res.status(200).json({ status: 200, data: result, message: 'Success' });
        }).catch((err) => {
            res.status(400).json({ status: 400, message: err })
        });

};