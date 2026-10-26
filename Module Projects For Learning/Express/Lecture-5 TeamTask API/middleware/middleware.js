require('dotenv');
const { ValidationError } = require('sequelize');
const jwt = require('jsonwebtoken');

module.exports = {
    globalErrorHandling(err, req, res, next) {
        try {
            const errorCode = err.statusCode || err.status || 500
            const errorStack = err.stack;
            const message = err.message || "Internal Server Error";

            if (err instanceof ValidationError) {
                console.error("Ya girdiğiniz inputlar eksik ya da formatı yanlış")
                return res.status(400).json({
                    success: false,
                    message: "Please input all the areas"
                })
            }

            console.log(`Global Error Handling: ${errorCode}, ${req.originalUrl} ==> ${errorStack}`)

            return res.status(errorCode).json({
                success: false,
                message: `GlobalErrorHandling: ${message}`
            })

        } catch (error) {
            console.error(error)
        }
    },
    pageNotFound(req, res, next) {
        res.status(404).json({
            success: false,
            message: "Page not found"
        })
    },
    verifyToken(req, res, next) {
        try {
            // Header içerisinden tokenımızı ayıklıyoruz
            const authHeader = req.headers["authorization"];
            const token = authHeader && authHeader.split(' ')[1];

            if (!token) {
                return res.status(400).json({
                    success: false,
                    message: "Erişim engellendi. Token bulunamadı"
                })
            }

            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
            req.user = decoded;
            next();

        } catch (error) {
            return res.status(403).json({
                success: false,
                message: "Yanlış token ya da süresi bitti."
            })
        }


    }
}