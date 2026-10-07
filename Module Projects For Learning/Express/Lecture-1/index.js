const express = require('express');
const routes = require('./routes');

const app = express();

const myLogger = (req, res, next) => {
    // res.send("Logger called");
    console.log("Logger Called");
    next();
}

const requestTime = (req, res, next) => {
    console.log("Req timer ==> " + Date.now() + req);
    next();
}

// app.use(myLogger);
// app.use(requestTime);


app.get("/", myLogger, requestTime, (req, res) => {
    res.send("We got GET request");
})

app.get('/deneme', requestTime, (req, res) => {
    res.send("Araya middleware fonksiyonu soktum");
})

app.use('/lion', routes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));