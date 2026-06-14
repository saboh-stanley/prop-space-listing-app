// backend/controllers/propertyController.js
const Property = require('../models/Property');

// @desc    Create a new property listing
// @route   POST /api/properties
// @access  Private (Authenticated users only)
const createProperty = async (req, res) => {
  try {
    const { title, description, price, location, propertyType, imageUrls } = req.body;

    // Validate required fields
    if (!title || !description || !price || !location || !propertyType) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Create property with the authenticated user as author
    const property = await Property.create({
      title,
      description,
      price,
      location,
      propertyType,
      imageUrls: imageUrls || [],
      author: req.user._id
    });

    res.status(201).json(property);
  } catch (error) {
    console.error('Create property error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all properties (Public feed - anyone can view)
// @route   GET /api/properties
// @access  Public
const getAllProperties = async (req, res) => {
  try {
    const { city, minPrice, maxPrice } = req.query;
    
    // Build filter object
    let filter = {};
    
    // Filter by city (case-insensitive)
    if (city) {
      filter['location.city'] = { $regex: new RegExp(city, 'i') };
    }
    
    // Filter by price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    const properties = await Property.find(filter)
      .populate('author', 'username fullName avatarUrl')
      .sort({ createdAt: -1 }); // Newest first
    
    res.status(200).json(properties);
  } catch (error) {
    console.error('Get properties error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single property by ID
// @route   GET /api/properties/:id
// @access  Public
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('author', 'username fullName avatarUrl');
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    res.status(200).json(property);
  } catch (error) {
    console.error('Get property error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get properties by current user (My Listings)
// @route   GET /api/properties/user/listings
// @access  Private
const getUserProperties = async (req, res) => {
  try {
    const properties = await Property.find({ author: req.user._id })
      .sort({ createdAt: -1 });
    
    res.status(200).json(properties);
  } catch (error) {
    console.error('Get user properties error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update property listing (Author only)
// @route   PUT /api/properties/:id
// @access  Private (Author only)
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    // Check ownership - This is the backend ownership validation required by manual
    if (property.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden - You do not own this property' });
    }
    
    // Update fields
    const { title, description, price, location, propertyType, imageUrls } = req.body;
    
    if (title) property.title = title;
    if (description) property.description = description;
    if (price) property.price = price;
    if (location) property.location = location;
    if (propertyType) property.propertyType = propertyType;
    if (imageUrls) property.imageUrls = imageUrls;
    
    const updatedProperty = await property.save();
    res.status(200).json(updatedProperty);
  } catch (error) {
    console.error('Update property error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete property listing (Author only)
// @route   DELETE /api/properties/:id
// @access  Private (Author only)
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    // Check ownership - This is the backend ownership validation required by manual
    if (property.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden - You do not own this property' });
    }
    
    await property.deleteOne();
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Delete property error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createProperty,
  getAllProperties,
  getPropertyById,
  getUserProperties,
  updateProperty,
  deleteProperty
};