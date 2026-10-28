require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');
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
app.use(helmet()); // Güvenlik açıklarına karşı koruma
app.use(cors()); // Farklı tarayıcılara karşı engellemeyi kaldırır.

//Routers
app.use(rateLimit);
app.use("/api/user", userRouter);
app.use('/api/team/task', taskRouter);
app.use('/api/team', teamRouter);

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