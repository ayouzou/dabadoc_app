import { useState, useEffect } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import AnswerForm from './Answers';
import { getQuestion } from '../api/getAllQuestion';
import AnswerItem from './AnswerItem';
import { likeQuestion } from '../api/likeQuestion';
import useAuth from '../hooks/useAuth';

interface Answer {
  _id: string;
  content: string;
  answeredBy: string;
  likes: string[];
}

interface Question {
  _id: string;
  title: string;
  content: string;
  city: string;
  street: string;
  postedBy: string;
  likes: string[];
  answers: Answer[];
}

const Question = () => {
  const { auth } = useAuth()
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showAnswerFormMap, setShowAnswerFormMap] = useState<{ [key: string]: boolean }>({});
  const userOd= auth.user?.id
  console.log(userOd)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getQuestion();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchData();
  }, []);

  const toggleAnswerForm = (questionId: string) => {
    setShowAnswerFormMap(prevState => ({
      ...prevState,
      [questionId]: !prevState[questionId]
    }));
  };

  return (
    <div>
      {questions.map((question) => (
        <div key={question._id} className="bg-white p-4 shadow rounded mb-4">
          <h3 className="text-lg font-semibold">{question.title}</h3>
          <p className="text-gray-600 mb-2">{question.content}</p>
          <p className="text-gray-500">Posted by: {question.postedBy}</p>
          <p className="text-gray-500">Location: {question.city}, {question.street}</p>
          <div className="flex items-center mt-4">
            <button onClick={() => likeQuestion({ questionId: question._id, userId: auth.user?.id})} className="flex items-center text-gray-500 mr-2">
              <FaThumbsUp className="mr-1" />
              {question.likes.length} Likes
            </button>
            <button onClick={() => toggleAnswerForm(question._id)} className="flex items-center bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600">
              Answer
            </button>
          </div>
          {showAnswerFormMap[question._id] && (
            <div className="mt-4">
              <AnswerForm questionId={question._id} />
            </div>
          )}
          <hr className="my-4" />
          <h4 className="text-lg font-semibold mb-2">Answers</h4>
          {question.answers && question.answers.map((answer) => (
            <AnswerItem key={answer._id} answer={answer} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Question;
