
import { useState } from 'react'
import '../styles/landing.css'


export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white h-screen">     
        <div className="mx-auto max-w-6xl px-10 py-32 sm:py-48 lg:py-56 flex flex-row">
          <div>
            <img src='./src/assets/logo.png' className='mb-5'></img>
            <h1 className="text-4xl font-bold tracking-tight text-yellow-400 sm:text-6xl">
                <span className='font-light tracking-widest'>FITNESS</span> <span className='italic'>FIRST.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
              fugiat veniam occaecat fugiat aliqua.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                Contact us <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className='hidden sm:block'>
            <img src='src/assets/girl.png' className='running-girl'></img>
         </div>
        </div>
    </div>
  )
}
