const express = require("express");
const {
  checkValidate,
  checkSignUp,
  checkLogin,
} = require("../middlewares/authMiddleware");
const { signUp, login } = require("../controller/auth.controller");
const authRouter = express.Router();

authRouter.route("/signup").post(checkValidate, checkSignUp, signUp);

authRouter.route("/login").post(checkValidate, checkLogin, login);

module.exports = {
  authRouter,
};
