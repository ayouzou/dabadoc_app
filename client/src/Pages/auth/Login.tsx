import { useState } from "react"
import { storeCookie } from "../../lib/auth"
import toast from "react-hot-toast"
import useAuth from "../../hooks/useAuth"
import { Link } from "react-router-dom"

const Login = () => {
    const {auth} =useAuth()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    auth.isAuthenticated ? window.location.href = '/' : ''
    const API = import.meta.env.VITE_API_URL as string;
    console.log(API)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const res = await fetch(`${API}/users/login`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if (data.token) {
                storeCookie("token", data.token)
                toast.success("Login success")
                window.location.href = `/`
            }else{
                toast.error(data.message)
            }
        } catch (error) { 
            console.log(error)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-2xl mx-auto mt-32 h-[530px] shadow-2xl flex flex-col w-full md:w-1/3 items-center max-w-4xl transition duration-1000 ease-out">
                <h2 className='p-6 text-3xl font-bold text-black uppercase'>aweb</h2>
                <div className="inline-block border-[1px] justify-center w-20 border-black border-solid"></div>
                <h3 className='text-2xl font-semibold text-blue-400 p-5'>Sign In!</h3>
                <div className='flex flex-col items-center justify-center  w-9/12'>
                    <input
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        type='email' className='rounded-xl px-2 py-3 w-72 md:w-full border-[1px] border-black m-1 focus:shadow-md focus:border-zinc-600 focus:outline-none focus:ring-0 mb-5' placeholder='Email'></input>
                    <input
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        type="password" className='rounded-xl px-2 py-3 w-72 md:w-full border-[1px] border-black m-1 focus:shadow-md focus:border-zinc-600 focus:outline-none focus:ring-0 mb-5' placeholder='Password'></input>
                    <button className='rounded-2xl m-2 text-white bg-black w-2/5 px-5 py-5 shadow-md hover:text-zinc-700 hover:bg-white transition duration-200 ease-in'>
                        Sign In
                    </button>
                </div>
                <div className="inline-block border-[1px] justify-center w-20 border-black border-solid"></div>
                <Link to={'/register'} className='text-black mt-10 mb-4 text-xl font-medium cursor-pointer'>Create a New Account?</Link>
            </div>
        </form>
    )
}
export default Login