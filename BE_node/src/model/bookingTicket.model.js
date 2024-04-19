const bookingTicketModel = (sequelize, DataTypes) => {
    return sequelize.define(
      "BookingTicket",
      {
        bookingTicketId: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        ticketPrice: {
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
      bookingTicketModel
  }