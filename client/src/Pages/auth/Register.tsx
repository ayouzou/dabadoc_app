import { useState } from "react"
import useAuth from "../../hooks/useAuth"
import { storeCookie } from "../../lib/auth"


function Register() {
  const {auth } =useAuth()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  // const { auth } = useAuth()
  console.log(formData)
    auth.isAuthenticated ? window.location.href='/':''
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData )
      })

      const data = await res.json()
      if (res.status === 201) {
        window.location.href = `/`
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
      <div className="">Register</div>
      <form onSubmit={handleSubmit}>
        <div className="shadow-xl ">
          <input
            value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            type="text" placeholder="username" />
          <input type="text" placeholder="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            type="password" placeholder="password" />
        </div>
        <button>Register</button>
      </form>
    </>
  )
}

export default Register