const API ="http://localhost:3000/api/question";

export const getQuestion = async () => {
    try {
        const response = await fetch(API);
        if (!response.ok) {
            throw new Error('Failed to fetch questions');
        }
        const data = await response.json();

        console.log(data)
        return data;
    } catch (error) {
        console.error('Error fetching questions:', error);
        throw error;
    }
};

