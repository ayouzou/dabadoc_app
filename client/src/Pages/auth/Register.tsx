import { useState } from "react"
import useAuth from "../../hooks/useAuth"
import { storeCookie } from "../../lib/auth"


function Register() {
  const { auth } = useAuth()
  console.log(auth)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    city:'',
    street:''
  })
  // const { auth } = useAuth()
  console.log(formData)
  // auth.isAuthenticated ? window.location.href = '/' : ''
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if (res.status === 201) {
        // window.location.href = `/`
        console.log("register done!")
        console.log(auth)
      }

      if (data.token) {
        storeCookie("token", data.token)
        alert("Login success")
      }
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-gray-100 p-8 rounded shadow-xl">
          <div className="text-2xl font-bold mb-4">Register</div>
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
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Register
            </button>
          </form>
        </div>
      </div>

    </>
  )
}

export default Register