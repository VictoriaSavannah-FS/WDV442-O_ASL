const express = require('express');
const router = express.Router();
//import the differnt modesl 
const { StarsPlanets, Star, Planet } = require ('../models');

// Route for /api/starsplanets

//GET --> get ALL
router.get('/', async (req, res) =>{
  try {
    const relationships = await StarsPlanets.findAll();
    res.json(relationships);
  } catch (error) {
    res.status(500).json({error: 'Error fetching relationships'});
  }
}

//GET relationship --> ID 
router.get('/:id', async (req, res)=>{
  try {
    const relationship = await StarsPlanets.findByPk(req.params.id);
    if(relationship){
      res.json(relationship);
    }else{res.status(404).json({error: 'Relationship not found'});
    }
  } catch (error) {
    res.status(500).json({error:'Error--> could NOT fetch realtionship'});
  }
});

//POST --> NEW Relationship

router.post('/', async (req, res) => {
  try {

    //required Fields / reference e/a other
    const { starId, planetId } = req.body; 
    const newRelationship = await StarsPlanets.create({ starId, planetId });
    res.status(201).json(newRelationship);
  } catch (error) {
    res.status(500).json({ error: 'Error --> Can NOT create relationship.' });
  }
});

//UPDATE - PUT --> by ID 
router.put('/:id', async (req, res) => {
  try {
    //params to update 
    const { starId, planetId } = req.body;
    const relationship = await StarsPlanets.findByPk(req.params.id);
    if (relationship) {
      await relationship.update({ starId, planetId });
      res.json(relationship);
    } else {
      res.status(404).json({ error: 'Sorry --> Relationship not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error --> Can NOT update relationship.' });
  }
});

//DELETE METHOD --> by ID 

router.delete('/:id', async (req, res) => {
  try {
    const relationship = await StarsPlanets.findByPk(req.params.id);
    if (relationship) {
      await relationship.destroy();
      res.json({ message: 'Relationship --> DELETED successfully.' });
    } else {
      res.status(404).json({ error: 'Something went wrong --> Relationship not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting relationship.' });
  }
});




module.exports = router;
