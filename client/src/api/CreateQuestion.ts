import toast from "react-hot-toast";

const API_Key = import.meta.env.VITE_API_URL as string;


const API = `${API_Key}/question/create`
export const createQuestion = async (data: any) => {
    try {
        const res = await fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            toast.success("question added success")
        } else {
            toast.error('Failed to add question');
        }
    } catch (error) {
        console.error('Error creating question:', error);

    }

} 