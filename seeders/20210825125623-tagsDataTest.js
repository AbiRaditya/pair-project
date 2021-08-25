'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
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
    let data = JSON.parse(fs.readFileSync(`./seeders/tags.json` , `utf8`))
    data.forEach(e => {
      e.createdAt = new Date()
      e.updatedAt = new Date()
    });
    return queryInterface.bulkInsert(`Tags` , data)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete(`Tags` , null ,{})
  }
};
