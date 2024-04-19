const commentModel = (sequelize, DataTypes) => {
    return sequelize.define(
      "Comment",
      {
        commentId: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        content: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        evaluate: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        timestamps: true,
      }
    );
  };
  module.exports = {
      commentModel
  }