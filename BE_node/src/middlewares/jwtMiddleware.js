const jwt = require("jsonwebtoken");
const { compare } = require("bcrypt");
const { User } = require("../database/sequelize");

const auth = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized - Người Dùng Chưa Đăng Nhập !",
      });
    }
    const accessToken = bearerToken.split(" ")[1];
    let data;
    try {
      data = jwt.verify(accessToken, "CAPSTONE2");
    } catch (error) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized - Token Không Hợp Lệ !",
      });
    }

    let user = await User.findOne({
      where: {
        userId: data.userId,
        role: data.role,
      },
      raw: true,
    });

    return user
  } catch (error) {
    return next(error);
  }
};
const checkLoginAdmin = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized - Người Dùng Chưa Đăng Nhập !",
      });
    }

    const accessToken = bearerToken.split(" ")[1];
    const data = jwt.verify(accessToken, "CAPSTONE2");

    const user = await User.findOne({
      where: {
        userId: data.userId,
        role: data.role,
      },
      raw: true,
    });
    if (user.role !== 1) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized - Bạn không có quyền truy cập !",
      });
    }
    return next();
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  auth,
  checkLoginAdmin
};
