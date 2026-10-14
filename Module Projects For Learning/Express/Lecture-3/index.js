const express = require('express');
const app = express();
const userRouter = require('./routers/userRouter');
const middleware = require('./middleware/middleware');
const db = require('./models');

const PORT = process.env.PORT || 3000;

// Body'i okuyabilmek içi
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Router
app.use('/users', userRouter);


//Global Error handling
app.use(middleware.globalErrorHandling);

async function connect() {
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');

        await db.sequelize.sync({ alter: true });
        console.log('All models were synchronized successfully.');

        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`)
        });
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connect()