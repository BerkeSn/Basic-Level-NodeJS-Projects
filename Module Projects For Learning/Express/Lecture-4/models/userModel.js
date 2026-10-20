const { Model, UUIDV4 } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(model) {
            User.hasMany(model.Book, { foreignKey: "UserId", as: "books" })
        }
    };

    User.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true, // Hazır id yerine geçmesi için primary key oluşturuyoruz,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true // Birden fazla aynı değer olmaması için (T.C- Telefon - Email etc.)
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            sequelize,
            modelName: "User",
            paranoid: true
        }
    )
    return User
}