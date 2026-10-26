const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class teamMember extends Model {
        static associate(model) {
            teamMember.belongsTo(model.User,
                { foreignKey: "userId", as: "user" }
            );
            teamMember.belongsTo(model.Team,
                { foreignKey: "teamId", as: "team" }
            )
        }
    }
    teamMember.init(
        {
            role: {
                type: DataTypes.STRING,
                allowNull: false
            },
            userId: {
                type: DataTypes.STRING,
                field: "userId"
            },
            teamId: {
                type: DataTypes.STRING,
                field: "teamId"
            }
        },
        {
            sequelize,
            modelName: "teamMember",
            paranoid: true
        }
    )
    return teamMember
}