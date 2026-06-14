const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: {
    city: { type: String, required: true },
    country: { type: String, required: true }
  },
  propertyType: { type: String, required: true, enum: ['Apartment', 'House', 'Studio'] },
  imageUrls: { type: [String], default: [] },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Remove the problematic pre-save middleware - simplified
propertySchema.pre('save', function() {
  this.updatedAt = Date.now();
});

module.exports = mongoose.model('Property', propertySchema);