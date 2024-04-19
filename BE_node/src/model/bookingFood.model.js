const bookingFoodModel = (sequelize, DataTypes) => {
    return sequelize.define(
      "BookingFood",
      {
        bookingFoodId: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        priceFood: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        timestamps: true,
      }
    );
  };
  module.exports = {
      bookingFoodModel
  }