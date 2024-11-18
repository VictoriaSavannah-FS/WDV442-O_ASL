// PLANET ROUTES============ NEED GET MTHOD & POST MTHOD ; all async query reuest in sequlizeORM

const express = require('express');
const router = express.Router();
const { Planet } = require('../models');

// GET MTHOD ---------
router.get('/', async (req, res) => {
  //try-catch blocks
  try{
    const planets = await Planet.findAll();
    res.json(planets);
  }
  catch(error){
    res.status(500).json({ error: error.message });
  }
});

// POST MTHD -----------
router.post('/', async (req, res) => {
  //try-catch bloc
  try{
  const newPlanet = await Planet.create(req.body);
  res.json(newPlanet);
  }
  catch(error){
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

