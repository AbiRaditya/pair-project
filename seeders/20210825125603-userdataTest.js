'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const fs = require(`fs`)
    let data = JSON.parse(fs.readFileSync(`./seeders/users.json` , `utf8`))
    data.forEach(e => {
      e.createdAt = new Date()
      e.updatedAt = new Date()
    });
    return queryInterface.bulkInsert(`Users` , data)
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
      return queryInterface.bulkDelete(`Users` , null ,{})
  }
};
