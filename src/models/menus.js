module.exports = (sequelize, DataTypes) => {
  const Menus = sequelize.define(
    "Menus",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      dishName: {
        type: DataTypes.STRING(1234),
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  Menus.associate = function (models) {
    // associations can be defined here
    Menus.belongsTo(models.Restaurants, {
      foreignKey: "fk_restaurant_id",
      as: "Restaurants",
    });

    Menus.belongsToMany(models.PurchaseHistory, {
      through: "MenuPurchaseHistory",
    });
  };
  return Menus;
};
