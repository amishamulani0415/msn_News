import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import EditNews from "./pages/EditNews";
import AdminLogin from "./pages/adminLogin";
import AdminPanel from "./pages/adminPanel";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Dashboard from "./pages/dashboard.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/edit/:id" element={<EditNews />} />
        <Route path='/admin' element={<AdminLogin />} />
        <Route path='/admin/panel' element={<AdminPanel />} />
        <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
