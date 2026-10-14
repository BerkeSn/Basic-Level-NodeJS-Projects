const express = require('express');
const articleController = require('../Controller/articleController');
const routers = express.Router();

routers.get("/getArticles", articleController.getArticles);
routers.get("/getArticleById/:id", articleController.getArticleById);

module.exports = routers;