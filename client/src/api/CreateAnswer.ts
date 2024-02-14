import toast from "react-hot-toast";

const API_Key = import.meta.env.VITE_API_URL as string;

const API =`${API_Key}/answer/create-answer`

interface answer {
  content:string;
  question:string;
  answeredBy:string
}
export const createAnswer = async ({ content, question, answeredBy }: answer) => {
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
      
      toast.success("answer created")
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  