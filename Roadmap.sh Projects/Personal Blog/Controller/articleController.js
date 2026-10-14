const fs = require('fs').promises;
const path = require('path');
const uuidv7 = require('uuidv7');

const pathArticle = path.join(__dirname, '../db/articles.json');

module.exports = {
    async createArticle(req, res, next) {
        try {
            const db = JSON.parse(await fs.readFile(pathArticle, "utf-8"));

            const { title, content } = req.body;

            if (!title || !content) {
                res.status(400).json({
                    success: false,
                    message: "Please input all the areas"
                })
                return;
            }

            const newArticle = {
                "id": uuidv7.uuidv7(),
                "title": title,
                "content": content,
                "createdAt": Date.now(),
                "updatedAt": Date.now()
            }

            db.push(newArticle);

            await fs.writeFile(pathArticle, JSON.stringify(db, null, 2), "utf-8");

            res.status(200).json({
                success: true,
                message: "Article created successfully",
                data: newArticle,
            })

        } catch (error) {
            next(error)
        }
    },
    async getArticles(req, res, next) {
        try {
            const articles = JSON.parse(await fs.readFile(pathArticle, "utf-8"));

            if (!articles) {
                res.status(400).json({
                    success: false,
                    message: "There are no articles"
                })
            }

            res.status(200).json({
                success: true,
                message: "Get the articles",
                data: articles
            })

        } catch (error) {
            next(error)
        }
    },
    async getArticleById(req, res, next) {
        try {
            const id = req.params.id;
            const articles = JSON.parse(await fs.readFile(pathArticle, "utf-8"));

            const article = articles.find((j) => j.id === id);

            if (!article) {
                res.status(404).json({
                    success: false,
                    message: `There are no article with ${id}`
                })
                return
            }

            res.status(200).json({
                success: true,
                data: article
            })

        } catch (error) {
            next(error)
        }
    },

    async editArticle(req, res, next) {
        try {
            const id = req.params.id;
            const { title, content } = req.body;

            const articles = JSON.parse(await fs.readFile(pathArticle, "utf-8"));

            const article = articles.find((j) => j.id == id);

            article.title = title || article.title;
            article.content = content || article.content;
            article.updatedAt = Date.now();

            await fs.writeFile(pathArticle, JSON.stringify(articles, null, 2), "utf-8");

            res.status(200).json({
                success: true,
                data: article,
            })

        } catch (error) {
            next(error)
        }
    },

    async deleteArticle(req, res, next) {
        try {
            const id = req.params.id;

            const articles = JSON.parse(await fs.readFile(pathArticle, "utf-8"));

            const articleDeleted = articles.find((j) => j.id == id);

            if (!articleDeleted) {
                res.status(404).json({
                    success: false,
                    message: "There are no article with this id"
                })
            }

            const newArticles = articles.filter((j) => j.id !== id);

            await fs.writeFile(pathArticle, JSON.stringify(newArticles, null, 2), "utf-8");

            res.status(200).json({
                sucess: true,
                message: "Deleted succesfully"
            })

        } catch (error) {
            next(error)
        }
    }

}