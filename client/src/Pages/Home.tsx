import Question from "../components/Question"
import QuestionForm from "../components/QuestionForm"
import useAuth from "../hooks/useAuth"

const Home = () => {
    const {auth }= useAuth()
    console.log(auth.user)
  return (
    <div>
        <Question/>
    </div>
  )
}

export default Home