'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`ALTER TABLE menus ADD FULLTEXT dish_name_index (dishName)`)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`ALTER TABLE menus DROP INDEX dish_name_index`)
  }
};
