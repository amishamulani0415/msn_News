import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import EditNews from "./pages/EditNews";
import AdminLogin from "./pages/adminLogin";
import AdminPanel from "./pages/adminPanel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/edit/:id" element={<EditNews />} />
        <Route path='/admin' element={<AdminLogin />} />
        <Route path='/admin/panel' element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
