const express = require("express");
const router = express.Router();
const questionControllers = require("../controllers/QuestionControllers")

router.post('/create',questionControllers.createQuestion)

module.exports = router;
