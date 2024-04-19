const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const mysql = require("mysql2");
const { userModel } = require("../model/user.model");
const { movieModel } = require("../model/movie.model");
const { showModel } = require("../model/show.model");
const { bookingModel } = require("../model/booking.model");
const { bookingFoodModel } = require("../model/bookingFood.model");
const { bookingTicketModel } = require("../model/bookingTicket.model");
const { cityModel } = require("../model/city.model");
const { cinemaModel } = require("../model/cinema.model");
const { cinemaHallModel } = require("../model/cinemaHall.model");
const { cinemaHallSeatModel } = require("../model/cinemaHallSeat.model");
const { seatModel } = require("../model/seat.model");
const { foodModel } = require("../model/food.model");
const { paymentModel } = require("../model/payment.model");
const { commentModel } = require("../model/comment.model");
const { promotionModel } = require("../model/promotion.model");
const { movieTypeModel } = require("../model/movieType.model");

const host = "localhost";
const port = 3306;
const user = "root";
const password = "123123";
const databaseName = "MovieTicket";

const pool = mysql.createPool({ host, port, user, password });
pool.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`);

const sequelize = new Sequelize(databaseName, user, password, {
  host,
  dialect: "mysql",
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    raw: true,
  },
});

const User = userModel(sequelize, DataTypes);
const Movie = movieModel(sequelize, DataTypes);
const Show = showModel(sequelize, DataTypes);
const Booking = bookingModel(sequelize, DataTypes);
const BookingFood = bookingFoodModel(sequelize, DataTypes);
const BookingTicket = bookingTicketModel(sequelize, DataTypes);
const City = cityModel(sequelize, DataTypes);
const Cinema = cinemaModel(sequelize, DataTypes);
const CinemaHall = cinemaHallModel(sequelize, DataTypes);
const CinemaHallSeat = cinemaHallSeatModel(sequelize, DataTypes);
const Seat = seatModel(sequelize, DataTypes);
const Food = foodModel(sequelize, DataTypes);
const Payment = paymentModel(sequelize, DataTypes);
const Comment = commentModel(sequelize, DataTypes);
const Promotion = promotionModel(sequelize, DataTypes);
const MovieType = movieTypeModel(sequelize, DataTypes);

User.hasMany(Booking, { foreignKey: "userId" });
Booking.belongsTo(User, { foreignKey: "userId" });

Booking.hasMany(BookingTicket, { foreignKey: "bookingId" });
BookingTicket.belongsTo(Booking, { foreignKey: "bookingId" });

Booking.hasMany(BookingFood, { foreignKey: "bookingId" });
BookingFood.belongsTo(Booking, { foreignKey: "bookingId" });

BookingFood.belongsTo(Food, { foreignKey: "foodId" });
Food.hasMany(BookingFood, { foreignKey: "foodId" });

City.hasMany(Cinema, { foreignKey: "cityId" });
Cinema.belongsTo(City, { foreignKey: "cityId" });

Cinema.hasMany(CinemaHall, { foreignKey: "cinemaId" });
CinemaHall.belongsTo(Cinema, { foreignKey: "cinemaId" });

CinemaHall.belongsToMany(Seat, {
  through: "SeatCinema",
  foreignKey: "cinemaHallId",
  timestamps: false,
});
Seat.belongsToMany(CinemaHall, {
  through: "SeatCinema",
  foreignKey: "seatId",
  timestamps: false,
});

CinemaHall.hasMany(Show, { foreignKey: "cinemaHallId" });
Show.belongsTo(CinemaHall, { foreignKey: "cinemaHallId" });

Movie.hasMany(Show, { foreignKey: "movieId" });
Show.belongsTo(Movie, { foreignKey: "movieId" });

Show.hasMany(BookingTicket, { foreignKey: "showId" });
BookingTicket.belongsTo(Show, { foreignKey: "showId" });

Show.hasMany(CinemaHallSeat, { foreignKey: "showId" });
CinemaHallSeat.belongsTo(Show, { foreignKey: "showId" });

Seat.hasOne(CinemaHallSeat, { foreignKey: "seatId" });
CinemaHallSeat.belongsTo(Seat, { foreignKey: "seatId" });

CinemaHallSeat.hasOne(BookingTicket, { foreignKey: "cinemaHallSeatId" });
BookingTicket.belongsTo(CinemaHallSeat, { foreignKey: "cinemaHallSeatId" });

Payment.belongsTo(Booking, { foreignKey: "bookingId" });
Booking.hasOne(Payment, { foreignKey: "bookingId" });

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

Movie.hasMany(Comment, { foreignKey: "movieId" });
Comment.belongsTo(Movie, { foreignKey: "movieId" });

Comment.belongsTo(Comment, { foreignKey: "parentId" });
Comment.hasMany(Comment, { foreignKey: "parentId", as: "replies" });

User.belongsToMany(Promotion, {
  through: "UserPromotion",
  foreignKey: "userId",
  timestamps: false,
});
Promotion.belongsToMany(User, {
  through: "UserPromotion",
  foreignKey: "promotionId",
  timestamps: false,
});

Movie.belongsToMany(MovieType, {
  through: "MovieMovieType",
  foreignKey: "movieId",
  timestamps: false,
});
MovieType.belongsToMany(Movie, {
  through: "MovieMovieType",
  foreignKey: "movieTypeId",
  timestamps: false,
});

MovieType.hasMany(Show, { foreignKey: "movieTypeId" });
Show.belongsTo(MovieType, { foreignKey: "movieTypeId" });

sequelize.sync({
  force: false,
  // alter: true,
});

module.exports = {
  sequelize,
  User,
  Movie,
  Show,
  Cinema,
  CinemaHall,
  CinemaHallSeat,
  City,
  Food,
  Seat,
  Booking,
  BookingFood,
  BookingTicket,
  Payment,
  Promotion,
  Comment,
  MovieType,
};
