import { useState } from "react"
import useAuth from "../../hooks/useAuth"
import { storeCookie } from "../../lib/auth"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"


function Register() {
  const { auth } = useAuth()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    city:'',
    street:''
  })
  
  auth.isAuthenticated ? window.location.href = '/' : ''
  const API = import.meta.env.VITE_API_URL as string;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await fetch(`${API}/users/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if (res.status === 201) {
        window.location.href = `/`
      }

      if (data.token) {
        storeCookie("token", data.token)
        toast.success("login success")
      }
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-gray-100 p-8 rounded shadow-xl">
          <div className="text-2xl font-bold mb-4 flex justify-center">Register</div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex">
              <input
                type="text"
                placeholder="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="street"
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                className="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-zinc-900 "
            >
              Register
            </button>
          </form>
          <Link to={'/login'} className='text-black mt-10 mb-4 text-xl flex justify-center font-medium cursor-pointer'>Have Account?</Link>

        </div>
      </div>

    </>
  )
}

export default Register