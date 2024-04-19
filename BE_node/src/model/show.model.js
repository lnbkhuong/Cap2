const showModel = (sequelize, DataTypes) => {
    return sequelize.define(
      "Show",
      {
        showId: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        CreateOn: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        startTime: {
          type: DataTypes.TIME,
          allowNull: false,
        },
        endTime: {
          type: DataTypes.TIME,
          allowNull: false,
        },
      },
      {
        timestamps: true,
      }
    );
  };
  module.exports = {
    showModel,
  };