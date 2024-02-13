import { useState, useEffect } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { getQuestion } from '../api/getAllQuestion';
import { likeQuestion } from '../api/likeQuestion';
import useAuth from '../hooks/useAuth';
import AnswerForm from '../components/Answers';
import AnswerItem from '../components/AnswerItem';
import UserPost from '../components/userPost';

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

const AllQuestion = () => {
    const { auth } = useAuth()
    const [questions, setQuestions] = useState<Question[]>([]);
    const [showAnswerFormMap, setShowAnswerFormMap] = useState<{ [key: string]: boolean }>({});
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

    auth.isAuthenticated ? "" : window.location.href = '/login'
    return (
        <div className='w-9/12 m-auto p-20 relative '>
            <div className='absolute h-80 w-96 bg-white shadow-xl rounded-md left-[900px] top-3'>
                <h1 className='text-center text-2xl'>Information: </h1>
                <div className='p-10'>
                    <h2 className='text-xl p-2'><span className='font-bold'>email</span>:{auth.user?.email}</h2>
                    <h2 className='text-xl p-2'><span className='font-bold'>username</span>:{auth.user?.username}</h2>
                    <h2 className='text-xl p-2'><span className='font-bold'>city</span>:{auth.user?.city}</h2>
                    <h2 className='text-xl p-2'><span className='font-bold'>street</span>:{auth.user?.street}</h2>
                </div>
            </div>
            <div>
                <h1 className='text-4xl p-20 text-center '>See All  Questions  </h1>
            </div>
            {questions.map((question, index) => (
                <div key={index} className="bg-white p-4 shadow-xl rounded mb-4">
                    <h3 className="text-lg font-semibold">{question.title}</h3>
                    <p className="text-gray-600 mb-2">{question.content}</p>
                    <p className="text-gray-500 flex gap-3">Posted by: <UserPost id={question.postedBy} /></p>

                    <p className="text-gray-500">Location: {question.city}, {question.street}</p>
                    <div className="flex items-center mt-4">
                        <button onClick={() => likeQuestion({ questionId: question._id, userId: auth.user?.id })} className="flex items-center text-gray-500 mr-2">
                            <FaThumbsUp className="mr-1" />
                            {question.likes.length} Likes
                        </button>
                        <button onClick={() => toggleAnswerForm(question._id)} className="flex items-center bg-black text-white py-1 px-2 rounded hover:bg-zinc-600">
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

export default AllQuestion;
