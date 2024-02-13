import { useEffect, useState } from "react";
import { getUserById } from "../api/getUserById";

interface User {
  _id: string;
  username: string;
  email: string;
}

const UserPost = ({ id }: { id: string }) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(id);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser(); 
  }, []); 
  
  return (
    <div>
      {user ? (
        <div>
          <h2>{user.username &&user.username}</h2>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserPost;
