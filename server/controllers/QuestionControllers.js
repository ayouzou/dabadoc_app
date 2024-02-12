const Question = require("../models/Question")


const createQuestion =async(req,res)=>{
    try {
        const { title, content, city, street ,postedBy} = req.body;
        const newQuestion = new Question({
          title,
          content,
          city,
          street,
          postedBy
        });
        await newQuestion.save();
        res.status(201).json({ message: 'Question created successfully', question: newQuestion });
      } catch (err) {
        res.status(500).json({ message: 'Failed to create question', error: err.message });
      }
}

const getAllQuestions = async (req, res) => {
  try {
    const question = await Question.find();
    res.status(200).json(question);
  } catch (error) {
    console.error("Error fetching question:", error);
    res.status(500).json({ error: "Error fetching question" });
  }
};
const likeQuestion = async (req, res) => {
  try {
    const { questionId } = req.body;
    const { userId } = req.body; 

    
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const userLiked = question.likes.includes(userId);
    if (userLiked) {
      return res.status(400).json({ message: 'You have already liked this question' });
    }

    question.likes.push(userId);
    await question.save();

    res.status(200).json({ message: 'Question liked successfully' });
  } catch (error) {
    console.error('Error liking question:', error);
    res.status(500).json({ message: 'Failed to like question' });
  }
};
module.exports ={
    createQuestion,
    getAllQuestions,
    likeQuestion
}