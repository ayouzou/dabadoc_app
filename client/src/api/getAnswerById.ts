const API = "http://localhost:3000/api/answer/get-answer";

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
