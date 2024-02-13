const API_Key = import.meta.env.VITE_API_URL as string;


const API = `${API_Key}/answer/get-answer`;

export const getAnswerById = async (answerId:string) => {
    try {
        const response = await fetch(`${API}/${answerId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch answer');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
