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
    res.status(500).json({ error: error.message });
  }
});

//GET BY ID --> METHOD
router.get('/:id', async (req, res) => {
  try {
    const galaxies = await Galaxy.findByPk(req.params.id);
    if(galaxy){
    res.json(galaxy);
    }else{
      res.status(404).json({error:'Sorry, Galaxy requested was not found - try again'});
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching galaxies' });
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

//UPDATE/PUT METHD--> by id 

router.put('/:id', asyn (req, res)=>{
  try {
   //ned to define the params / fields fir UPDATE -->Model fields
    const = {name, size, description} = req.body;
    const galaxy = await Galaxy.findByPk(req.params.id);
    //logic --> status Codes
    if(galaxy){
      await galaxy.update({name,sixe, description});
      res.json(galaxy);
    }else{res.status(404).json({error:'Galaxy with that ID was NOT Found.'})}
  } catch (error) {
    res.status(500).json(error: 'Error Updating Galaxy - check the fields.');
    })
  }})

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
    res.status(500).json({error: 'Error--> Could NOT delete the requested Galaxy'})
    
  }
})


module.exports = router;
