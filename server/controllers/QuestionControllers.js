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

module.exports ={
    createQuestion,
    getAllQuestions
}