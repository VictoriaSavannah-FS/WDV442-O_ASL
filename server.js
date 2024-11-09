// server.js
const express = require('express');
const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
  res.send('Hello, World! Testing my connection from Docker Container! hopefully this works...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
