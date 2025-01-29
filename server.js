// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { connectToDb } = require('./database.js'); // Import the DB connection
const User = require('./models/User.js'); // Import User model
const UserInput = require('./models/UserInput.js'); // Import UserInput model
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Register Route (User Authentication)
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send({ error: 'All fields (username, email, password) are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: 'User already exists' });
    }

    const newUser = new User({
      username,
      email,
      password
    });

    await newUser.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send({ error: 'Failed to register user' });
  }
});

// Login Route (Authenticate User)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: 'User not found' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid credentials' });
    }

    res.status(200).send({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send({ error: 'Failed to authenticate user' });
  }
});



app.post('/summarizeWithOllama', async (req, res) => {
  const { inputText, emotion, formality, tokenLimit, userId } = req.body;

  if (!inputText) {
    return res.status(400).send({ error: 'Input text is required' });
  }

  try {
    
    // Send request to Ollama API
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:11434/api/generate',
      data: {
        prompt: inputText,
        context: [],
        model: 'tinyllama',
        emotion: emotion || 'neutral',
        formality: formality || 'informal',
        tokenLimit: tokenLimit || 100
      },
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'stream'
    });
    
    response.data.pipe(res);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).send({ error: 'Failed to process request to Ollama API' });
  }
});
