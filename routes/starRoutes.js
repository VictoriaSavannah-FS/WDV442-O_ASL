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
    res.status(500).json({ error: 'Error fetching Stars.' });
  }
});

// POST METHD ---------- 
router.post('/', async (req, res) => {
  //try catch block
  try {
    //define fields --> model fields
    const {name, size, type} = req.body;
    const newStar = await Star.create({name,size,type});
    res.status(201).json(newStar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//GET --> by ID 
router.get('/:id',async(req, res)=>{
  try {
    const star=await Star.findByPk(req.params.id);
    if(star){
      res.json(star);
    }else{
      res.status(404).json({error:'Not Star with that ID Found'})
    }
  } catch (error) {
    res.status(500).json({error: 'Could not find star'})
  }
})

//UPDATE / POST --> BY ID 
router.put('/:id', async (req, res) => {
  try {
    //from Model fields
    const { name, size, type } = req.body;
    const star = await Star.findByPk(req.params.id);
    if (star) {
      await star.update({ name, size, type });
      res.json(star);
    } else {
      res.status(404).json({ error: 'Star not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating star' });
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
    res.status(500).json({ error: 'Error deleting star' });
  }
});



module.exports = router;
