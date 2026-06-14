const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, default: '' },
  phoneNumber: { type: String, default: '' },
  avatarUrl: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving - SIMPLE VERSION
userSchema.pre('save', function() {
  if (!this.isModified('password')) return;
  const hash = crypto.createHash('sha256');
  hash.update(this.password);
  this.password = hash.digest('hex');
});

userSchema.methods.comparePassword = function(candidatePassword) {
  const hash = crypto.createHash('sha256');
  hash.update(candidatePassword);
  return this.password === hash.digest('hex');
};

module.exports = mongoose.model('User', userSchema);