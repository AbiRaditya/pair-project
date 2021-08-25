'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn(
        'FeedTags',
        'tagID',
        {
          type: Sequelize.INTEGER,
          references: {
            model:`Tags` ,
            key: `id`
          },
          onUpdate: `cascade`,
          onDelete: `cascade`
        }
      );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn(
      `FeedTags`,
      `tagID`,
      {}
    )
  }
};
