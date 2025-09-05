import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api';

export default function NewsForm() {
  const [news, setNews] = useState({
    headline: '',
    description: '',
    category: '',
    imageURL: '',
  });

  const categories = ['News', 'Sports', 'Play', 'Money', 'Weather', 'Watch', 'Shopping'];
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      API.get(`/news/${id}`)
        .then(res => setNews(res.data))
        .catch(err => console.error('Failed to load news:', err));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await API.put(`/news/${id}`, news);
      } else {
        await API.post('/news', news);
      }
      navigate('/');
    } catch (err) {
      console.error('Failed to submit news:', err);
      alert('Error saving news');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 px-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {id ? 'Update News' : 'Add News'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Headline"
          value={news.headline}
          onChange={(e) => setNews({ ...news, headline: e.target.value })}
          required
        />

        <textarea
          className="w-full p-2 border rounded"
          placeholder="Description"
          rows={5}
          value={news.description}
          onChange={(e) => setNews({ ...news, description: e.target.value })}
          required
        />

        <select
          className="w-full p-2 border rounded"
          value={news.category}
          onChange={(e) => setNews({ ...news, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Image URL"
          value={news.imageURL}
          onChange={(e) => setNews({ ...news, imageURL: e.target.value })}
        />

        {/* 🖼️ Image Preview */}
        {news.imageURL && (
          <div className="mt-2">
            <p className="text-sm text-gray-600 mb-1">Image Preview:</p>
            <img
              src={news.imageURL}
              alt="preview"
              className="w-full h-48 object-cover rounded border"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x200?text=Image+not+found';
              }}
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          {id ? 'Update News' : 'Submit News'}
        </button>
      </form>
    </div>
  );
}
