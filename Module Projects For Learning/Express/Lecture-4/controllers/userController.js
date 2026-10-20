const { User, Book, Category } = require('../models');
const { uuid } = require('uuidv4');

module.exports = {
    async getUsers(req, res, next) {
        try {
            const user = await User.findAll();

            res.status(200).json({
                success: true,
                data: user
            })
        } catch (error) {
            console.error(`getUsers error ==> ${error}`);
            next(error);
        }
    },
    async createUser(req, res, next) {
        try {
            const { firstName, lastName } = req.body;

            if (!firstName) {
                return res.status(404).json({
                    success: false,
                    message: "Please input firstName"
                })
            }

            const newUser = await User.create(
                { id: uuid(), firstName: firstName, lastName: lastName }
            )

            return res.status(200).json({
                success: true,
                data: newUser
            })


        } catch (error) {
            console.error(`createUser error ==> ${error}`);
            next(error);
        }
    },
    async getUserById(req, res, next) {
        try {
            const { id } = req.params;

            const user = await User.findByPk(id);

            if (!user) {
                res.status(404).json({
                    success: false,
                    message: "User not found",
                })
            }

            res.status(200).json({
                success: true,
                data: user
            })

        } catch (error) {
            console.error(`getUserById error ==> ${error}`);
            next(error);
        }
    },
    async getUserWithBook(req, res, next) {
        try {
            const { id } = req.params;

            const user = await User.findByPk(id, {
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"]
                },
                include: {
                    model: Book,
                    as: "books",
                    include: {
                        model: Category,
                        as: "Categories",
                        attributes: {
                            exclude: ["createdAt", "updatedAt", "deletedAt"]
                        }
                    },
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "deletedAt"]
                    }
                }
            });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User does not exits"
                })
            }

            res.status(200).json({
                success: true,
                data: user
            })



        } catch (error) {
            console.error(`getUserWithBook error ==> ${error}`);
            next(error);
        }
    },
    async updateUser(req, res, next) {
        try {
            const { id } = req.params;
            const { firstName, lastName } = req.body;

            const user = await User.findByPk(id);

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "User not found"
                })
            }

            user["firstName"] = firstName ?? user.firstName;

            user["lastName"] = lastName ?? user.lastName;

            await user.save();

            res.status(200).json({
                success: true,
                data: user,
            })

        } catch (error) {
            console.error(error);
            next(error);
        }
    },
    async deleteUser(req, res, next) {
        try {
            const { id } = req.params;

            const user = await User.findByPk(id);

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "User not found"
                })
            }

            await user.destroy();

            return res.status(200).json({
                success: true,
                message: "User deleted succesfully"
            })

        } catch (error) {
            console.error(error);
            next(error);
        }
    }

}