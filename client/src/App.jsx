// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import NewsForm from './components/NewsForm';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './pages/Home';
import NewsDetail from './components/NewsDetail';

export default function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  return (
    <Router>
      <Navbar setSearch={setSearch} onCategorySelect={setCategory} />
      <Routes>
        <Route path="/" element={<Home search={search} selectedCategory={category} />} />
        <Route path="/add" element={<NewsForm />} />
        <Route path="/edit/:id" element={<NewsForm />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}
