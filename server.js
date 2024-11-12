// server.js
const express = require('express');
const app = express();
const PORT = 8080; // port to listn on 


//NEED to have the following:
- Custom HTTP header support
- Support for dynamic URL/path segments
- Proper RESTful implementation
- Different body payloads & data types
- Controller filtering, and sorting logic
- Usage of correct HTTP response codes


//Routes used 
app.get('/', (req, res) => {
  res.send('Hello, World! Testing my connection from Docker Container! hopefully this works...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
