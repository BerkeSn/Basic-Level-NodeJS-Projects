require('dotenv').config()
const express = require('express');
const db = require('./models');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3000;

const middleware = require('./middleware/middleware');
const rateLimit = require('./middleware/rateLimit_middleware');

//Router
const userRouter = require('./routers/userRouter');
const teamRouter = require('./routers/teamRouter');
const taskRouter = require('./routers/taskRouter');


app.use(express.json()); // Body'i okuyabilmek için
app.use(express.urlencoded({ extended: true })); // URL'ler için
app.use(cookieParser()); // Cookie'leri okuyabilmek için
app.use(rateLimit);

//Routers
app.use("/api/user", userRouter);
app.use('/api/team', teamRouter);
app.use('/api/task', taskRouter);

// Middleware
app.use(middleware.pageNotFound);
app.use(middleware.globalErrorHandling);

async function connect() {
    try {
        await db.sequelize.authenticate();
        console.log("Connection has been established successfully");

        await db.sequelize.sync({ alter: true });
        console.log("Database sync");

        app.listen(PORT, () => {
            console.log(`Server running on ==> ${PORT}`)
        });
    } catch (error) {
        console.log(`Connection Error ====> ${error}`);
    }
}

connect();