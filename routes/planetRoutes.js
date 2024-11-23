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
    res.status(500).json({ error: `Error: ${error.message}` });
  }
});

//GET --> by ID 
router.get('/:id', async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);
    if (planet) {
      res.json(planet);
    } else {
      res.status(404).json({ error: 'Planet not found' });
    }
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
});

// POST MTHD -----------
router.post('/', async (req, res) => {
  //try-catch bloc
  try{
    //params --> Model fields
  const {name, size, description}=req.body;
  const newPlanet = await Planet.create({name,size, description});
  res.status(201).json(newPlanet);
  }
  catch(error){
    res.status(500).json({ error: `Error: ${error.message}` });
  }
});

//PUT/ UPDATE --> ID 
router.put('/:id', async (req, res) => {
  try {
    const { name, size, description } = req.body;
    const planet = await Planet.findByPk(req.params.id);
    if (planet) {
      await planet.update({ name, size, description });
      res.json(planet);
    } else {
      res.status(404).json({ error: 'Planet not found' });
    }
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
});

//DELETE MTHD --> by ID 
router.delete('/:id', async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);
    if (planet) {
      await planet.destroy();
      res.json({ message: 'Planet deleted successfully' });
    } else {
      res.status(404).json({ error: 'Planet not found' });
    }
  } catch (error) {
    res.status(500).json({ error: `Error ${error.message}` });
  }
});

module.exports = router;

