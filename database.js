const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Successfully connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the process with failure if connection fails
  }
};

// Export the connection function
module.exports = connectToDb;
