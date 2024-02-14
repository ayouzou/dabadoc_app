
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
                window.location.href ='/'
        } catch (error) {

        }
    };
    auth.isAuthenticated ?'':window.location.href='/login'
    return (
        <div className='w-9/12 m-auto mt-20'> 

                <h1 className='text-2xl text-center font-bold'> when you ask this will redirect you to the  home page</h1>

            <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded m-10">
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
                    <p className='p-2 text-red-700'  >PS: the location we have it already  !</p>
                <button type="submit" className="bg-black text-white py-2 px-4 rounded hover:bg-zinc-900 w-full ">Post Question</button>
            </form>
        </div>
    );
};

export default QuestionForm;
