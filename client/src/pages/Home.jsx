import React, { useEffect, useState } from 'react';
import API from '../api';
import NewsCard from '../components/NewsCard';
import Weather from '../pages/Weather'; // 👈 Import Weather

export default function Home({ search, selectedCategory }) {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const res = await API.get('/news');
      setNewsList(res.data);
    };
    fetchNews();
  }, []);

  const handleDelete = (id) => {
    setNewsList(newsList.filter(news => news._id !== id));
  };

  const filtered = newsList.filter(news => {
    const matchesSearch = news.headline.toLowerCase().includes(search.toLowerCase()) ||
      news.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || news.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {filtered.map((news, index) => (
        <React.Fragment key={news._id}>
          <NewsCard item={news} onDelete={handleDelete} />
          {index === 2 && ( // 👈 Inject after 3rd item (0,1,2)
            <div className="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-1">
              <Weather />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
