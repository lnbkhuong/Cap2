const movieTypeModel = (sequelize, Datatypes) => {
    return sequelize.define(
        "movieType",
        {
            movieTypeId: {
                type: Datatypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            typeName: {
                type: Datatypes.STRING,
                allowNull: false
            }
        },
        {
            timestamps: false
        }
    )
}
module.exports = {
    movieTypeModel
}