const express = require('express');
const userRouter = require('./Router/userRouter');
const workoutRouter = require('./Router/workoutRoutes');
const middleware = require('./middleware/middleware');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(middleware.loggerFunction);

app.use(middleware.customHeader)
app.use('/api', userRouter);
app.use('/api', workoutRouter);

// Olmayan sayfalar için
app.use(middleware.notFound);

// Global Error Handling
app.use(middleware.globallErrorHandling);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});