import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [user, setUser] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', user);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6">
      <h2 className="text-xl mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-2 border" type="email" placeholder="Email"
          onChange={(e) => setUser({ ...user, email: e.target.value })} required />
        <input className="w-full p-2 border" type="password" placeholder="Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })} required />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white">Login</button>
      </form>
    </div>
  );
}
