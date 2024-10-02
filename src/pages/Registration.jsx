
import '../styles/registration.css'

export default function Registration() {
    return (
      <>
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
        <div className=' h-screen'>
            <div className="pt-10 pb-5">
            <img
                alt="Your Company"
                src="src/assets/logo.png"
                className=" h-10 w-auto mx-auto md:mx-0 md:ps-10"
                />
            </div>
            <div className="flex flex-row justify-center items-center">
            <div className='hidden lg:block'>
                <img src='src/assets/girl.png' className='running-girl'></img>
            </div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-3 pb-12 lg:px-0 lg:pt-0">
            
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                
                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
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
                    />
                    </div>
                </div>
                <div className="flex gap-20">
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                            Role
                        </label>
                        <div className="mt-2">
                            <select id="role" name="role"
                                required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6">
                                <option value="">Select a role</option>
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="section" className="block text-sm font-medium leading-6 text-gray-900">
                            Section
                        </label>
                        <div className="mt-2">
                            <select id="section" name="section"
                                required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6">
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
                    />
                    </div>
                </div>
                    
                
    
                <div>
                    <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Register
                    </button>
                </div>
                </form>
    
                <p className="mt-5 text-center text-sm text-gray-500">
                Already have an account?{' '}
                <a href="#" className="font-semibold leading-6 text-orange-600 hover:text-yellow-400">
                    Login now
                </a>
                </p>
            </div>
            </div>
            </div>
        </div>
      </>
    )
  }
  