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
import NewsLayout from "./components/NewsLayout.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <NewsLayout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLogin />} />
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
