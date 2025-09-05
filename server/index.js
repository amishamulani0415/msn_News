const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());

// ✅ CORS setup for both local + deployed frontend
const allowedOrigins = [
  'http://localhost:5173',             // Local Vite
  process.env.FRONTEND_URL             // Deployed frontend (Netlify)
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// ✅ Routes
const newsRoutes = require('./routes/newsRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/news', newsRoutes);
app.use('/api/auth', authRoutes);

// ✅ Health check route
app.get('/', (req, res) => {
  res.send({ activeStatus: true, error: false });
});

// ✅ DB connect + server start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.log('❌ MongoDB Error:', err));
