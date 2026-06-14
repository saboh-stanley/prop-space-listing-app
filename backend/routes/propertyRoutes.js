// backend/routes/propertyRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createProperty,
  getAllProperties,
  getPropertyById,
  getUserProperties,
  updateProperty,
  deleteProperty
} = require('../controllers/propertyController');

// Public routes (anyone can view properties)
router.get('/', getAllProperties);
router.get('/:id', getPropertyById);

// Protected routes (authentication required)
router.post('/', protect, createProperty);
router.get('/user/listings', protect, getUserProperties);
router.put('/:id', protect, updateProperty);
router.delete('/:id', protect, deleteProperty);

module.exports = router;