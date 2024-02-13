import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { createAnswer } from '../api/CreateAnswer';

interface QuestionProps {
  questionId: string;
}

const AnswerForm: React.FC<QuestionProps> = ({ questionId }) => {
  const [content, setContent] = useState('');
  const { auth } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    try {
      await createAnswer({ content, question: questionId, answeredBy: auth.user?.id });

      setContent('');

    } catch (error) {
      console.error('Error creating answer:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">
      <h2 className="text-lg font-semibold mb-4">Post an Answer</h2>
      <textarea
        placeholder="Your answer"
        value={content}
        onChange={e => setContent(e.target.value)}
        className="w-full border border-gray-300 p-2 mb-4 rounded"
        required
      />
      <button type="submit" className="bg-black text-white py-2 px-4 rounded hover:bg-zinc-600">Post Answer</button>
    </form>
  );
};

export default AnswerForm;
