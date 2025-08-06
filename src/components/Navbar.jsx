import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
return (
<nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
<div className="container mx-auto flex justify-between items-center">
<div className="text-2xl font-bold">📰 MSN News</div>
<ul className="flex gap-6">
<li><Link to="/" className="hover:underline">Home</Link></li>
<li><Link to="/add-news" className="hover:underline">Add News</Link></li>
<li><Link to="/about" className="hover:underline">About</Link></li>
</ul>
</div>
</nav>
);
};

export default Navbar;t