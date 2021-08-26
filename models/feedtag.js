'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FeedTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  FeedTag.init({
    feedID: DataTypes.INTEGER,
    tagID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FeedTag',
  });
  return FeedTag;
};