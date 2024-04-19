const cityModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "City",
    {
      cityId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      cityName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
module.exports = {
  cityModel,
};
