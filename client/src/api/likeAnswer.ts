import toast from "react-hot-toast";

const API_Key = import.meta.env.VITE_API_URL as string;

const API =`${API_Key}/answer/like-answer`


export const likeAnswer = async ({ answerId, userId }: { answerId: string |undefined; userId: string | undefined; }) => {
    try {
      const response = await fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answerId, userId }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to like answer');
      }
      toast.success("Like success to answer")
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };