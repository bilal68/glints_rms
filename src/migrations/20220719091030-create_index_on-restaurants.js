'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`ALTER TABLE restaurants ADD FULLTEXT restaurants_name_index (restaurantName)`)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`ALTER TABLE restaurants DROP INDEX restaurants_name_index`)
  }
};
