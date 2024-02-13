import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Navbar = () => {
    const { logout} =useAuth()
    return (
        <div>
            <nav className="bg-blue-500 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="text-white font-bold text-lg">Question App</Link>
                    <div>
                        <Link to="/" className="text-white mr-4">See Questions</Link>
                        <Link to="/post-question" className="text-white mr-4">Post Question</Link>
                        <button onClick={()=>logout()} className="text-white">Logout</button>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar