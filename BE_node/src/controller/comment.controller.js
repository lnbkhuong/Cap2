const { Comment, User } = require("../database/sequelize");

const { auth } = require("../middlewares/jwtMiddleware");

const createNewComment = async (req, res, next) => {
  try {
    const { content, movieId } = req.body;
    const currentUser = await auth(req, res, next);

    const newComment = await Comment.create({
      content,
      userId: currentUser.userId,
      movieId,
    });

    return res.status(200).json({
      data: {
        newComment,
      },
      message: "Bình luận thành công",
    });
  } catch (error) {
    next(error);
  }
};

const replyComment = async (req, res, next) => {
  try {
    const { content, movieId } = req.body;
    const { parentCommentId } = req.params;
    const currentUser = await auth(req, res, next);

    const newReply = await Comment.create({
      content,
      userId: currentUser.userId,
      parentId: parentCommentId,
      movieId,
    });

    return res.status(200).json({
      data: {
        newReply,
      },
      message: "Bình luận thành công",
    });
  } catch (error) {
    next(error);
  }
};

const getAllCommentsOnPost = async (req, res, next) => {
  try {
    const { movieId } = req.params;

    const allCommentsOnPost = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["avatar", "fullName"],
        },
        {
          model: Comment,
          as: "replies",
          include: { model: User, attributes: ["avatar", "fullName"] },
        },
      ],
      where: {
        movieId: movieId,
      },
    });

    return res.status(200).json({
      data: {
        allCommentsOnPost,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewComment,
  replyComment,
  getAllCommentsOnPost,
};
