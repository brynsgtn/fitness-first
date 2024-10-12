import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';
import '../styles/registration.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid function

export default function Registration() {
  // to store values of the input fields
  const { user, setUser, registeredUsers, setRegisteredUsers } = useContext(UserContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [section, setSection] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  // to determine whether submit button is enabled or not
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Registered users: ', registeredUsers);
  }, [registeredUsers]);

  useEffect(() => {
    if (
      firstName !== '' &&
      lastName !== '' &&
      role !== '' &&
      email !== '' &&
      password !== '' &&
      confirmPassword !== '' &&
      password === confirmPassword &&
      (role === 'instructor' || (role === 'student' && section !== ''))
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [firstName, lastName, email, role, section, password, confirmPassword]);

  const checkEmailAvailability = async (email) => {
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    return existingUsers.some((existingUser) => existingUser.email === email);
  };

  const registerUser = async (e) => {
    e.preventDefault();

    const isEmailTaken = await checkEmailAvailability(email);

    if (isEmailTaken) {
      Swal.fire({
        title: 'Email already registered',
        icon: 'error',
        text: 'Please use a different email.',
        confirmButtonColor: '#f97316',
      });
      return;
    }

    try {
      // Create a user object
      const user = {
        id: uuidv4(), // Generate a unique ID for the user
        firstName,
        lastName,
        email,
        role,
        section: role === 'student' ? section : null, // Set section only if the role is 'student'
        password,
      };

      // If the role is 'student', add the health data array
      if (role === 'student') {
        user.healthData = [
          {
            id: uuidv4(), // Generate a unique ID for the healthData
            date: null,
            totalCalories: null,
            averageHeartRate: null,
            totalSteps: null,
            healthCondition: null, // You can adjust this as needed
          },
        ];
      }

      // Store user data in localStorage
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]'); // Retrieve existing users
      users.push(user); // Add the new user to the array
      localStorage.setItem('registeredUsers', JSON.stringify(users)); // Store updated array back in localStorage

      // Update registeredUsers state
      const updatedRegisteredUsers = [...registeredUsers, user];
      setRegisteredUsers(updatedRegisteredUsers); // Update the registered users in context

      // Clear input fields
      setFirstName('');
      setLastName('');
      setEmail('');
      setRole('');
      setSection('');
      setPassword('');
      setConfirmPassword('');

      Swal.fire({
        title: 'Registration Successful',
        icon: 'success',
        text: 'Welcome to TrackFit!',
        confirmButtonColor: '#f97316',
      });

      navigate('/login');
    } catch (error) {
      Swal.fire({
        title: 'Something went wrong',
        icon: 'error',
        text: 'Please, try again.',
        confirmButtonColor: '#f97316',
      });
      console.error('Registration Error:', error);
    }
  };

  return (
    <>
      <div className="h-screen">
        <div className="pt-10 pb-5">
          <img alt="Your Company" src="src/assets/logo.png" className="h-10 w-auto mx-auto md:mx-0 md:ps-10" />
        </div>
        <div className="flex flex-row justify-center items-center">
          <div className="hidden xl:block">
            <img src="src/assets/girl.png" className="running-girl" />
          </div>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-3 pb-12 md:pt-8 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mt-10 xl:mt-0">
                Register an account
              </h2>
            </div>

            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
              <form action="#" method="POST" className="space-y-2">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    First Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="first-name"
                      name="first-name"
                      type="text"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Last Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="last-name"
                      name="last-name"
                      type="text"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-20">
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                      Role
                    </label>
                    <div className="mt-2">
                      <select
                        id="role"
                        name="role"
                        value={role}
                        required
                        onChange={(e) => setRole(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                      >
                        <option value="">Select a role</option>
                        <option value="student">Student</option>
                        <option value="instructor">Instructor</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="section"
                      className={`block text-sm font-medium leading-6 text-gray-900 ${role === 'instructor' ? 'opacity-50' : ''}`}
                    >
                      Section
                    </label>
                    <div className="mt-2">
                      <select
                        id="section"
                        name="section"
                        value={section}
                        onChange={(e) => setSection(e.target.value)}
                        required={role === 'student'} // Section required only if role is 'student'
                        disabled={role === 'instructor'} // Disable if role is 'instructor'
                        className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 ${
                          role === 'instructor' ? 'cursor-not-allowed' : ''
                        }`}
                      >
                        <option value="">Select a program</option>
                        <option value="UOX">UOX</option>
                        <option value="Blended">Blended</option>
                        <option value="Face to Face">Face to Face</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
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
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-gray-900">
                    Confirm Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  {error && (
                    <p className="text-red-500 text-sm mt-2">
                      {error}
                    </p>
                  )}
                </div>

                <div className="pt-4">
                  {isActive ? (
                    <button
                      type="submit"
                      onClick={registerUser}
                      className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                    >
                      Register
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled
                      className="flex w-full justify-center rounded-md bg-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-500 shadow-sm"
                    >
                      Register
                    </button>
                  )}
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold leading-6 text-orange-600 hover:text-orange-500">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
