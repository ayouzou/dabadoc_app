const express = require("express");
const router = express.Router();
const answerControllers = require('../controllers/AnswerControllers')


router.post('/create-answer',answerControllers.createAnswer)
router.get('/get-answer/:answerId',answerControllers.getAnswerById)


module.exports = router;
