const { Category } = require('../models');
const { DataTypes } = require('sequelize');

module.exports = {
    async createCategory(req, res, next) {
        try {
            const { name, description } = req.body;

            if (!name) {
                return res.status(400).json({
                    success: false,
                    message: "You must enter a name"
                })
            }

            const newCategory = await Category.create({
                // id: DataTypes.UUID,
                name: name,
                description: description ?? ""
            })

            res.status(200).json({
                success: true,
                data: newCategory
            })

        } catch (error) {
            console.error(`createCategory error==> ${error}`);
            next(error);
        }

    }
}