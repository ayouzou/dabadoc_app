import toast from "react-hot-toast";

const API_Key = import.meta.env.VITE_API_URL as string;

const API =`${API_Key}/question/like-question`

export const likeQuestion = async ({ questionId, userId }: { questionId: string; userId: string; }) => {
    try {
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
      toast.success("Like success")
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  