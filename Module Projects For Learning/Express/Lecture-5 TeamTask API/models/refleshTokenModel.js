const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RefreshToken extends Model {
        static associate(model) {
            RefreshToken.belongsTo(model.User, { foreignKey: "userId" })
        }
    }

    RefreshToken.init(
        {
            token: {
                type: DataTypes.TEXT,
                allowNull: true
            }
        },
        {
            sequelize,
            modelName: "RefreshToken"
        }
    )
    return RefreshToken
}