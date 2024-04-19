const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../database/sequelize");

const saltRounds = 10;

const signUp = async (req, res, next) => {
  try {
    const { fullName, email, password, phoneNumber, role } = req.body;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    let userRole;
    if (role && role.toLowerCase() === "admin") {
      userRole = 1;
    } else if (role && role.toLowerCase() === "user"){
      userRole = 3;
    } else {
      userRole = 2
    }

    const newUser = await User.create({
      fullName,
      email,
      password: hash,
      phoneNumber,
      role: userRole,
    });

    return res.json({
      data: {
        newUser,
      },
      message: "Create user success",
    });
  } catch (error) {
    return next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const { email,password } = req.body;
    const currUser = await User.findOne({
      where: {
        email: email,
      },
      raw: true,
    });

    const isValidPassword = bcrypt.compareSync(password, currUser.password);

    if (!isValidPassword) {
      return res.status(400).json({
        status: 400,
        message: "Email hoặc mật khẩu không chính xác!",
      });
    }
    let accessToken;
   
      accessToken = jwt.sign(
        {
          userId: currUser.userId,
          role: currUser.role,
        },
        "CAPSTONE2",
        { expiresIn: 3 * 30 * 24 * 60 * 60 }
      );
    

    return res.status(200).json({
      status: 200,
      data: {
        accessToken,
        role: currUser.role,
      },
      message: "Đăng nhập thành công!",
    });
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  signUp,
  login,
};
