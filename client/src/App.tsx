

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './Pages/auth/Register'
import { SessionProvider } from './context/auth'
import Login from './Pages/auth/Login'
import Home from './Pages/Home'
import Navbar from './components/Navbar'
import QuestionForm from './components/QuestionForm'
import { Toaster } from 'react-hot-toast'
import AllQuestion from './Pages/AllQuestion'
import FavorisQuestion from './Pages/FavorisQuestion'

function App() {

  return (
    <>
      <SessionProvider>
        <BrowserRouter>
          <Toaster />
          <Navbar />
          <Routes>
            <Route path={'/register'} element={<Register />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/'} element={<Home />} />
            <Route path={'/All'} element={<AllQuestion />} />
            <Route path={'/favoris'} element={<FavorisQuestion/>} />
            <Route path={'/post-question'} element={<QuestionForm />} />
          </Routes>
        </BrowserRouter>
      </SessionProvider>
    </>
  )
}

export default App
