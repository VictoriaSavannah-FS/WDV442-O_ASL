// server.js
require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080; // port to listn on 


//NEED to have the following:
//- Custom HTTP header support
//- Support for dynamic URL/path segments
//- Proper RESTful implementation
//- Different body payloads & data types
//- Controller filtering, and sorting logic
//- Usage of correct HTTP response codes

//neede --> import Routes

const contactRoutes = require('./routes/contactRoutes.js');

// Middleware--> parse JSON requests
app.use(express.json());

// Routes ->  Contacts API
app.use('/api/v1', contactRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello, World! Testing my connection from Docker Container! Hopefully this works...');
});

// Start Server - but needed to include a conditional--> 
if (require.main === module){
  app.listen(PORT, ()=>{
    console.log(`Server running on PORT: ${PORT} --- Yay!`);
  })
}
//NEED tp export app to TEST w/ JEST
 module.exports = app;
