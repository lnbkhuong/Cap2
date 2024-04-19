const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { sequelize } = require("./database/sequelize");
const { bookingRouter } = require("./routers/booking.router");
const { authRouter } = require("./routers/auth.route");
const { commentRouter } = require("./routers/comment.router");
const { showRouter } = require("./routers/show.router");

const app = express();
const port = 4000;

const corOptions = {
  origin: "http://localhost:3000",
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corOptions));
app.use("/auth", authRouter);
app.use("/booking", bookingRouter);
app.use("/comment", commentRouter)
app.use("/show", showRouter)
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully");
  })
  .catch((err) => {
    console.error("Unable to connect to the database");
  });
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
