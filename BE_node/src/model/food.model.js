const foodModel = (sequelize, DataTypes) => {
    return sequelize.define(
      "Food",
      {
        foodId: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        foodName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        foodPrice: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        foodImage: {
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
      foodModel
  }