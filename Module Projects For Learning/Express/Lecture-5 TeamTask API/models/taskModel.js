const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        static associate(model) {
            Task.belongsTo(model.Team,
                { foreignKey: "teamId", as: "Team" }
            )
            Task.belongsTo(model.User,
                { foreignKey: "assignedToId" }
            )
            Task.hasMany(model.Comment,
                { foreignKey: "taskId" }
            )
        }
    }

    Task.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false
            },
            dueDate: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            createdById: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            sequelize,
            paranoid: true,
            modelName: "Task",
        }
    )
    return Task
}