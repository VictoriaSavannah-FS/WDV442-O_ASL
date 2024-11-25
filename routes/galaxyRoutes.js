// Import--> Express framework
const express = require('express');

// Galaxy controller
const galaxyController = require('../controllers/galaxyController');

// Create a new Router instance and call it "router"
const router = new express.Router();

// API Endpoints
router.get('/', galaxyController.index); // Show all galaxies
router.get('/:id(\d+)', galaxyController.show); // Show --> galaxy by ID
router.post('/', galaxyController.create); // Create --> new galaxy
router.put('/:id(\d+)', galaxyController.update); // Update --> galaxy by ID
router.delete('/:id(\d+)', galaxyController.remove); // Remove --> galaxy by ID

// HTML-Specific Routes
router.get('/new', galaxyController.form); // Render form --> creat --> new galaxy
router.get('/:id(\d+)/edit', galaxyController.form); // Render form --> EDIT a galaxy
router.get('/:id(\d+)/delete', galaxyController.remove); // CONFIMR --> for deleting a galaxy
router.post('/:id(\d+)', galaxyController.update); // Submit UPDATE --> galaxy data

// Export "router"
module.exports = router;
