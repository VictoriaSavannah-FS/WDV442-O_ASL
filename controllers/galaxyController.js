const { Galaxy } = require('../models'); // Import Galaxy model

// GET --> ALL GALAXIES (Index page)
const index = async (req, res) => {
  try {
    const galaxies = await Galaxy.findAll();
    res.render('views/galaxy/index.twig', { galaxies });
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
};

// GET --> GALAXY BY ID (SHOW Page)
const show = async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);
    if (galaxy) {
      res.render('views/galaxy/show.twig', { galaxy });
    } else {
      res.status(404).redirect('/galaxies');
    }
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
};

// GET --> FORM (Create/Edit)
const form = async (req, res) => {
  try {
    if (req.params.id) {
      const galaxy = await Galaxy.findByPk(req.params.id);
      if (!galaxy) {
        return res.status(404).redirect('/galaxies');
      }
      res.render('views/galaxy/form.twig', { galaxy });
    } else {
      res.render('views/galaxy/form.twig', { galaxy: null });
    }
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
};

// POST --> CREATE GALAXY
const create = async (req, res) => {
  try {
    const newGalaxy = await Galaxy.create(req.body);
    res.redirect(`/galaxies/${newGalaxy.id}`);
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
};

// PUT --> UPDATE GALAXY
const update = async (req, res) => {
  try {
    const { name, size, description } = req.body;
    const galaxy = await Galaxy.findByPk(req.params.id);

    if (galaxy) {
      await galaxy.update({ name, size, description });
      res.redirect(`/galaxies/${galaxy.id}`);
    } else {
      res.status(404).redirect('/galaxies');
    }
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
};

// DELETE --> REMOVE GALAXY
const remove = async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);
    if (galaxy) {
      await galaxy.destroy();
      res.redirect('/galaxies');
    } else {
      res.status(404).redirect('/galaxies');
    }
  } catch (error) {
    res.status(500).redirect('/galaxies');
  }
};

// Export all controller functions
module.exports = {
  index,
  show,
  form,
  create,
  update,
  remove,
};
