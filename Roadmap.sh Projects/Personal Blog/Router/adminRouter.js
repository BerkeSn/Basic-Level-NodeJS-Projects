const express = require('express');
const articleController = require('../Controller/articleController');
const routers = express.Router();

routers.get("/dashboard", articleController.getArticles);
routers.post("/createArticle", articleController.createArticle);
routers.get("/editArticle/:id", articleController.editArticle);
routers.delete("/deleteArticle/:id", articleController.deleteArticle);
routers.put("/updateArticle/:id", articleController.editArticle);


module.exports = routers;