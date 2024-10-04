import { useState } from 'react'

import './index.css'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Dashboard from './pages/Dashboard'
import Fitness from './pages/Fitness'
import Navbar from './components/Navbar'
import Profile from './pages/Profile'
import Report from './pages/Report'
import InstructorReport from './pages/InstructorReport'
import Manage from './pages/Manage'

function App() {


  return (
    <>
      {/* <Landing/>
      <Login/>
      <Registration/>
      <Navbar/>
      <Dashboard/> */}
      <Navbar/>
      {/* <Fitness /> */}
      {/* <Profile/> */}
      {/* <Report/> */}
      {/* <InstructorReport/> */}
      <Manage/>

    </>
  )
}

export default App
