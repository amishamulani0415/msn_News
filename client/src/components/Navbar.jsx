// components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar({ setSearch, onCategorySelect }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  // token & email
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email'); // 👈 ensure login ke baad email localStorage me save karte ho

  const categories = ['All', 'News', 'Sports', 'Play', 'Money', 'Weather', 'Watch', 'Shopping'];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/');
  };

  return (
    <>
      <nav className="bg-gray-800 text-white px-4 py-3 flex flex-wrap items-center justify-between">
        <Link to="/" className="text-2xl font-bold">MSN</Link>

        <div className="block sm:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </div>

        <div className={`sm:flex sm:items-center gap-4 ${open ? 'block w-full mt-4' : 'hidden sm:block'}`}>
          <input
            type="text"
            placeholder="Search news..."
            className="px-3 py-1 rounded text-black w-full sm:w-auto"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link to="/">Home</Link>
          <Link to="/add">Add News</Link>

          {!token ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          ) : (
            <div className="relative">
              {/* Avatar button */}
              <button
                onClick={() => setShowEmail(!showEmail)}
                className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold"
              >
                {email ? email.charAt(0).toUpperCase() : "U"}
              </button>

              {/* Email dropdown */}
              {showEmail && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-md px-4 py-2">
                  <p className="text-sm">{email}</p>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 hover:underline text-sm mt-1"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Category Bar */}
      <div className="bg-gray-100 px-4 py-2 flex flex-wrap gap-3 justify-center text-sm sm:text-base">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategorySelect(cat)}
            className="bg-white px-3 py-1 rounded border hover:bg-blue-100 transition"
          >
            {cat}
          </button>
        ))}
      </div>
    </>
  );
}
