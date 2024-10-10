import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../UserContext'
import '../styles/registration.css'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid function

export default function Registration() {

    // to store values of the input fields
    const {user, setUser, registeredUsers, setRegisteredUsers} = useContext(UserContext);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [role, setRole] = useState("");
    const [section, setSection] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [registeredEmails, setRegisteredEmails] = useState([]);
    // to determine whether submit button is enabled or not
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        console.log("Registered users: ", registeredUsers);
      }, [registeredUsers]);

    useEffect(() => {
        if (
            firstName !== "" &&
            lastName !== "" &&
            role !== "" &&
            section !== "" &&
            email !== "" &&
            password !== "" &&
            confirmPassword !== "" &&
            password === confirmPassword
        ) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
      }, [firstName, lastName, email, role, section, password, confirmPassword]);
    
      const checkEmailAvailability = async (email) => {
        const existingEmails = JSON.parse(localStorage.getItem('registeredEmails') || '[]');
        return existingEmails.some(existingEmail => existingEmail === email);
      };

      const registerUser = async (e) => {
        e.preventDefault();
    
        const isEmailTaken = await checkEmailAvailability(email);
    
        if (isEmailTaken) {
          Swal.fire({
            title: "Duplicate Email Found",
            icon: "error",
            text: "Please use a different email.",
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
            section,
            password
          };
    
          // If the role is 'student', add the health data array
          if (role === "student") {
            user.healthData = [
              {
                date: new Date().toISOString().split('T')[0], // Add today's date in YYYY-MM-DD format
                totalCalories: null,
                averageHeartRate: null,
                totalSteps: null,
                healthCondition: 'Unknown' // You can adjust this as needed
              }
            ];
          }
    
          // Store user data in localStorage
          const users = JSON.parse(localStorage.getItem('users') || '[]'); // Retrieve existing users
          users.push(user); // Add the new user to the array
          localStorage.setItem('users', JSON.stringify(users)); // Store updated array back in localStorage
    
          

          // Update registeredUsers state
          const updatedRegisteredUsers = [...registeredUsers, user];
          setRegisteredUsers(updatedRegisteredUsers); // Update the registered users in context
    
          // Register email in localStorage
          const existingEmails = JSON.parse(localStorage.getItem('registeredEmails') || '[]');
          const updatedEmails = [...existingEmails, email];
          localStorage.setItem('registeredEmails', JSON.stringify(updatedEmails));
          setRegisteredEmails(updatedEmails);
    
          // Clear input fields
          setFirstName("");
          setLastName("");
          setEmail("");
          setRole("");
          setSection("");
          setPassword("");
          setConfirmPassword("");
    
          Swal.fire({
            title: "Registration Successful",
            icon: "success",
            text: "Welcome to TrackFit!",
            confirmButtonColor: '#f97316',
          });
    
          navigate("/login");
        } catch (error) {
          Swal.fire({
            title: "Something went wrong",
            icon: "error",
            text: "Please, try again.",
            confirmButtonColor: '#f97316',
          });
          console.error("Registration Error:", error);
        }
    };
      
    return (
      <>

        <div className=' h-screen'>
            <div className="pt-10 pb-5">
            <img
                alt="Your Company"
                src="src/assets/logo.png"
                className=" h-10 w-auto mx-auto md:mx-0 md:ps-10"
                />
            </div>
            <div className="flex flex-row justify-center items-center">
            <div className='hidden xl:block'>
                <img src='src/assets/girl.png' className='running-girl'></img>
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
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
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
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
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
                                value={role} // Bind the value to the state
                                required 
                                onChange={(e) => setRole(e.target.value)} // Update the state on change
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                            >
                                <option value="">Select a role</option>
                                <option value="student">Student</option>
                                <option value="instructor">Instructor</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="section" className="block text-sm font-medium leading-6 text-gray-900">
                            Section
                        </label>
                        <div className="mt-2">
                            <select 
                                id="section" 
                                name="section"
                                value={section}
                                onChange={(e) => setSection(e.target.value)} // Update the state on change
                                required 
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                            >
                                <option value="">Select a section</option>
                                <option value="section1">Section 1</option>
                                <option value="section2">Section 2</option>
                                <option value="section3">Section 3</option>
                            </select>
                        </div>
                    </div>
                </div>

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
                        onChange={(e) => setEmail(e.target.value)} // Add this onChange handler
                    />
                    </div>
                </div>
    
                <div>
                    <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                    </label>
                    </div>
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
                    <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Confirm Password
                    </label>
                    </div>
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
                    <button
                    type="submit"
                    className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ${
                      isActive ? 'bg-orange-600 hover:bg-yellow-400' : 'bg-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!isActive}
                    onClick={registerUser}
                    >
                    Register
                    </button>
                </div>
                </form>
    
                <p className="mt-5 text-center text-sm text-gray-500">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-semibold leading-6 text-orange-600 hover:text-yellow-400"
                >
                  Login now
                </Link>
                </p>
            </div>
            </div>
            </div>
        </div>
      </>
    )
  }
  