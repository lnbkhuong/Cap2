const express = require("express");
const {
  getDetailBooking,
  createBooking,
  getAllBookingforUser,
  getAllBookingforAdmin,
} = require("../controller/booking.controller");
const bookingRouter = express.Router();
//user
bookingRouter.route("/").post(createBooking);
bookingRouter.route("/user/allBooking").get(getAllBookingforUser);
bookingRouter.route("/detailBooking/:id").get(getDetailBooking);

//admin
bookingRouter.route("/admin/allBooking").get(getAllBookingforAdmin);
module.exports = {
  bookingRouter,
};
