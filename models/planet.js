'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Planet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association
      models.Planet.belongsToMany(models.Star, {
        through: models.StarsPlanets, // JT-Assocaition
        foreignKey: 'planetId',       // FK:StarsPlanets-->Planet
        otherKey: 'starId',           // FK:StarsPlanets-->Star
      });
    }
  }

  Planet.init(
    {
      name: DataTypes.STRING,
      size: DataTypes.INTEGER,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Planet',
    }
  );

  return Planet;
};
