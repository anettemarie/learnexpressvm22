'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: {
      type: Sequelize.STRING,
      allowNull:false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull:false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull:false,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};