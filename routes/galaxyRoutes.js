// GLAXY ROUTES============ NEED GET MTHOD & POST MTHOD ; all async query reuest in sequlizeORM

const express = require('express');
const router = express.Router();
const { Galaxy } = require('../models');

// GET MTHOD ---------
router.get('/', async (req, res) => {
  //try-catch 
  try{
    const galaxies = await Galaxy.findAll();
    res.json(galaxies);
  }catch(error){
    res.status(500).json({ error: error.message });
  }
});

// POST MTHD -----------
router.post('/', async (req, res) => {
  try{
  const newGalaxy = await Galaxy.create(req.body);
  res.json(newGalaxy);
  }catch(error){
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
