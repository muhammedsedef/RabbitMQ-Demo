const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post.controller');

router.post('/newPost', postCtrl.newPost);



module.exports = router;