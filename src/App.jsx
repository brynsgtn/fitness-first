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

// AppContent component handles the rendering of the app's content, including the Navbar and routes
function AppContent() {
  const location = useLocation(); // Get the current URL path
  const hideNavbarRoutes = ['/', '/login', '/registration']; // Routes where the Navbar should not be displayed

  return (
    <>
      {/* Conditionally render the Navbar based on the current route */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/fitness/:id" element={<Fitness />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/report" element={<Report />} />
        <Route path="/instructorreport" element={<InstructorReport />} />
        <Route path="/manage" element={<Manage />} />
      </Routes>
    </>
  );
}

// App component is the main component of the application
function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem(('currentUser' || [])))); // Initialize user state with data from localStorage
  const [registeredUsers, setRegisteredUsers] = useState(JSON.parse(localStorage.getItem('registeredUsers') || '[]')); // Initialize registeredUsers state with data from localStorage

  // Update registeredUsers state whenever it changes and log the updated values
  useEffect(() => {
    console.log("Registered users: ", registeredUsers);
    console.log("Current user: ", user);
  }, [registeredUsers, user]);

  // Save user data to localStorage whenever the user state changes
  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }, [user]);

  // Function to clear user data from localStorage
  const unsetUser = () => {
    localStorage.clear();
  }

  return (
    <UserProvider value={{ user, setUser, unsetUser, registeredUsers, setRegisteredUsers }}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;