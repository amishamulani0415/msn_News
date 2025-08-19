import React from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

export default function NewsCard({ item, onDelete }) {
  const token = localStorage.getItem('token');

  const handleDelete = async (e) => {
    e.stopPropagation(); // prevent card click navigation
    try {
      await API.delete(`/news/${item._id}`,{
        headers: { Authorization: `Bearer ${token}`}
      });
      onDelete(item._id);
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Error deleting news');
    }
  };

  return (
    <Link to={`/news/${item._id}`} className="block">
      <div className="w-full border p-5 rounded-xl shadow-md bg-white flex flex-col h-full hover:shadow-lg transition">
        <img
          src={item.imageURL}
          alt="news"
          className="h-60 w-full object-cover rounded-lg mb-3"
        />

        <div className="text-sm text-gray-500 mb-1">
          {item.category} | {new Date(item.createdAt).toLocaleString()}
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {item.headline}
        </h2>

        <div className="flex justify-end gap-4 mt-auto">
          <Link
            to={`/edit/${item._id}`}
            onClick={(e) => e.stopPropagation()} // prevent card click
            className="text-green-600 hover:underline"
          >
            Edit
          </Link>
          {token && (
            <button
              onClick={handleDelete}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}