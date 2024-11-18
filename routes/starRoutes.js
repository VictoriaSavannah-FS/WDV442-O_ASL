// STAR ROUTES ============ GET and POST Methods

const express = require('express');
const router = express.Router();
const { Star } = require('../models');

// GET MTHOD -------- 
router.get('/', async (req, res) => {
  //try-catcj block
  try {
    const stars = await Star.findAll();
    res.json(stars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST METHD ---------- 
router.post('/', async (req, res) => {
  //try catch block
  try {
    const newStar = await Star.create(req.body);
    res.json(newStar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
