'use strict';
const {
  Model
} = require('sequelize');
const Filter = require('bad-words'),
    filter = new Filter();
module.exports = (sequelize, DataTypes) => {
  class Feed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    

    static associate(models) {
      // define association here
      Feed.belongsTo(models.User , {foreignKey: `user_id`})
      Feed.belongsToMany(models.Tag , { through: `FeedTags` , foreignKey: `feedID` })
    }
  };
  Feed.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate: (instance, options) => {
        instance.content = filter.clean(instance.content)
        instance.title = filter.clean(instance.title)
       }
    },
    sequelize,
    modelName: 'Feed',
  });
  return Feed;
};