module.exports = {
    errorHandling(err, req, res, next) {
        const errorStatus = err.status || err.statusCode || 500;
        const errorMessage = err.message;
        const errorStack = err.stack;

        console.log(`Error on ==> ${req.url}`);
        console.log(`Error Message ==> ${errorMessage}`);
        console.log(`Error Stack ==> ${errorStack}`)

        res.status(errorStatus).json({
            success: false,
            data: {
                message: errorMessage,
                stack: errorStack,
            }
        })

    }
}