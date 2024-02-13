import Question from "../components/Question"
import useAuth from "../hooks/useAuth"

const Home = () => {
    const {auth }= useAuth()
  return (
    <div>
      {
        auth.isAuthenticated ?   <Question/> :window.location.href='/login'
      }
     
    </div>
  )
}

export default Home