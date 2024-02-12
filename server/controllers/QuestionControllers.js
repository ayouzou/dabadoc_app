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

module.exports ={
    createQuestion
}