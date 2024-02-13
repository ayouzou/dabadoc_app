const Answer = require('../models/Answer');
const Question = require('../models/Question');




const createAnswer = async (req, res) => {
    try {
        const { content, question, answeredBy } = req.body;
        const newAnswer = new Answer({
            content,
            question,
            answeredBy,
        });
        const createdAnswer = await newAnswer.save()
        const updatedQuestion = await Question.findByIdAndUpdate(question, {
            $push: { answers: createdAnswer._id },
        });
        if (!updatedQuestion) {
            return res.status(404).json({ message: "question not found" });
        }
        res.status(201).json(createdAnswer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create a Answer" });
    }
}
const getAnswerById = async (req, res) => {
    try {
        const { answerId } = req.params;
        const answer = await Answer.findById(answerId);
        if (!answer) {
            return res.status(404).json({ message: "Answer not found" });
        }
        res.status(200).json(answer);
    } catch (error) {
        console.error("Error getting answer by ID:", error);
        res.status(500).json({ message: "Failed to get answer by ID" });
    }
};

module.exports={
    createAnswer,
    getAnswerById
}