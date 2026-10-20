const { Model, UUIDV4 } = require('sequelize');
// const { uuidv4 } = require('uuidv4');

module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            Category.hasMany(models.Book, { foreignKey: "categoryId", as: "books" })
        }
    }

    Category.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            sequelize,
            modelName: "Category"
        }
    )
    return Category
}