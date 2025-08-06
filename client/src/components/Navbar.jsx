import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-700 text-white px-6 py-4 shadow">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          📰 MSN Clone
        </Link>
        <ul className="flex space-x-6 text-sm">
          <li>
            <Link to="/" className="hover:text-gray-300 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/admin/panel" className="hover:text-gray-300 transition">
              Admin Panel
            </Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-gray-300 transition">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
