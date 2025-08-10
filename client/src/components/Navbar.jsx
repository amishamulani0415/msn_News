import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/register");
  };

  const handleAddNews = () => {
    navigate("/form"); // no login check now
  };

  const navLinks = (
    <>
      <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
      <li><Link to="/india" className="hover:text-blue-600">India</Link></li>
      <li><Link to="/world" className="hover:text-blue-600">World</Link></li>
      <li><Link to="/weather" className="hover:text-blue-600">Weather</Link></li>
      <li><Link to="/for-you" className="hover:text-blue-600">For You</Link></li>
      <li>
        <button onClick={handleAddNews} className="hover:text-blue-600">Add News</button>
      </li>
      {!isLoggedIn ? (
        <>
          <li><button onClick={handleLogin} className="hover:text-blue-600">Login</button></li>
          <li><button onClick={handleSignup} className="hover:text-blue-600">Sign Up</button></li>
        </>
      ) : (
        <li><button onClick={handleLogout} className="hover:text-red-600">Logout</button></li>
      )}
    </>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-blue-600">
          <Link to="/">📰 MSN News</Link>
        </div>

        {/* Desktop Nav */}
        <ul className=" md:flex gap-6 text-gray-700 font-medium items-center">
          {navLinks}
        </ul>

        {/* Search bar (Desktop) */}
        <div className=" md:flex items-center bg-gray-100 px-3 py-1 rounded-full">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            className="bg-transparent ml-2 outline-none text-sm"
            placeholder="Search"
            disabled
          />
        </div>

        {/* Hamburger Icon (Mobile) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
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
