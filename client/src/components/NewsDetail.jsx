import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function NewsDetail() {
  const { id } = useParams(); // URL se news id
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await API.get(`/news/${id}`);
        setNews(res.data);
      } catch (err) {
        console.error("Failed to fetch news", err);
      }
    };
    fetchNews();
  }, [id]);

  if (!news) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded-xl shadow-lg bg-white">
      <img
        src={news.imageURL}
        alt="news"
        className="w-full h-80 object-cover rounded-lg mb-5"
      />
      <h1 className="text-3xl font-bold mb-3">{news.headline}</h1>
      <div className="text-sm text-gray-500 mb-2">
        {news.category} | {new Date(news.createdAt).toLocaleString()}
      </div>
      <p className="text-gray-700 text-lg">{news.description}</p>
    </div>
  );
}
