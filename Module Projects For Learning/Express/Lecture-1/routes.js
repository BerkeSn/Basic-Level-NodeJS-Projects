const express = require('express');
const routes = express.Router();

const timeLog = (req, res, next) => {
    console.log("You req this timeLog function");
    next();
}

routes.use(timeLog);

routes.get('/', (req, res) => {
    res.status(200).send("Its lion");
})

module.exports = routes;