module.exports = {
    loggerFunction(req, res, next) {
        const now = new Date();
        const hour = String(now.getHours()).padStart(2, 0);
        const minutes = String(now.getMinutes()).padStart(2, 0);
        const seconds = String(now.getSeconds()).padStart(2, 0);

        const fullTime = `${hour}:${minutes}:${seconds}`

        console.log(req.method + req._parsedUrl.pathname + " - " + fullTime);
        next();
    },

    notFound(req, res, next) {
        res.status(404).json({
            success: false,
            message: "Page does not exits"
        })
    },

    customHeader(req, res, next) {
        res.status(200).set('X-API-AUTHOR', 'berke');
        next()
    },

    globallErrorHandling(err, req, res, next) {
        const statusCode = err.status || err.statusCode || 500;
        console.log(req);
        console.error(`${req.method} ${req.originalUrl}`);

        console.error(`[Hata Detayi]: ${err.message}`);

        res.status(statusCode).json({
            success: false,
            message: err.message || "Sunucu tarafından beklenmedik bir hata meydana geldi",
            stack: process.env.Node_Env === 'Production' ? null : err.stack
        })

    }


}