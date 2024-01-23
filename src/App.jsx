import './App.css'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from "./features/authSlice"
import { Header, Footer } from './components/index'
import { Outlet } from 'react-router'

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className='bg-gray-300'>
      <div>
        <Header />
        Here Comes nothing...<Outlet />
        <Footer />
      </div>

    </div>) : (<div className='bg-rose-400'>Loading...</div>)
}

export default App
