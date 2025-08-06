import React from "react";
import { useEffect, useState } from "react";
import apiService from "../services/apiService";
import apiPath from "../config/apiPath";

const Home = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await apiService.getCall(apiPath.getAllNews);
      console.log("Fetched News:", response.data.news);
      setNews(response.data.news);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };
  return (
    <>
      <div className="newsContainer">
        {news.map((item) => (
          <h2 key={item._id}>{item.newsTitle}</h2>
        ))}
      </div>
    </>
  );
};

export default Home;
