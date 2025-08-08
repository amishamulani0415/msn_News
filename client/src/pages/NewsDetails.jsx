import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';

export default function NewsDetails() {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await API.get(`/news/${id}`);
        setNews(res.data);
      } catch (err) {
        console.error('Error fetching news details', err);
      }
    };
    fetchNews();
  }, [id]);

  if (!news) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-6">
      <img
        src={news.imageURL}
        alt="news"
        className="w-full h-80 object-cover rounded-lg mb-4"
      />
      <h1 className="text-3xl font-bold mb-2">{news.headline}</h1>
      <div className="text-sm text-gray-500 mb-4">
        {news.category} | {new Date(news.createdAt).toLocaleString()}
      </div>
      <p className="text-gray-700 text-lg">{news.description}</p>
    </div>
  );
}
