module.exports = (sequelize, DataTypes) => {
  const BusinessHours = sequelize.define(
    "BusinessHours",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      dayOfWeek: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      openTime: {
        type: DataTypes.TIME,
        defaultValue: "00:00:00",
        allowNull: false,
      },
      closeTime: {
        type: DataTypes.TIME,
        defaultValue: "00:00:00",
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  BusinessHours.associate = function (models) {
    // associations can be defined here
    BusinessHours.belongsTo(models.Restaurants, {
      foreignKey: "fk_restaurant_id",
      as: "Restaurants",
    });
  };
  return BusinessHours;
};
