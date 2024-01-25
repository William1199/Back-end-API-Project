'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Oppotunities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Oppotunities.init({
    oppotunityName: DataTypes.STRING,
    oppId: DataTypes.INTEGER,
    partner: DataTypes.STRING,
    product_Service: DataTypes.STRING,
    stago: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Oppotunities',
  });
  return Oppotunities;
};