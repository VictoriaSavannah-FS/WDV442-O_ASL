'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
      await queryInterface.createColumn('Stars', 'GalaxyId',{
        type:Sequelize.INTEGER,
        references: {
          model: 'Galaxies', //Parent table name
          key: 'id' //PK--> Galxies table
        });

     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     await queryInterface.removeColumn('Stars','GalaxyId');
     */
  }
};
