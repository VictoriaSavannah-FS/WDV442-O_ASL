'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Star extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Star.belongsToMany(models.Planets, {
        through:models.StarsPlanets,
      foreignKey: 'StarId',
      otherKey:'planetId'})
      //had to create a new Model = join table for Star and Planet
      //FK:in join table
      //OK: for other table
    }
  }
  Star.init({
    name: DataTypes.STRING,
    size: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Star',
  });
  return Star;
};
