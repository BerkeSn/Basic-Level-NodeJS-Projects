const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        static associate(model) {
            Comment.belongsTo(model.User,
                { foreignKey: "userId" }
            )
            Comment.belongsTo(model.Task,
                { foreignKey: "taskId" }
            )
        }
    }

    Comment.init(
        {
            content: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            paranoid: true,
            modelName: "Comment"
        }
    )
    return Comment
}