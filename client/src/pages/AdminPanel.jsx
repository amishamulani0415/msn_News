// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminPanel = () => {
//   const [headline, setHeadline] = useState('');
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState('');
//   const [location, setLocation] = useState('');
//   const [name, setName] = useState('');
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState('');
//   const [newsList, setNewsList] = useState([]);
//   const [editId, setEditId] = useState(null);

//   const API_BASE = 'http://localhost:5000/api/news';

//   useEffect(() => {
//     fetchNews();
//   }, []);

//   const fetchNews = async () => {
//     try {
//       const res = await axios.get(API_BASE);
//       setNewsList(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file || !file.type.startsWith('image/')) {
//       alert('Please select a valid image file');
//       return;
//     }
//     setImage(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('headline', headline);
//     formData.append('description', description);
//     formData.append('category', category);
//     formData.append('location', location);
//     formData.append('name', name);
//     formData.append('image', image);
//     formData.append('timestamp', new Date().toISOString());

//     try {
//       if (editId) {
//         await axios.put(`${API_BASE}/${editId}`, formData);
//         setEditId(null);
//       } else {
//         await axios.post(API_BASE, formData);
//       }

//       setHeadline('');
//       setDescription('');
//       setCategory('');
//       setLocation('');
//       setName('');
//       setImage(null);
//       setPreview('');
//       fetchNews();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleEdit = (news) => {
//     setHeadline(news.headline);
//     setDescription(news.description);
//     setCategory(news.category);
//     setLocation(news.location);
//     setName(news.name);
//     setEditId(news._id);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${API_BASE}/${id}`);
//       fetchNews();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="p-6 bg-gradient-to-br from-gray-100 to-blue-50 min-h-screen font-sans">
//       <h2 className="text-4xl font-bold mb-8 text-center text-blue-700">📰 Admin Panel - Post News</h2>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-lg p-8 rounded-lg w-full max-w-3xl mx-auto mb-10 space-y-4"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="text"
//             placeholder="Your Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="p-2 border rounded w-full"
//             required
//           />
//           <input
//             type="text"
//             placeholder="Location"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             className="p-2 border rounded w-full"
//             required
//           />
//           <input
//             type="text"
//             placeholder="Headline"
//             value={headline}
//             onChange={(e) => setHeadline(e.target.value)}
//             className="p-2 border rounded w-full"
//             required
//           />
//           <input
//             type="text"
//             placeholder="Category"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="p-2 border rounded w-full"
//             required
//           />
//         </div>

//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full p-2 border rounded h-28"
//           required
//         />

//         <input
//           type="file"
//           onChange={handleImageChange}
//           className="mb-2"
//           accept="image/*"
//           required={!editId}
//         />
//         {preview && (
//           <img src={preview} alt="Preview" className="h-40 object-cover mb-4 rounded shadow-md" />
//         )}

//         <button
//           type="submit"
//           className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold px-6 py-2 rounded w-full"
//         >
//           {editId ? 'Update News' : 'Post News'}
//         </button>
//       </form>

//       {/* News Display Table */}
//       <div className="max-w-6xl mx-auto bg-white shadow-md p-6 rounded-md overflow-x-auto">
//         <h3 className="text-2xl font-semibold mb-4 text-gray-700">🗂 All News Articles</h3>
//         <table className="w-full table-auto text-sm text-left border border-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2 border">Image</th>
//               <th className="p-2 border">Headline</th>
//               <th className="p-2 border">Category</th>
//               <th className="p-2 border">Posted By</th>
//               <th className="p-2 border">Location</th>
//               <th className="p-2 border">Time</th>
//               <th className="p-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {newsList.map((news) => (
//               <tr key={news._id} className="hover:bg-gray-50">
//                 <td className="p-2 border">
//                   <img src={news.imageURL} alt="News" className="h-16 w-24 object-cover rounded" />
//                 </td>
//                 <td className="p-2 border">{news.headline}</td>
//                 <td className="p-2 border">{news.category}</td>
//                 <td className="p-2 border">{news.name}</td>
//                 <td className="p-2 border">{news.location}</td>
//                 <td className="p-2 border">
//                   {new Date(news.timestamp).toLocaleString()}
//                 </td>
//                 <td className="p-2 border space-x-2">
//                   <button
//                     onClick={() => handleEdit(news)}
//                     className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(news._id)}
//                     className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {newsList.length === 0 && (
//               <tr>
//                 <td colSpan="7" className="p-4 text-center text-gray-500">
//                   No news available.
//                 </td>
//               </tr>
//             )}
//           </tbody>        </table>
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;
