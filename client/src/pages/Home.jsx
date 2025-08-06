import React, { useEffect, useState } from "react";
import apiService from "../services/apiService";
import apiPath from "../config/apiPath";

export default function Home() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await apiService.getCall(apiPath.getAllNews);
      // ✅ Change 1: apiService ab sirf data return kar raha hai
      // Isliye response.data.news ki jagah response.news use karenge

      if (response) {
        console.log("Fetched News:", response.news);
        setNews(response.news || []); 
        // ✅ Change 2: Optional chaining use kiya taaki empty case handle ho
      }
    };
    fetchNews();
  }, []); // ✅ Change 3: Empty dependency array so only runs once on mount

  return (
    <div className="newsContainer">
      {news.length > 0 ? (
        news.map((item) => <h2 key={item._id}>{item.newsTitle}</h2>)
      ) : (
        <p>No news found</p>  // ✅ Change 4: Better fallback message
      )}
      Welcome to MSN News
    </div>
  );
}
