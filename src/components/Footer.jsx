import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Site Name */}
        <div className="text-xl font-mono transition duration-300 hover:text-yellow-400">
          <b>&lt;brysgtn.dev/&gt;</b>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-2 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} YourSite. All rights reserved.
      </div>
    </footer>
  );
}
