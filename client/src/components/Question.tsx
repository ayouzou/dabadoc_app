
import { FaThumbsUp } from 'react-icons/fa';
const sampleQuestion = {
  _id: "1",
  title: "How to find the nearest library?",
  content: "I'm new to the city and looking for the nearest library. Can someone please help me?",
  city: "New York",
  street: "Broadway",
  postedBy: "John Doe",
  likes: ["user1", "user2"],
  answers: [
    {
      _id: "1",
      content: "There's a library on 5th Avenue, about 2 blocks from Broadway.",
      answeredBy: "Jane Smith",
      likes: ["user3"]
    },
    {
      _id: "2",
      content: "You can also check out the public library on Main Street.",
      answeredBy: "Michael Johnson",
      likes: []
    }
  ]
};

const Question = () => {
  return (
    <div className="bg-white p-4 shadow rounded mb-4">
      <h3 className="text-lg font-semibold">{sampleQuestion.title}</h3>
      <p className="text-gray-600 mb-2">{sampleQuestion.content}</p>
      <p className="text-gray-500">Posted by: {sampleQuestion.postedBy}</p>
      <p className="text-gray-500">Location: {sampleQuestion.city}, {sampleQuestion.street}</p>
      <div className="flex items-center mt-4">
        <button className="flex items-center text-gray-500 mr-2">
          <FaThumbsUp className="mr-1" />
          {sampleQuestion.likes.length} Likes
        </button>
        {/* Add more actions/buttons here */}
      </div>
      <hr className="my-4" />
      <h4 className="text-lg font-semibold mb-2">Answers</h4>
      {sampleQuestion.answers.map(answer => (
        <div key={answer._id} className="bg-gray-100 p-4 shadow rounded mb-2">
          <p className="text-gray-600">{answer.content}</p>
          <p className="text-gray-500">Answered by: {answer.answeredBy}</p>
          <div className="flex items-center mt-2">
            <button className="flex items-center text-gray-500 mr-2">
              <FaThumbsUp className="mr-1" />
              {answer.likes.length} Likes
            </button>
            {/* Add more actions/buttons here */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Question;
