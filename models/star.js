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
      // Define association
      models.Star.belongsToMany(models.Planet, {
        through: models.StarsPlanets, // JoinTable:Assocaiton
        foreignKey: 'starId',         // FK:StarsPlanets->Star
        otherKey: 'planetId',         // FK:StarsPlanets-->Planet
      });
      
      // I forgot to include the relationship/ assocaition --> Galaxy
      models.Star.belongsTo(models.Galaxy, {
        foreignKey: 'GalaxyId', //creates relationship-->Star/Galaxy
      });
    }
  }

  Star.init(
    {
      name: DataTypes.STRING,
      size: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      GalaxyId:{
        type: DataTypes.INTEGER,
        references:{
          model: "Galaxies",//tableName-->Galaxy
          key: 'id',        //PK-->Galaxies table
        },
      },
    },
    {
      sequelize,
      modelName: 'Star',
    }
  );

  return Star;
};
