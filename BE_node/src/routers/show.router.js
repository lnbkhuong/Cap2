const express = require("express");
const { getShowTicket, getAllShow } = require("../controller/show.controller");
const showRouter = express.Router();

showRouter.route("/allShow").get(getAllShow)
showRouter.route("/showTicket/:movieId").get(getShowTicket)

module.exports = {
    showRouter
}