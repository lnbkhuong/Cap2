const cinemaModel = (sequelize, DataTypes) => {
    return sequelize.define(
      "Cinema",
      {
        cinemaId: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        cinemaName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        totalCinemaHall: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        location: {
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
    cinemaModel,
  };