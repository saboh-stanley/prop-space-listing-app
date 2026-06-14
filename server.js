// server.js - Main entry point for PropSpace Backend

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors()); // Allow frontend to make requests
app.use(express.json()); // Parse JSON request bodies

// Import routes (we will create these next)
const userRoutes = require('./backend/routes/userRoutes');
const propertyRoutes = require('./backend/routes/propertyRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);

// Test route to check if server is running
app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'PropSpace API is running!' });
});

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/propspace';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});