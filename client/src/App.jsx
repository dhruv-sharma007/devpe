import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Profile from './pages/Profile'

const App = () => {
  return (
    <div className=' overflow-hidden'>
      <Navbar />
      <Profile />
    </div>
  )
}

export default App
