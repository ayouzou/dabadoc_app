import { useState, useEffect } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import AnswerForm from './Answers';
import { getQuestion } from '../api/getAllQuestion';
import AnswerItem from './AnswerItem';
import { likeQuestion } from '../api/likeQuestion';
import useAuth from '../hooks/useAuth';
import UserPost from './userPost';
import InformationUser from './InformationUser';

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
  createdAt: string
}

const Question = () => {
  const { auth } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showAnswerFormMap, setShowAnswerFormMap] = useState<{ [key: string]: boolean }>({});
  const [openInfo,setOpenInfo] = useState(false)

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

  const filteredQuestions = questions.filter(question => {
    return (
      question.city === auth.user?.city || question.street === auth.user?.street
    );
  });
  return (
    <div className='w-9/12 m-auto p-20 relative'>
     <button onClick={()=>setOpenInfo(!openInfo)} className='bg-black text-white p-2 rounded-sm hover:bg-zinc-700'>{openInfo?'close-SeeInofrmation':"see-Inofrmation"}</button>
            {

                openInfo ? <InformationUser /> : ""
            }
      <div>
        <h1 className='text-4xl p-20 text-center '>See Questions Related to me </h1>
      </div>
      {filteredQuestions.map((question) => (
        <div key={question._id} className="bg-white p-4 shadow-xl rounded mb-4">
          <h3 className="text-lg font-semibold">{question.title}</h3>
          <p className="text-gray-600 mb-2">{question.content}</p>
          <p className="text-gray-500 flex gap-3">Posted by: <UserPost id={question.postedBy} /></p>
          <p className="text-gray-500">Location: {question.city}, {question.street}</p>
          <div className="flex items-center mt-4">
            <button
              onClick={() => likeQuestion({ questionId: question._id, userId: auth.user?.id })}
              className="flex items-center mr-2 py-1 px-2 rounded "
            >
              <FaThumbsUp className={`mr-1 ${question.likes.includes(auth.user?.id) ? 'text-blue-500' : 'text-gray-500'}`} />
              {question.likes.length} Likes
            </button>
            <button onClick={() => toggleAnswerForm(question._id)} className="flex items-center bg-black text-white py-1 px-2 rounded hover:bg-zinc-600">
              Answer
            </button>
          </div>
          <div className='float-right text-gray-500'>
            {
              new Date(question.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric', day: 'numeric' })
            }
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
