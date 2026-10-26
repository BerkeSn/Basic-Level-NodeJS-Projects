const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    // Login
    async login(req, res, next) {
        try {
            const { userName, password } = req.body;

            if (!userName || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Please input all the areas"
                })
            }

            // Kullanıcı adına sahip kullanıcıyı çekiyoruz ki şifresini karşılaştırabilelim
            const user = await db.User.findOne({ where: { userName: userName } });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "There are no user with this username"
                })
            };

            const isValid = await bcrypt.compare(password, user.password);

            if (!isValid) {
                return res.status(403).json({
                    success: false,
                    message: "Wrong password"
                })
            }
            console.log("access öncesi")
            // Kısa süreli token
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN, { expiresIn: "1h" });
            // Uzun süreli token
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_TOKEN, { expiresIn: "7d" });

            await db.RefreshToken.create({
                token: refreshToken
            })

            //Token'ı cookie'ye yolluyoruz.
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,     // JavaScript (document.cookie) bu cookie'yi asla okuyamaz (XSS koruması)
                secure: process.env.NODE_ENV === 'production', // Prod ortamında HTTPS üzerinden gider
                sameSite: 'strict', // CSRF saldırılarına karşı koruma sağlar
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 gün milisaniye cinsinden
            });

            return res.status(200).json({
                success: true,
                data: accessToken
            })

        } catch (error) {
            console.error(`Login error==> ${error}`);
            next(error);
        }
    },
    async refreshToken(req, res, next) {
        try {
            const token = req.cookie.refreshToken;

            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "Token bulunamadı"
                })
            }

            const dbTokenRecord = await db.RefreshToken.findOne({ where: { token } });

            if (!dbTokenRecord) {
                return res.status(403).json({
                    success: false,
                    message: "Geçersiz token"
                })
            }

            const decoded = jwt.verify(token, process.env.REFRESH_TOKEN);
            const newAccessToken = jwt.sign(decoded.toJSON(), process.env.ACCESS_TOKEN);

            res.status(200).json({
                success: true,
                data: newAccessToken
            })

        } catch (error) {
            console.error(`refreshToken error==> ${error}`);
            next(error);
        }
    },
    async createUser(req, res, next) {
        try {
            const { userName, email, password } = req.body;

            if (!userName || !email || !password) {
                // her response'u return ediyoruz ki middleware'e gidip 2 tane res dönmeyelim.
                return res.status(400).json({
                    success: false,
                    message: "Please input all the areas"
                })
            }

            // Böyle bir kullanıcı olup olmadığını kontrol ediyoruz
            const isValid = await db.User.findOne({
                where: { userName: userName }
            })

            if (isValid) {
                return res.status(403).json({
                    success: false,
                    message: "Username already taken"
                })
            }

            // DB'ye yollamadan önce şifreyi hash ediyoruz
            const hashedPassword = await bcrypt.hash(password, 12);

            const user = await db.User.create({
                userName,
                email,
                password: hashedPassword,
            })

            return res.status(200).json({
                success: true,
                message: "User created successfully",
                data: user
            })

        } catch (error) {
            console.error(`createUser error ==> ${error}`);
            next(error);
        }
    },
    async getUsers(req, res, next) {
        try {
            const users = await db.User.findAll();

            if (!users) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                })
            }

            return res.status(200).json({
                success: true,
                data: users
            })

        } catch (error) {
            console.error(`getUsers error ==> ${error}`);
            next(error);
        }
    },
    async getUserById(req, res, next) {
        try {
            const { id } = req.params;

            const user = await db.User.findByPk(id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                })
            }

            return res.status(200).json({
                success: true,
                data: user
            })

        } catch (error) {
            console.error(`getUserById Error ==> ${error}`);
            next(error);
        }
    },
    async updateUser(req, res, next) {
        try {
            const { id } = req.params;
            const { userName, email, password } = req.body;

            const user = await db.User.findByPk(id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                })
            }

            user.userName = userName ?? user.userName;
            user.email = email ?? user.email;
            user.password = password ?? user.password;

            user.save();

            return res.status(200).json({
                success: true,
                message: "Update made successfully",
                data: user
            })
        } catch (error) {
            console.error(`updateUser error ==> ${error}`);
            next(error);
        }
    },
    async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            const user = await db.User.findByPk(id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                })
            }

            await user.destroy();

            return res.status(200).json({
                success: false,
                message: "User deleted successfully"
            })

        } catch (error) {
            console.error(`deleteUser error ==> ${error}`);
            next(error);
        }
    },
}