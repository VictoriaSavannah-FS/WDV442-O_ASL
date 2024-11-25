const { Galaxy } = require('../models'); // Import Galaxy model

// GET --> ALL GALAXIES (Index page)
const index = async (req, res) => {
  try {
    const galaxies = await Galaxy.findAll(); // Fetch all galaxies
    res.render('views/galaxy/index.twig', { galaxies }); // point to index.twig galaxies data
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` }); // Handle--> servev error
  }
};

// GET --> GALAXY BY ID (SHOW Page)
const show = async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id); // Find galaxy-->PK /ID
    if (galaxy) {
      res.render('views/galaxy/show.twig', { galaxy }); // point--> show page
    } else {
      res.status(404).render('views/error.twig', { message: 'Galaxy not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` }); // --> serve error
  }
};

// GET --> (FORM--> creating /editing galaxy)

const form = async (req, res) => {
  try {
    if (req.params.id) {
      // Editing--> galaxy
      const galaxy = await Galaxy.findByPk(req.params.id);
      if (!galaxy) {
        return res.status(404).render('views/error.twig', { message: 'Galaxy not found' });
      }
      res.render('views/galaxy/form.twig', { galaxy }); // Edit--> FORM
    } else {
      // Create --> NEW Galaxy
      res.render('views/galaxy/form.twig', { galaxy: null }); // creates Empty form --> new galaxy (cofusde me)
    }
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` }); 
  }
};

// POST --> CREATE Galaxy
const create = async (req, res) => {
  try {
    const newGalaxy = await Galaxy.create(req.body); // Create--> NEW galaxy 
    res.redirect(`/galaxies/${newGalaxy.id}`); // Redirect --> Show page--> New galaxy / REDIRECT
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` }); // Handle --> error
  }
};

// PUT [Update] --> GALAXY BY ID
const update = async (req, res) => {
  try {
    const { name, size, description } = req.body; // Extract fields from request body
    const galaxy = await Galaxy.findByPk(req.params.id); // Find galaxy by primary key (ID)

    if (galaxy) {
      await galaxy.update({ name, size, description }); // Update galaxy with new data
      res.redirect(`/galaxies/${galaxy.id}`); // Redirect to the show page for the updated galaxy
    } else {
      res.status(404).redirect('/galaxies'); // Redirect to galaxies index if not found
    }
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` }); // Handle server error
  }
};


// DELETE --> Remove Galaxy by ID
const remove = async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id); // Find galaxy by primary key (ID)
    if (galaxy) {
      await galaxy.destroy(); // Delete the galaxy
      res.redirect('/galaxies'); // Redirect to the index page
    } else {
      res.status(404).redirect('/galaxies'); // Redirect --> index --> galaxy not found
    }
  } catch (error) {
    res.status(500).redirect('/galaxies'); // Redirect to index if server error occurs
  }
};


// Export all controller functions
module.exports = {
  index,
  show,
  create,
  update,
  remove,
  form,
};
