import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // simulate login
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleAddNews = () => {
    if (isLoggedIn) {
      navigate('/add-news');
    } else {
      alert('Please login to add news.');
      navigate('/login');
    }
  };

  const navLinks = (
    <>
      <li><Link to="/" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>Home</Link></li>
      <li><Link to="/india" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>India</Link></li>
      <li><Link to="/world" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>World</Link></li>
      <li><Link to="/weather" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>Weather</Link></li>
      <li><Link to="/for-you" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>For You</Link></li>
      <li>
        <button onClick={handleAddNews} className="hover:text-blue-600">Add News</button>
      </li>
      {!isLoggedIn ? (
        <>
          <li><button onClick={handleLogin} className="text-green-600 hover:underline">Login</button></li>
          <li><button onClick={handleSignup} className="text-blue-600 hover:underline">Sign Up</button></li>
        </>
      ) : (
        <li><button onClick={handleLogout} className="text-red-600 hover:underline">Logout</button></li>
      )}
    </>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-extrabold text-blue-600">
          <Link to="/">📰 MSN News</Link>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 text-gray-700 font-medium items-center">
          {navLinks}
        </ul>

        {/* Search bar (Desktop Only) */}
        <div className="hidden md:flex items-center bg-gray-100 px-3 py-1 rounded-full">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            className="bg-transparent ml-2 outline-none text-sm"
            placeholder="Search (coming soon)"
            disabled
          />
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-3 text-gray-700 font-medium bg-white shadow rounded p-4">
            {navLinks}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
