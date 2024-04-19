const { Op } = require("sequelize");
const {
  Movie,
  MovieType,
  Show,
  CinemaHall,
  Seat,
  CinemaHallSeat,
  sequelize,
} = require("../database/sequelize");

const createShow = async (req, res, next) => {
  try {
    const {
      CreateOn,
      startTime,
      endTime,
      cinemaHallName,
      typeName,
      movieName,
      priceSeat,
    } = req.body;

    if (typeof Number(priceSeat) !== "number") {
      res.status(400).json({
        message: "",
      });
    }
    const currMovie = await Movie.findOne({
      where: {
        movieName: movieName,
      },
    });
    const currMovieType = await MovieType.findOne({
      where: {
        typeName: typeName,
      },
    });

    const currCinemaHall = await CinemaHall.findOne({
      where: {
        cinemaHallName: cinemaHallName,
      },
      include: {
        model: Seat,
      },
    });
    const newShow = await Show.create({
      CreateOn: CreateOn,
      startTime: startTime,
      endTime: endTime,
      cinemaHallId: currCinemaHall.cinemaHallId,
      movieId: currMovie.movieId,
      movieTypeId: currMovieType.movieTypeId,
    });
    for (let index = 0; index < currCinemaHall.Seats.length; index++) {
      let price;
      if (currCinemaHall.Seats.type === "doi") {
        price = priceSeat * 2;
      } else {
        price = priceSeat;
      }
      const newCinemaHallSeat = await CinemaHallSeat.create({
        priceSeat: price,
        showId: newShow.showId,
        seatId: currCinemaHall.Seats[index].seatId,
      });
      console.log("🚀 ~ createShow ~ newCinemaHallSeat:", newCinemaHallSeat);
    }
    return res.status(200).json({
      message: "Tạo lịch chiếu thành công",
    });
  } catch (error) {
    return next(error);
  }
};

const getAllShow = async (req, res, next) => {
  try {
    const { CreateOn } = req.body;
    let year, month, day;
    if (CreateOn === null) {
      year = new Date().getFullYear();
      month = new Date().getMonth() + 1;
      day = new Date().getDate();
    }

    const allShow = await Show.findAll({
      where: {
        [Op.or]: [
          {
            CreateOn: CreateOn,
          },
          {
            [Op.and]: [
              sequelize.where(
                sequelize.fn("Year", sequelize.col("CreateOn")),
                year
              ),
              sequelize.where(
                sequelize.fn("Month", sequelize.col("CreateOn")),
                { [Op.gte]: month }
              ),
              sequelize.where(sequelize.fn("Day", sequelize.col("CreateOn")), {
                [Op.gte]: day,
              }),
            ],
          },
        ],
      },
      include: [
        {
          model: Movie,
        },
        {
          model: CinemaHall,
          attributes: ["cinemaHallName"],
        },
      ],
    });

    return res.status(200).json({
      data: {
        allShow,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const getDetailShow = async (req, res, next) => {
  try {
    const { showId } = req.params;
    const detailShow = await Show.findOne({
      where: {
        showId: showId,
      },
      include: [
        {
          model: Movie,
        },
        {
          model: CinemaHall,
          attributes: ["cinemaHallName"],
        },
        {
          model: MovieType,
        },
      ],
    });

    return res.status(200).json({
      data: {
        detailShow,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const getShowTicket = async (req, res, next) => {
  try {
    const { CreateOn } = req.body;
    const { movieId } = req.params;
    const hours = new Date().getHours();
    const minute = new Date().getMinutes();
    const getShow = await Movie.findOne({
      where: {
        movieId: movieId,
      },
      attributes: ["movieName"],
      include: [
        {
          model: MovieType,
          include: [
            {
              model: Show,
              where: {
                [Op.and]: [
                  { movieId: movieId, 
                    CreateOn: CreateOn },

                  sequelize.where(
                    sequelize.fn("Time", sequelize.col("startTime")),
                    { [Op.gte]: `${hours}:${minute}` }
                  ),
                ],
              },
              order: [["showId", "DESC" ]],
            },
          ],
        },
      ],
    });
    return res.status(200).json({
      getShow,
    });
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  createShow,
  getAllShow,
  getShowTicket,
};
