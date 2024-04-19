const cinemaHallModel = (sequelize, DataTypes) => {
    return sequelize.define(
      "CinemaHall",
      {
        cinemaHallId: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        cinemaHallName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        totalSeat: {
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
    cinemaHallModel,
  };