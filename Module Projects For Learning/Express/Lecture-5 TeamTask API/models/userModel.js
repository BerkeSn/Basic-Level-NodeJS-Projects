const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(model) {
            User.belongsToMany(model.Team,
                { foreignKey: "userId", as: "user", through: model.teamMember }
            )
            User.hasMany(model.Comment,
                { foreignKey: "userId" }
            )
            User.hasMany(model.Task,
                { foreignKey: "assignedToId" }
            )
            User.hasOne(model.RefreshToken,
                { foreignKey: "userId" }
            )
        }
    }

    User.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                autoIncrement: false
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: "User",
            timestamps: true, // false durumunda createdAt ve updatedAt görünmez
            paranoid: true
        }
    )
    return User
}