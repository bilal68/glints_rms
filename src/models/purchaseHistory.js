"use strict";
module.exports = (sequelize, DataTypes) => {
  const PurchaseHistory = sequelize.define(
    "PurchaseHistory",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      transactionDate: { type: DataTypes.DATE },
      transactionAmount: { type: DataTypes.FLOAT },
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  PurchaseHistory.associate = function (models) {
    // associations can be defined here
    PurchaseHistory.belongsTo(models.Users, {
      foreignKey: "fk_user_id",
      as: "Users",
    });

    PurchaseHistory.belongsToMany(models.Menus, {
      through: "MenuPurchaseHistory",
    });

    // PurchaseHistory.belongsTo(models.Restaurants, {
    //   foreignKey: "fk_restaurant_id",
    //   as: "Restaurants",
    // });
  };
  return PurchaseHistory;
};
