const express = require('express');
const db = require('./models');
const app = express();

//Middleware
const middleware = require('./middleware/middleware');

// Routers
const bookRouter = require('./router/booksRouter');
const userRouter = require('./router/userRouters');
const categoryRouter = require('./router/categoryRouter');

const PORT = process.env.PORT || 3000;

// For body
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/books/', bookRouter);
app.use('/api/user/', userRouter);
app.use(`/api/category/`, categoryRouter)


// Not found middleware
app.use(middleware.notFound);

// Global Error Handling 
app.use(middleware.globalErrorHandling);


async function connect() {
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');

        await db.sequelize.sync({ alter: true });
        console.log('The table for the User model was just (re)created!');

        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        })
    } catch (error) {
        console.log("Connect Error ==> " + error);
    }
}

connect();