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
        'FeedUsers',
        'userID',
        {
          type: Sequelize.INTEGER,
          references: {
            model:`Users` ,
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
      `FeedUsers`,
      `userID`,
      {}
    )
  }
};
