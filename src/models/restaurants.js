module.exports = (sequelize, DataTypes) => {
  const Restaurants = sequelize.define(
    "Restaurants",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      restaurantName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cashBalance: {
        type: DataTypes.FLOAT,
      },
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  Restaurants.associate = function (models) {
    // associations can be defined here
    Restaurants.hasMany(models.Menus, {
      foreignKey: "fk_restaurant_id",
      as: "Menus",
    });

    Restaurants.hasMany(models.BusinessHours, {
      foreignKey: "fk_restaurant_id",
      as: "BusinessHours",
    });

    // Restaurants.hasMany(models.PurchaseHistory, {
    //   foreignKey: "fk_restaurant_id",
    //   as: "PurchaseHistory",
    // });
  };
  return Restaurants;
};
