const API ="http://localhost:3000/api/answer/create-answer"

export const createAnswer = async ({ content, question, answeredBy }: any) => {
    try {
      const response = await fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, question, answeredBy }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create answer');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  