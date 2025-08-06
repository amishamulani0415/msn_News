import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">📰 MSN News</div>

        {/* Hamburger for mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menu links */}
        <ul className={`md:flex gap-6 ${isOpen ? "block" : "hidden"} md:block`}>
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/india" className="hover:underline">India</Link></li>
          <li><Link to="/world" className="hover:underline">World</Link></li>
          <li><Link to="/weather" className="hover:underline">Weather</Link></li>
          <li><Link to="/for-you" className="hover:underline">For You</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
