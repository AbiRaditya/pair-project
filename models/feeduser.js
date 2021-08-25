'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FeedUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // FeedUser.belongsTo(models.Feed , {foreignKey: `FeedID`})
      // FeedUser.belongsTo(models.User , {foreignKey: `UserID`})
    }
  };
  FeedUser.init({
    feedID: DataTypes.INTEGER,
    userID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FeedUser',
  });
  return FeedUser;
};