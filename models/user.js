'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } =require('../helpers/bycript')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.belongsToMany(models.Feed , { through:`FeedUser`, foreignKey:`userID`}) 
      User.hasMany(models.Feed , {foreignKey: `user_id`})
    }
  };
  User.init({
    profile_picture: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(instance) {
        instance.password = hashPassword(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};