import '../styles/login.css'
import { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const { user, setUser, registeredUsers, setRegisteredUsers } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  // Check if email and password fields are filled
  useEffect(() => {
    if (email !== '' && password !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  // Function to retrieve registered users from localStorage
  const getRegisteredUsers = () => {
    return JSON.parse(localStorage.getItem('users')) || [];
  };

  // Function to handle user login
  const handleLogin = (e) => {
    e.preventDefault();
    const users = getRegisteredUsers();
    const currentUser = users.find(user => user.email === email && user.password === password);

    if (currentUser) {
      // Set the user in context and redirect
      setUser(currentUser);
      localStorage.setItem('user', JSON.stringify(currentUser)); // Store updated 
      Swal.fire({
        title: "Login Successful",
        icon: "success",
        text: "Welcome back!",
        confirmButtonColor: '#f97316',
      });
      navigate("/dashboard"); // Redirect to dashboard or another page
    } else {
      Swal.fire({
        title: "Login Failed",
        icon: "error",
        text: "Invalid email or password.",
        confirmButtonColor: '#f97316',
      });
    }
  };

  return (
    <>
      <div className='h-screen'>
        <div className="pt-10 pb-20">
          <img
            alt="Your Company"
            src="src/assets/logo.png"
            className="h-10 w-auto mx-auto md:mx-0 md:ps-10"
          />
        </div>
        <div className="flex flex-row justify-center items-center">
            <div className='hidden xl:block'>
                <img src='src/assets/girl.png' className='running-girl'></img>
            </div>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-3 pb-12 md:pt-8 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mt-10 xl:mt-0">
                Login to your account
              </h2>
            </div>
            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-2">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ${
                      isActive ? 'bg-orange-600 hover:bg-yellow-400' : 'bg-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!isActive}
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </div>
              </form>

              <p className="mt-5 text-center text-sm text-gray-500">
                Don't have an account?{' '}
                <Link
                  to="/registration"
                  className="font-semibold leading-6 text-orange-600 hover:text-yellow-400"
                >
                  Register now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
