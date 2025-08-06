import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditNews() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageURL: "",
    importance: "normal",
    type: "India",
    location: "",
  });

  // Fetch existing news by ID
  useEffect(() => {
    fetch(`http://localhost:5000/news/${id}`) // 🔁 Replace with real backend later
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          title: data.title || "",
          description: data.description || "",
          imageURL: data.imageURL || "",
          importance: data.importance || "normal",
          type: data.type || "India",
          location: data.location || "",
        });
      })
      .catch((err) => {
        console.error("Failed to load news:", err);
      });
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/news/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("✅ News updated successfully!");
        navigate("/admin");
      } else {
        alert("❌ Failed to update news.");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded bg-white shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">✏️ Edit News</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="News Title"
          className="w-full p-2 border rounded"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="News Description"
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="imageURL"
          value={formData.imageURL}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full p-2 border rounded"
        />

        <select
          name="importance"
          value={formData.importance}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="normal">Normal</option>
          <option value="important">Important</option>
        </select>

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="India">India</option>
          <option value="World">World</option>
          <option value="Weather">Weather</option>
          <option value="For You">For You</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditNews;
