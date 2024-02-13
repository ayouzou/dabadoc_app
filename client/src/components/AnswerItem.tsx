import React, { useEffect, useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { getAnswerById } from '../api/getAnswerById';
import useAuth from '../hooks/useAuth';
import { likeAnswer } from '../api/likeAnswer';

interface AnswerProps {
  answer: string;
}

interface AnswerData {
  _id: string;
  content: string;
  likes: string[];
 
} ;

const AnswerItem: React.FC<AnswerProps> = ({ answer }) => {
  const { auth } = useAuth();
  const [answerData, setAnswerData] = useState<AnswerData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAnswerById(answer);
        setAnswerData(data);
      } catch (error) {
        console.error('Error fetching answer:', error);
      }
    };
    fetchData();
  }, [answer]);
  
  const isLikedByUser = answerData?.likes.includes(auth.user?.id);

  return (
    <div className="bg-gray-100 p-4 shadow rounded mb-2">
      <p className="text-gray-600">{answerData?.content}</p>
      <div className="flex items-center mt-2">
        <button className="flex items-center text-gray-500 mr-2" onClick={()=>likeAnswer({ answerId: answerData?._id, userId: auth.user?.id })}>
          <FaThumbsUp className="mr-1" style={{ color: isLikedByUser ? 'blue' : 'inherit' }} />
          {answerData?.likes.length} Likes
        </button>
      </div>
    </div>
  );
};

export default AnswerItem;
