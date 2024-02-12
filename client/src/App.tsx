

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './Pages/auth/Register'
import { SessionProvider } from './context/auth'
import Login from './Pages/auth/Login'
import Home from './Pages/Home'

function App() {

  return (
    <>
      <SessionProvider>
        <BrowserRouter>
          <Routes>
            <Route path={'/register'} element={<Register />}/>
            <Route path={'/login'} element={<Login />}/>      
            <Route path={'/'} element={<Home />}/>            
          </Routes>
        </BrowserRouter>
      </SessionProvider>
    </>
  )
}

export default App
