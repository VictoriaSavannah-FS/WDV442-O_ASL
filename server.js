// server.js
const express = require('express');
const dotenv = require('dotenv');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8080; // port to listn on 


//NEED to have the following:
//- Custom HTTP header support
//- Support for dynamic URL/path segments
//- Proper RESTful implementation
//- Different body payloads & data types
//- Controller filtering, and sorting logic
//- Usage of correct HTTP response codes

// environment variables --->> from .env file
dotenv.config();

// Middleware--> parse JSON = HTTP requests
app.use(express.json());

// Routes ->  Contacts API
app.use('/api/v1', contactRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello, World! Testing my connection from Docker Container! Hopefully this works...');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
