// components/QuestionForm.js

import React, { useState } from 'react';
import { createQuestion } from '../api/CreateQuestion';
import useAuth from '../hooks/useAuth';

const QuestionForm = () => {
    const {auth} =useAuth()
    const [formData, setFormData] = useState(
        {
            title: "",
            content: '',
            city: auth.user?.city,
            street: auth.user?.street,
            postedBy:auth.user?.id

        }
    );
    console.log(formData)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await createQuestion(formData)
        } catch (error) {

        }
    };

    return (
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
            {/* <input
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
                className="w-full border border-gray-300 p-2 mb-4 rounded"
                required
            />
            <input
                type="text"
                placeholder="Street"
                value={formData.street}
                onChange={e => setFormData({ ...formData, street: e.target.value })}
                className="w-full border border-gray-300 p-2 mb-4 rounded"
                required
            /> */}
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Post Question</button>
        </form>
    );
};

export default QuestionForm;