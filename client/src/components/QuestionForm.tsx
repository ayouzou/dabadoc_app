// components/QuestionForm.js

import React, { useState } from 'react';
import { createQuestion } from '../api/CreateQuestion';
import useAuth from '../hooks/useAuth';

const QuestionForm = () => {
    const { auth } = useAuth()
    const [formData, setFormData] = useState(
        {
            title: "",
            content: '',
            city: auth.user?.city,
            street: auth.user?.street,
            postedBy: auth.user?.id

        }
    );
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await createQuestion(formData)
        } catch (error) {

        }
    };

    return (
        <div className='w-96 m-auto mt-20'>
            <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">
                <h2 className="text-lg font-semibold mb-4">Post a Question</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full border border-gray-300 p-2 mb-4 rounded"
                    required
                />
                <textarea
                    placeholder="Content"
                    value={formData.content}
                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                    className="w-full border border-gray-300 p-2 mb-4 rounded"
                    required
                />

                <button type="submit" className="bg-black text-white py-2 px-4 rounded hover:bg-zinc-900">Post Question</button>
            </form>
        </div>
    );
};

export default QuestionForm;
