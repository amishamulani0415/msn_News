const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config(); // Loads .env

// Load news data
const newsData = JSON.parse(fs.readFileSync('news_sample_data.json', 'utf-8'));

// Define schema
const newsSchema = new mongoose.Schema({
  headline: String,
  description: String,
  category: String,
  imageURL: String,
}, { timestamps: true });

const News = mongoose.model('News', newsSchema);

// Connect to MongoDB and insert
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('✅ MongoDB connected');

    await News.deleteMany(); // Optional: clear old data
    const inserted = await News.insertMany(newsData);

    console.log(`✅ Successfully inserted ${inserted.length} news articles`);
    process.exit();
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
