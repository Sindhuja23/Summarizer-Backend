// models/UserInput.js
const mongoose = require('mongoose');

// Define the UserInput Schema
const userInputSchema = new mongoose.Schema({
  inputText: {
    type: String,
    required: true
  },
  emotion: {
    type: String,
    required: true
  },
  formality: {
    type: String,
    required: true
  },
  tokenLimit: {
    type: Number,
    required: true,
    default: 100
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  // Optional: You can add a reference to the User model
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

// Create the model
const UserInput = mongoose.model('UserInput', userInputSchema);

module.exports = UserInput;
