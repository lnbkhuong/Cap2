const { Seat, CinemaHall, MovieType, City, Cinema } = require("../database/sequelize");

const colum = ["A", "B", "C", "D", "E", "G", "H", "I", "J"];
const row = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const nameCinema = ["1", "2", "3", "4"];
const typeName = ["rạp 2d", "rạp 3d", "rạp"];

const createCity = async () => {
  await City.create({
    cityName: "Đà Nẵng",
  });
  console.log("1");
};
createCity();

const createCinema = async () => {
  await Cinema.create({
    cinemaName: "",
    totalCinemaHall: 4,
    location: "",
    cityId: 1
  })
  console.log("2");
}
// createCinema()
setTimeout(createCinema,2000)

const createSeat = async () => {
  for (const elem_cols of colum) {
    for (const elem_row of row) {
      let numberSeat = elem_cols + elem_row;
      if (elem_cols === "J") {
        if (elem_row <= row.length / 2) {
          await Seat.create({
            numberSeat: numberSeat,
            type: "doi",
          });
        }
      } else {
        await Seat.create({
          numberSeat: numberSeat,
          type: "don",
        });
      }
    }
  }
  console.log("3");
};
createSeat();

const createCinemaHall = async () => {
  try {
    const currCinema = await Cinema.findOne({
      where:{
        cinemaId: 1
      }
    })
    for (const elem_name of nameCinema) {
      const cinemaHall = await CinemaHall.create({
        cinemaHallName: elem_name,
        totalSeat: 102,
        cinemaId: currCinema.cinemaId
      });
      
    }
    console.log("4");
  } catch (error) {
    console.error(error);
  }
  
};
createCinemaHall();

setTimeout(createCinemaHall,5000)
const createCinemaSeat = async () => {
  for (const elem_name of nameCinema) {
    const cinemaHall = await CinemaHall.findOne({
      where: {
        cinemaHallName: elem_name,
      },
    });
    for (const elem_cols of colum) {
      for (const elem_row of row) {
        let numberSeat = elem_cols + elem_row;
        const seat = await Seat.findOne({
          where: {
            numberSeat: numberSeat,
          },
        });
        await cinemaHall.addSeat(seat);
      }
    }
  }
  console.log("5");
};
// createCinemaSeat();
setTimeout(createCinemaSeat,10000)

const createMovieType = async () => {
  try {
    for (const elem_type of typeName) {
      await MovieType.create({
        typeName: elem_type,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// createMovieType();

const get = async () => {
  try {
    const currCinemaHall = await CinemaHall.findOne({
      where:{
          cinemaHallName: "1"
      },
      include: {
        model: Seat
      }
  })
    console.log("🚀 ~ get ~ currCinemaHall:", currCinemaHall.Seats)
  
  } catch (error) {
    console.log(error);
  }
}

// get()