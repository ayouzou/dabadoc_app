const API_Key = import.meta.env.VITE_API_URL as string;


const API =`${API_Key}/question`;

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

