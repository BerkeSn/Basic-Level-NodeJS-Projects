module.exports = {
    async getUsers(req, res, next) {
        try {
            res.send("It works");
        } catch (error) {
            next(error);
        }
    }
}