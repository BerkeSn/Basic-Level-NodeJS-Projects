const { Model } = require('sequelize');
const { User } = require('./userModel');

module.exports = (sequelize, DataTypes) => {
    class Team extends Model {
        static associate(model) {
            Team.belongsToMany(model.User,
                {
                    through: model.teamMember,
                    foreignKey: "teamId",
                    as: "users"
                });
            Team.hasMany(model.Task,
                {
                    foreignKey: "teamId",
                    as: "Task"
                })
        }
    }

    Team.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            ownerId: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: "Team",
            paranoid: true
        }
    )
    return Team;
}