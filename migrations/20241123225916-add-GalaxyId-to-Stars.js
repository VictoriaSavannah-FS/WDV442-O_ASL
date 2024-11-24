'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Stars', 'GalaxyId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Galaxies', // Parent table name
        key: 'id',         // Primary key in Galaxies
      },
      onUpdate: 'CASCADE',  // Automatically update foreign key if Galaxy id changes
      onDelete: 'SET NULL', // Set GalaxyId to NULL if the referenced Galaxy is deleted
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Stars', 'GalaxyId');
  },
};
