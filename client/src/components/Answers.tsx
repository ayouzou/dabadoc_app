
import  { useState } from 'react';
interface questionProps{
  questionId:string
}
const AnswerForm:React.FC<questionProps>  = ({questionId}) => {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">
      <h2 className="text-lg font-semibold mb-4">Post an Answer</h2>
      <textarea
        placeholder="Your answer"
        value={questionId}
        onChange={e => setContent(e.target.value)}
        className="w-full border border-gray-300 p-2 mb-4 rounded"
        required
      />
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Post Answer</button>
    </form>
  );
};

export default AnswerForm;
