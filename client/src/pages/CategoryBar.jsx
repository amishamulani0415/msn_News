// // src/pages/CategoryBar.jsx
// import React from 'react';

// const categories = ['All', 'News', 'Sports', 'Play', 'Money', 'Weather', 'Watch', 'Shopping'];

// export default function CategoryBar({ selected, onSelect }) {
//   return (
//     <div className="w-full overflow-x-auto bg-white shadow-sm sticky top-[56px] z-40">
//       <div className="flex space-x-3 px-4 py-2 min-w-max">
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => onSelect(cat)}
//             className={`whitespace-nowrap px-4 py-1 rounded-full border text-sm transition ${
//               selected === cat
//                 ? 'bg-blue-600 text-white'
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
