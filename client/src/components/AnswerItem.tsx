import React, { useEffect, useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { getAnswerById } from '../api/getAnswerById';
interface AnswerProps {
    answer: any; 
}

const AnswerItem: React.FC<AnswerProps> = ({ answer }) => {

    const [answer1, setAnswer] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAnswerById(answer); 
        setAnswer(data); 
      } catch (error) {
        console.error('Error fetching answer:', error);
      }
    };
    fetchData(); 
  }, []); 

  return (
    <div className="bg-gray-100 p-4 shadow rounded mb-2">
      <p className="text-gray-600">{answer1?.content && answer1?.content}</p>
      {/* <p className="text-gray-500">Answered by:{answer?.answeredBy && answer?.answeredBy} </p> */}
      <div className="flex items-center mt-2">
        <button className="flex items-center text-gray-500 mr-2">
          <FaThumbsUp className="mr-1" />
          {answer?.likes && answer?.likes?.length} Likes
        </button>
      </div>
    </div>
  );
};

export default AnswerItem;
