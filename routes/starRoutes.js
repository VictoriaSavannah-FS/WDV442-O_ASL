// STAR ROUTES ============ GET and POST Methods

const express = require('express');
const router = express.Router();
const { Star } = require('../models');

// GET MTHOD -------- 
router.get('/', async (req, res) => {
  //try-catch block
  try {
    const stars = await Star.findAll();
    res.json(stars);
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
});

// POST METHD --> (updated type --> description)
router.post('/', async (req, res) => {
  //try catch block
  try {
    //define fields --> model fields
    const {name, size, description, GalaxyId } = req.body;
    const newStar = await Star.create({name,size,description, GalaxyId});
    res.status(201).json(newStar);
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
});

//GET --> by ID 
router.get('/:id', async (req, res)=>{
  try {
    const star=await Star.findByPk(req.params.id);
    if(star){
      res.json(star);
    }else{
      res.status(404).json({error:'No Star with that ID Found'})
    }
  } catch (error) {
    res.status(500).json({error: `Error: ${error.message}`})
  }
})

//UPDATE / PUT --> BY ID (updated: type-->description)
router.put('/:id', async (req, res) => {
  try {
    //from Model fields
    const { name, size, description, GalaxyId } = req.body;
    const star = await Star.findByPk(req.params.id);
    if (star) {
      await star.update({ name, size, description, GalaxyId });
      res.json(star);
    } else {
      res.status(404).json({ error: 'Star not found' });
    }
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
});

//DELETE --> by ID 

router.delete('/:id', async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);
    if (star) {
      await star.destroy();
      res.json({ message: 'Congrats! Star deleted successfully' });
    } else {
      res.status(404).json({ error: 'Sorry --> Star not found' });
    }
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
});



module.exports = router;
