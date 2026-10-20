'use-strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Book extends Model {
        static associate(models) {
            Book.belongsTo(models.Category, { foreignKey: "categoryId", as: "Categories" })
            Book.belongsTo(models.User, { foreignKey: "UserId", as: "user" })
        }
    }

    Book.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            content: {
                type: DataTypes.STRING,
                allowNull: true
            },
            page: {
                type: DataTypes.INTEGER,
                allowNull: true,
            }
        }, {
        sequelize,
        modelName: "Book",
        paranoid: true, // Soft delete (DeletedAt)
        timestamps: true // Otomatik CreatedAt ve UpdatedAt için
    }
    )
    return Book
}