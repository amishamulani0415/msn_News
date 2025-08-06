import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin"; 
import EditNews from "./pages/EditNews";
import AdminLogin from "./pages/adminLogin";
import AdminPanel from "./pages/adminPanel";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Dashboard from "./pages/dashboard.jsx";

import NewsForm from "./components/NewsForm.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ Global navbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLogin />} /> {/* ✅ Single admin login */}
         {/* ✅ Change 2: Duplicate '/admin' route hataya 
            Pehle do route the - Admin & AdminLogin
            Sirf AdminLogin rakha login ke liye */}
        <Route path="/admin/panel" element={<AdminPanel />} />
        <Route path="/edit/:id" element={<EditNews />} />
        <Route path="/form" element={<NewsForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
