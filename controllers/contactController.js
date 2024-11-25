// Setup up my Controller --> 
// where all my CRUD / HTTP methods will be 
//
// NEED KEY FEATURES:
// [1] Pagination
// [2] Sorting
// [3] Filtering
// --- most logic will occur w/i the @jworkman library! 

// ----> these are functions importing from the @jworkman library - they have built-in logic params - from API docs
const { ContactModel, filterContacts, sortContacts, Pager } = require('@jworkman-fs/asl');

// GET METHOD : w/ the KEY FEATURES: filter | Sort | Pager
const getAllContacts = (req, res) => {
  // Try-catch block
  try {
    // Fetching all Dataset from ContactModel ------
    let contacts = ContactModel.getContacts(); // Updated method name

    // IF statement to handle empty or null data
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: 'No contact data found.' });
    }

    // ------- FILTERING --> filterContacts( dataset, by, operator, value ) -> array
    // This function returns a filtered dataset of Contacts based on the provided filtering arguments.

    const filterBy = req.get('X-Filter-By');
    const filterOperator = req.get('X-Filter-Operator');
    const filterValue = req.get('X-Filter-Value');

    // LOGIC - Code 
    if (filterBy && filterOperator && filterValue) {
      // Using filterContacts function from @jworkman library to handle logic -----
      contacts = filterContacts(contacts, filterBy, filterOperator, filterValue);
    }

    // -------- SORTING ------> sortContacts( dataset, by, direction ) -> array
    // This simple function will return an array of sorted contacts.

    const sortBy = req.query.sort || 'fname'; 
    const sortDirection = req.query.direction || 'asc'; 

    // Validate sorting params
    if (!['fname', 'lname', 'email', 'birthday'].includes(sortBy)) {
      return res.status(400).json({ message: 'Invalid sortBy parameter' });
    }

    if (!['asc', 'desc'].includes(sortDirection)) {
      return res.status(400).json({ message: 'Invalid sortDirection parameter' });
    }

    // Apply sorting --> IF params are valid
    contacts = sortContacts(contacts, sortBy, sortDirection);

    // -------- PAGINATION ------> Pager( dataset, page, limit )

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.size) || 10;

    // Validation for page size
    if (limit > 20) {
      return res.status(400).json({ message: 'Invalid Input: Limit exceeds max value --> try again!' });
    }

    const pager = new Pager(contacts, page, limit);

    // Pagination Headers
    res.set('X-Page-Total', pager.total());
    res.set('X-Page-Next', pager.next());
    res.set('X-Page-Prev', pager.prev());

    // Returns paginated results
    res.json(pager.results());

  } catch (error) {
    console.error('Error in getAllContacts:', error);

    // switch-case blocks
    switch (error.name) {
      case 'PagerOutOfRangeError':
        return res.status(400).json({ message: 'Requested page is out of range. Please try again.' });
      default:
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
  }
};

// --- GET Method w/ ID -----
const getContactById = (req, res) => {
  // Try-catch block
  try {
    // Define/target ID 
    const contactId = parseInt(req.params.id);

    // Need to Validate 
    if (isNaN(contactId)) {
      return res.status(400).json({ message: 'Invalid input for ID field --> try a valid input again.' });
    }

    // Fetch contact by ID
    const contact = ContactModel.getById(contactId); // Updated method name

    // Handle missing contact
    if (!contact) {
      throw new Error('ContactNotFoundError');
    }

    // Return contact with status 200
    res.status(200).json(contact);

  } catch (error) {
    console.error('Error in getContactById:', error);

    // switch-case blocks
    switch (error.name) {
      case 'ContactNotFoundError':
        return res.status(404).json({ message: 'User Not Found... Please try again.' });
      default:
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
  }
};

// --- POST - Create New Contact -----
const createContact = (req, res) => {
  try {
    const { fname, lname, email, phone } = req.body;

    // Validation for input fields
    if (!fname || !lname || !email || !phone) {
      return res.status(400).json({ message: 'All fields (fname, lname, email, phone) are required.' });
    }

    // Validate input using library
    ContactModel.validate(req.body); // Updated method name

    // Create new contact
    const newContact = ContactModel.create(req.body); // Updated method name

    if (!newContact || !newContact.id) {
      return res.status(500).json({ message: 'Failed to create contact.' });
    }

    res.status(303)
      .set('Location', `/api/v1/contacts/${newContact.id}`)
      .json({ message: 'Contact created successfully', id: newContact.id, contact: newContact });
  } catch (error) {
    console.error('Error in createContact:', error);

    // Switch-case blocks
    switch (error.name) {
      case 'InvalidContactFieldError':
      case 'BlankContactFieldError':
      case 'InvalidContactSchemaError':
        return res.status(400).json({ message: error.message });
      case 'DuplicateContactResourceError':
        return res.status(409).json({ message: error.message });
      default:
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
  }
};

// --- UPDATE by ID -----
const updateContact = (req, res) => {
  try {
    const contactId = parseInt(req.params.id);
    if (isNaN(contactId)) {
      return res.status(400).json({ message: 'Invalid input for ID field --> try a valid input again.' });
    }

    ContactModel.update(contactId, req.body); // Updated method name
    res.status(204).send();

  } catch (error) {
    console.error('Error in updateContact:', error);

    // Switch-case blocks
    switch (error.name) {
      case 'ContactNotFoundError':
        return res.status(404).json({ message: 'Contact NOT Found.' });
      case 'InvalidContactError':
        return res.status(400).json({ message: 'Bad Request - check params and please try again.' });
      default:
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
  }
};

// --- DELETE METHOD by ID -----
const deleteContact = (req, res) => {
  try {
    // Target/get ID from the req.params
    const contactId = parseInt(req.params.id);

    // Validate if the ID is a valid integer
    if (isNaN(contactId)) {
      return res.status(400).json({ message: 'Error: Invalid ID --> Please provide a valid integer.' });
    }

    // Use ContactModel function from @jworkman library
    ContactModel.delete(contactId); // Updated method name

    // Status Code 303 --> endpoint to view successful delete
    res.status(303).set('Location', '/contacts').json({ message: 'Contact deleted successfully.' });

  } catch (error) {
    console.error('Error in deleteContact:', error);

    // Switch-case blocks
    switch (error.name) {
      case 'ContactNotFoundError':
        return res.status(404).json({ message: 'Error: Contact not found --> Please check ID.' });
      default:
        return res.status(500).json({ message: 'Internal Server Error: Unexpected error occurred while deleting the contact.' });
    }
  }
};

// Export statements for Jest
module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};

