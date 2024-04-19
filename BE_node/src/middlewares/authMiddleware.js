const { User } = require("../database/sequelize");

const checkValidate = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email) {
      const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          status: 400,
          message: "Định Dạng Email Không Hợp Lệ !",
        });
      }
    }

    if (password) {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          status: 400,
          message:
            "Mật Khẩu Phải Chứa Ít Nhất 1 Ký Tự In Hoa, 1 Ký Tự Thường và Có Chiều Dài Ít Nhất 8 Ký Tự !",
        });
      }
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

const checkSignUp = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
      raw: true,
    });

    if (user) {
      return res.status(400).json({
        status: 400,
        message: "Email đã tồn tại!",
      });
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

const checkLogin = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
      raw: true,
    });

    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "Email không tồn tại!",
      });
    }

    req.user = user;

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  checkLogin,
  checkSignUp,
  checkValidate,
};
