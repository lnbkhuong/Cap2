const { create } = require("sequelize/lib/model");
const {
  Booking,
  BookingTicket,
  BookingFood,
  User,
  CinemaHallSeat,
  Show,
  Food,
  Movie,
  Seat,
  CinemaHall,
  sequelize,
} = require("../database/sequelize");
const { auth } = require("../middlewares/jwtMiddleware");
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
//đặt vé

const createBooking = async (req, res, next) => {
  try {
    const { totalPrice, showId, seat, food } = req.body;
    console.log("🚀 ~ createBooking ~ food:", food);
    console.log("🚀 ~ createBooking ~ seat:", seat);
    if (seat.length === 0) {
      return res.status(400).json({
        message: "Ghế chưa được chọn",
      });
    } else {
      const currUser = await auth(req, res, next);
      console.log("🚀 ~ createBooking ~ currUser:", currUser);

      const createBook = await Booking.create({
        totalPrice,
        createOn: new Date(),
        userId: currUser.userId,
      });
      console.log("🚀 ~ createBooking ~ createBook:", createBook);
      let changeSeat;
      let createBookTicket;
      for (const seatId of seat) {
        console.log("🚀 ~ createBooking ~ seatId:", seatId);
        await CinemaHallSeat.update(
          {
            isBooked: true,
          },
          {
            where: {
              seatId: seatId,
              showId,
            },
          }
        );
        changeSeat = await CinemaHallSeat.findOne({
          where: {
            seatId: seatId,
            showId,
          },
        });
        console.log("🚀 ~ createBooking ~ changeSeat:", changeSeat);
        createBookTicket = await BookingTicket.create({
          ticketPrice: changeSeat.priceSeat,
          bookingId: createBook.bookingId,
          showId,
          cinemaHallSeatId: changeSeat.cinemaHallSeatId,
        });
      }
      let searchFood;
      let createBookFood;
      for (const foodId in food) {
        if (Number(food[foodId]) !== 0) {
          searchFood = await Food.findOne({
            where: {
              foodId: Number(foodId),
            },
          });
          const price = searchFood.foodPrice * Number(food[foodId])


          createBookFood = await BookingFood.create({
            priceFood: price,
            quantity: Number(food[foodId]),
            foodId: searchFood.foodId,
            bookingId: createBook.bookingId,
          });
        }
      }
      return res.status(200).json({
        data: {
          createBook,
          // createBookTicket,
          // createBookFood,
        },
        message: "Bạn đã đặt vé thành công",
      });
    }
  } catch (error) {}
};

// xem lịch sử đặt vé tổng quát của người dùng
const getAllBookingforUser = async (req, res, next) => {
  try {
    const currUser = await auth(req, res, next);
    console.log("🚀 ~ getAllBooking ~ currUser:", currUser);
    const getAllBooking = await Booking.findAll({
      where: {
        userId: currUser.userId,
      },
      include: [
        {
          model: User,
          attributes: ["fullName", "email", "avatar"],
        },
        {
          model: BookingTicket,
          attributes: ["bookingTicketId"],
          include: {
            model: Show,
            attributes: ["showId"],
            include: {
              model: Movie,
              attributes: ["movieName", "movieImage"],
            },
          },
        },
      ],
    });

    return res.status(200).json({
      data: {
        getAllBooking,
      },
    });
  } catch (error) {
    return next(error);
  }
};

//xem lịch sử đặt vé chi tiết
const getDetailBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const detailBooking = await Booking.findOne({
      where: {
        bookingId: id,
      },
      include: [
        {
          model: User,
        },
      ],
    });

    const detailBookingTicket = await BookingTicket.findAll({
      where: {
        bookingId: id,
      },
      include: [
        {
          model: Show,
        },
        {
          model: CinemaHallSeat,
          attributes: ["isBooked"],
          include: {
            model: Seat,
            include: {
              model: CinemaHall,
              attributes: ["cinemaHallName"],
            },
          },
        },
      ],
    });

    const detailBookingFood = await BookingFood.findAll({
      where: {
        bookingId: id,
      },
      include: {
        model: Food,
      },
    });
    return res.status(200).json({
      data: {
        detailBooking,
        detailBookingTicket,
        detailBookingFood,
      },
    });
  } catch (error) {
    return next(error);
  }
};

/*
 Lịch sử đặt vé cho admin
 */

const getAllBookingforAdmin = async (req, res, next) => {
  try {
    const { createOn } = req.body;
    // const da = createOn ? {createOn}:{}
    // console.log("🚀 ~ getAllBookingforAdmin ~ createOn:", da)
    const getAllBooking = await Booking.findAll({
      where: sequelize.where(
        sequelize.fn("Year", sequelize.col("createOn")),
        createOn
      ),
      // include: [
      //   {
      //     model: User,
      //     attributes: ["fullName", "email", "avatar"],
      //   },
      //   {
      //     model: BookingTicket,
      //     attributes: ["bookingTicketId"],
      //     include: {
      //       model: Show,
      //       attributes: ["showId"],
      //       include: {
      //         model: Movie,
      //         attributes: ["movieName", "movieImage"],
      //       },
      //     },
      //   },
      // ],
      // attributes: [
      //   "bookingId",
      //   sequelize.fn("max", sequelize.col("totalPrice")),
      // ],
    });
    console.log("🚀 ~ getAllBookingforAdmin ~ getAllBooking:", getAllBooking);
    const sumPrice = await Booking.sum("totalPrice");
    return res.status(200).json({
      data: {
        getAllBooking,
        sumPrice,
      },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllBookingforUser,
  getDetailBooking,
  createBooking,
  getAllBookingforAdmin,
};
