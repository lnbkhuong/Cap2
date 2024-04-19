const movieModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Movie",
    {
      movieId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      movieName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      movieCategory: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      movieDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      movieDirector: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      movieActor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      movieClass: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      movieImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      movieDuration: {
        type: DataTypes.INTEGER,
      },
      movieRelease: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      trailer: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );
};
module.exports = {
  movieModel,
};
