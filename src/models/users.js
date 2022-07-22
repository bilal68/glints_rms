module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
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
  Users.associate = function (models) {
    // associations can be defined here
    Users.hasMany(models.PurchaseHistory, {
      foreignKey: "fk_user_id",
      as: "PurchaseHistory",
    });
  };
  return Users;
};
