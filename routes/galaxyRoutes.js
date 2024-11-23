// GLAXY ROUTES============ NEED GET MTHOD & POST MTHOD ; all async query reuest in sequlizeORM

const express = require('express');
const router = express.Router();
const { Galaxy } = require('../models');

//Satus Codes:
//201: Created {succesful request and new resouces created}
//300's: redirects
//400: Bad request
//404: Not Found
//405: Method Not Alowed
//500's: servrev errors
//500 : Internal Servre Error
//503: service unavailable

// GET MTHOD ---------
router.get('/', async (req, res) => {
  //try-catch 
  try{
    const galaxies = await Galaxy.findAll();
    res.json(galaxies);
  }catch(error){
    res.status(500).json({ error:`Error: ${error.message}`  });
  }
});

// GET GALAXY BY ID
router.get('/:id', async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);
    if (galaxy) {
      res.json(galaxy);
    } else {
      res.status(404).json({ error: 'Galaxy not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
});


// POST MTHD --> NEw Galaxy
router.post('/', async (req, res) => {
  try{
  const newGalaxy = await Galaxy.create(req.body);
  res.status(201).json(newGalaxy);
  }catch(error){
    res.status(500).json({ error: `Error: ${error.message}` });
  }
});

// PUt / UPDATE GALAXY BY ID
router.put('/:id', async (req, res) => {
  try {
    const { name, size, description } = req.body;
    const galaxy = await Galaxy.findByPk(req.params.id);

    if (galaxy) {
      await galaxy.update({ name, size, description });
      res.json(galaxy);
    } else {
      res.status(404).json({ error: 'Galaxy not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
});


//DELETE MTHD --> by ID 
router.delete('/:id', async (req, res)=>{
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);
    if(galaxy){
      await galaxy.destroy();
      res.json({message: 'Galaxy was deleted succesfully!'})
    }else{
      res.status(404).json({error: 'Galaxy with that ID does NOT exist'})
    }
  } catch (error) {
    res.status(500).json({error: `Error: ${error.message}`})
    
  }
})


module.exports = router;
