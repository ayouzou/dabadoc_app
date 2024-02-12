const express = require("express");
const router = express.Router();
const questionControllers = require("../controllers/QuestionControllers")

router.post('/create',questionControllers.createQuestion)
router.get('/',questionControllers.getAllQuestions)
router.post('/like-question',questionControllers.likeQuestion)



module.exports = router;
