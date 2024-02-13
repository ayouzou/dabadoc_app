
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer' 
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  }]
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
