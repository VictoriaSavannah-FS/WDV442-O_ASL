'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Star extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Many-to-Many relationship with Planets
      models.Star.belongsToMany(models.Planet, {
        through: models.StarsPlanets, // JoinTable:Association
        foreignKey: 'starId',         // FK:StarsPlanets->Star
        otherKey: 'planetId',         // FK:StarsPlanets-->Planet
      });

      // BelongsTo relationship with Galaxy
      models.Star.belongsTo(models.Galaxy, {
        foreignKey: 'GalaxyId', // Creates relationship → Star/Galaxy
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
    }
  }
//onUpdate--> automatically updates GalaxyId->Start to match new ID
//onDelete--> when Galaxy rec del. --> rule edits GalaxyId accordingly

  Star.init(
    {
      name: DataTypes.STRING,
      size: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      GalaxyId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Galaxies", // Table name → Galaxies
          key: "id",         // Primary key in Galaxies
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    },
    {
      sequelize,
      modelName: "Star",
    }
  );

  return Star;
};
