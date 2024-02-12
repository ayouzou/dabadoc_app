const API ="http://localhost:3000/api/question/like-question"

export const likeQuestion = async ({ questionId, userId }: { questionId: string; userId: string; }) => {
    try {
        console.log(questionId, userId)
      const response = await fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questionId, userId }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to like question');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  