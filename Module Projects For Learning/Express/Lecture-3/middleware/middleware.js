module.exports = {
    globalErrorHandling(err, req, res, next) {
        const errorStatus = err.status || err.statusCode || err;
        const errorStack = err.errorStack;

        console.error(`${req.method} : ${res.originalUrl}`);

        console.error(`Hata Detayı: ${err.message}`);

        res.status(errorStatus).json({
            success: false,
            message: err.message || "Sunucu tarafından beklenmeyen bir hata meydana geldi",
            stack: process.env.Node_env == "Production" ? null : errorStack
        })
    }
}