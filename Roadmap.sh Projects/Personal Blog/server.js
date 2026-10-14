const express = require('express');
const app = express();
const adminRouter = require('./Router/adminRouter');
const guestRouter = require('./Router/guestRouter');
const middleware = require("./Middleware/middleware");

// express.json body'den gelen veriyi okumak için
app.use(express.json());
app.use(express.urlencoded());

app.use("/admin", adminRouter);
app.use("/guest", guestRouter);

//  Error handling
app.use(middleware.errorHandling);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));