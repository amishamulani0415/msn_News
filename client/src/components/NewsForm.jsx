import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiService from "../services/apiService";

export default function NewsForm() {
  const [news, setNews] = useState({
    headline: "",
    description: "",
    category: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const categories = ["News", "Sports", "Play", "Money", "Weather", "Watch", "Shopping"];
  const { id } = useParams();
  const navigate = useNavigate();

  // Load existing news for edit
  useEffect(() => {
    if (id) {
      apiService
        .get(`/${id}`)
        .then((res) => setNews(res.data))
        .catch((err) => console.error("Failed to load news:", err));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("headline", news.headline);
      formData.append("description", news.description);
      formData.append("category", news.category);

      if (imageFile) {
        formData.append("mediaFile", imageFile);
      }

      if (id) {
        await apiService.put(`/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await apiService.post("/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      alert("✅ News saved successfully!");
      navigate("/");
    } catch (err) {
      console.error("Failed to submit news:", err);
      alert("❌ Error saving news. Check console.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {id ? "Update News" : "Add News"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Headline */}
        <input
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Headline"
          value={news.headline}
          onChange={(e) => setNews({ ...news, headline: e.target.value })}
          required
        />

        {/* Description */}
        <textarea
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Description"
          rows={5}
          value={news.description}
          onChange={(e) => setNews({ ...news, description: e.target.value })}
          required
        />

        {/* Category */}
        <select
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        {/* File Upload */}
        <input
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        {/* Preview */}
        {imageFile && (
          <div className="mt-2">
            <p className="text-sm text-gray-600 mb-1">Image Preview:</p>
            <img
              src={URL.createObjectURL(imageFile)}
              alt="preview"
              className="w-full h-48 object-cover rounded border"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          {id ? "Update News" : "Submit News"}
        </button>
      </form>
    </div>
  );
}
