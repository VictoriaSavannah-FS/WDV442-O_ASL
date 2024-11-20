//SERVER.JS FILE ------

//environment variables --> .env doc
require('dotenv').config();

const express = require('express');
const { Sequelize } = require('sequelize');
const app = express();
const PORT = process.env.PORT || 3000;

// Importing models--> dbs relaiotnship?
const db = require('./models');

// Middleware --> parse JSON requests
app.use(express.json());

// Test--> db connection ----------
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Database connected successfully! Yay!');
  } catch (error) {
    console.error('Noo! WHY!! --> Unable to connect to the database:', error);
  }
})();

// Routes--> create later --> had to create the actial modesl npx s..cli first
const galaxyRoutes = require('./routes/galaxyRoutes');
const starRoutes = require('./routes/starRoutes');
const planetRoutes = require('./routes/planetRoutes');
//ADDED the Routes to starsPlanets-join table
const starsPlanetsRoutes = require('./routes/starsPlanetsRoutes');

// Routes
app.use('/api/galaxies', galaxyRoutes);
app.use('/api/stars', starRoutes);
app.use('/api/planets', planetRoutes);
//The StarsPlanets route
app.use('/api/starsplanets', starsPlanetsRoutes);


// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Space Object API!');
});

// Start --> server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

