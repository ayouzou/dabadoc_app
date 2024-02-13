const API_Key = import.meta.env.VITE_API_URL as string;

const API = `${API_Key}/user`


export const getUserById = async (id: string) => {
    try {
        const response = await fetch(`${API}/${id}`);

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Failed to fetch user: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error; 
    }
};
