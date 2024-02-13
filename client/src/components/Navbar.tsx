import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Navbar = () => {
    const { auth,logout} =useAuth()
    return (
        <div>
            <nav className="bg-blue-500 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="text-white font-bold text-lg">DabaDoc App</Link>
                    <div>
                        <Link to="/" className="text-white mr-4  border p-2 border-black">See  Questions Related to me ?</Link>
                        <Link to="/All" className="text-white mr-4 border p-2 border-black">See All Questions</Link>

                        <Link to="/post-question" className="text-white mr-4 border p-2 border-black">Post Question</Link>
                        {
                            auth.isAuthenticated ?<button onClick={()=>logout()} className="text-white bg-black p-2 rounded">Logout</button>
                            :
                            <Link to={'/login'} className='text-white bg-black p-2 rounded'>login</Link>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar