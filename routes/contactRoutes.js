const express = require('express');
const router = express.Router();

// Importing the controller functions --> @jworkman
const {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
} = require('../controllers/contactController');

// GET all contacts >> key feaurest: filtering-sorting-pagination
router.get('/contacts', getAllContacts);

// GET contact by ID -----------
router.get('/contacts/:id', getContactById);

// POST new contact
router.post('/contacts', createContact);

// UPDATE/PUT a contact by ID
router.put('/contacts/:id', updateContact);

// DELETE contact by ID
router.delete('/contacts/:id', deleteContact);

module.exports = router;
