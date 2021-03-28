const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/feedback.controller');

router.post('/newFeedback', postCtrl.newPost);

module.exports = router;