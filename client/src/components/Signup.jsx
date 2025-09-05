import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [user, setUser] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/signup', user);
      alert('Signup successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6">
      <h2 className="text-xl mb-4">Signup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-2 border" type="email" placeholder="Email"
          onChange={(e) => setUser({ ...user, email: e.target.value })} required />
        <input className="w-full p-2 border" type="password" placeholder="Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })} required />
        <button type="submit" className="px-4 py-2 bg-green-600 text-white">Signup</button>
      </form>
    </div>
  );
}
