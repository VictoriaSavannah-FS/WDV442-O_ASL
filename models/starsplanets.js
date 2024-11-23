'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class StarsPlanets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // No direct associations are needed here because it's a join table.
      // Associations are declared in `Planet` and `Star` models.
    }
  }

  StarsPlanets.init(
    {
      starId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Stars', // TableNAme -->Star model
          key: 'id',      // Prim K-->Star table
        },
        allowNull: false, //Star ID --> required
      },
      planetId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Planets', // TName-->Planet model
          key: 'id',        // PK -->Planet table
        },
        allowNull: false,//Planet ID --> required
      },
    },
    {
      sequelize,
      modelName: 'StarsPlanets', // JoinTable Name
    }
  );

  return StarsPlanets;
};
