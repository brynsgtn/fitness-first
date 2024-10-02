import { useState } from 'react'

import './index.css'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'

function App() {


  return (
    <>
      {/* <Landing/> */}
      {/* <Login/> */}
      {/* <Registration/> */}
      <Navbar/>
      <Dashboard/>
    </>
  )
}

export default App
