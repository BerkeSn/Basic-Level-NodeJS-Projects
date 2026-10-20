const { Book, Category, User } = require('../models');

module.exports = {
    async getAllBooks(req, res, next) {
        try {
            const books = await Book.findAll({
                include: ["Categories", "user"]
            })

            if (!books) {
                res.status(400).json({
                    success: false,
                    message: "There are no record"
                })
            }

            res.status(200).json({
                success: true,
                data: books
            })

        } catch (error) {
            console.error('getAllBooks Error ==> ' + error);
            next(error);
        }
    },
    async createBook(req, res, next) {
        try {
            const { title, content, page, categoryId, UserId } = req.body;

            if (!title || !categoryId || !UserId) {
                res.status(400).json({
                    success: false,
                    message: "Please input all the areas"
                })
            }

            const category = await Category.findByPk(categoryId);

            if (!category) {
                res.status(400).json({
                    success: false,
                    message: "Böyle bir kategori mevcut değil."
                })
            }

            const user = await User.findByPk(UserId);

            if (!user) {
                res.status(400).json({
                    success: false,
                    message: "Böyle bir user kayıtlı değil."
                })
            }

            const book = await Book.create({
                title: title,
                content: content,
                page: page,
                UserId: UserId,
                categoryId: categoryId
            })

            res.status(200).json({
                success: true,
                data: book
            })

        } catch (error) {
            console.error(`createBook error ==> ${error}`);
            next(error);
        }
    },
    async getBookById(req, res, next) {
        try {
            const { id } = req.params;

            if (id == undefined) {
                res.status(400).json({
                    success: false,
                    message: "You need to send id"
                })
            }

            const book = await Book.findByPk(id, {
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"]
                },
                include: [{
                    model: User,
                    as: "user",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "deletedAt"]
                    }
                }],
            }); // Id'ye göre çekiyoruz

            if (!book) {
                res.status(400).json({
                    success: false,
                    message: "Id does not exits"
                })
            }

            res.status(200).json({
                success: true,
                data: book
            })

        } catch (error) {
            console.error(`getBookById error ==> ${error}`);
            next(error);
        }
    },
    async updateBook(req, res, next) {
        try {
            const { id } = req.params;
            const { title, content, page } = req.body;

            const book = await Book.findByPk(id);

            if (!book) {
                return res.status(404).json({
                    success: false,
                    message: "Book does not exits"
                })
            }

            book["title"] = title ?? book.title;
            book["content"] = content ?? book.content;
            book["page"] = page ?? book.page;

            await book.save();

            res.status(200).json({
                success: true,
                data: book
            })


        } catch (error) {
            console.error(`updateBook error ==> ${error}`);
            next(error);
        }
    },
    async getBooksByPages(req, res, next) {
        try {
            const { page } = req.params;

            const books = await Book.findAll() // Tüm veriyi çeker 

            if (!books) {
                return res.status(400).json({
                    success: false,
                    message: "Does not exits"
                })
            }

            const filteredBooks = books.filter((j) => j.page >= page); // Veriyi isteğimize göre filtreliyoruz

            return res.status(200).json({
                success: true,
                data: filteredBooks
            })

        } catch (error) {
            console.error(`getBooksByPages error ==> ${error}`);
            next(error);
        }
    }
}