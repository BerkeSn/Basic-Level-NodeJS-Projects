const { ValidationError, UniqueConstraintError } = require('sequelize');

module.exports = {
    // Global Error Handling
    globalErrorHandling(err, req, res, _next) {
        const errorStatusCode = err.statusCode || err.status || 500;
        const errorStack = err.stack;

        console.error(`Error url ${req.originalUrl}`);

        if (err instanceof ValidationError) {
            return res.status(errorStatusCode).json({
                success: false,
                message: "Bu isimle veri kaydedemezsiniz."
            })
        }

        if (err instanceof UniqueConstraintError) {
            return res.status(errorStatusCode).json({
                success: false,
                message: "Bu isimle veri kaydedemezsiniz."
            })
        }

        res.status(errorStatusCode).json({
            success: false,
            message: `Error occurs in ${errorStack}`
        })
    },
    // For not define path
    notFound(req, res, next) {
        res.status(404).json({
            success: false,
            message: "Page not found"
        })
    }
}