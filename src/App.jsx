import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import Fitness from './pages/Fitness';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Report from './pages/Report';
import InstructorReport from './pages/InstructorReport';
import Manage from './pages/Manage';
import { UserProvider } from './UserContext';

function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = ['/', '/login', '/registration'];
  
 
 return (
    <> 
      {/* Conditionally render the Navbar based on the current route */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/fitness" element={<Fitness />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/report" element={<Report />} />
        <Route path="/instructorreport" element={<InstructorReport />} />
        <Route path="/manage" element={<Manage />} />
      </Routes>
    </>
  );
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const unsetUser = () => {
    localStorage.clear();
  }
  return (

    <UserProvider value = {{user, setUser, unsetUser}}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </UserProvider>
    
  );
}

export default App;
