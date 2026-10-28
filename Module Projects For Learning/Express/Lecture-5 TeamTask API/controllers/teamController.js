const db = require('../models');
const { teamMember, User, Team } = require('../models');

module.exports = {
    async getTeams(req, res, next) {
        try {
            const teams = await db.Team.findAll(
                {
                    include: {
                        model: User,
                        as: "users"
                    }
                }
            );

            res.status(200).json({
                success: true,
                data: teams
            })

        } catch (error) {
            console.error(`getTeams error ==> ${error}`);
            next(error);
        }
    },
    async createTeam(req, res, next) {
        try {
            // const { id } = req.params;
            const { name } = req.body;
            const { id } = req.user; // verifyToken middleware'ı user dönüyor bu sayede user içerisindeki verilere erişebiliyoruz.

            if (!name) {
                return res.status(400).json({
                    success: false,
                    message: "Please input name"
                })
            }

            const isExits = await db.Team.findOne({
                where: {
                    name
                }
            });

            if (isExits) {
                res.status(400).json({
                    success: false,
                    message: "Böyle bir takım bulunmakta."
                })
            }

            const team = await db.Team.create({
                name,
                ownerId: id
            })

            res.status(200).json({
                success: true,
                data: team,
            })

        } catch (error) {
            console.error(`createTeam error ==> ${error}`);
            next(error);
        }
    },
    async getTeamById(req, res, next) {
        try {
            const { id } = req.params;

            const team = await db.Team.findByPk(
                id,
                {
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "deletedAt"]
                    },
                    include: {
                        model: User,
                        as: "users",
                        attributes: {
                            exclude: ["createdAt", "updatedAt", "deletedAt"]
                        }
                    }
                }
            );

            if (!team) {
                return res.status(404).json({
                    success: false,
                    message: "Not found"
                })
            }

            return res.status(200).json({
                success: true,
                data: team
            })

        } catch (error) {
            console.error(`getTeamById ==> ${error}`);
            next(error);
        }
    },
    async updateTeam(req, res, next) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            const team = await db.Team.findByPk(id);

            if (!team) {
                return res.status(404).json({
                    success: false,
                    message: "Does not exits"
                })
            }

            team["name"] = name ?? team["name"];

            team.save();

            return res.status(200).json({
                success: true,
                data: team
            })


        } catch (error) {
            console.error(`updateTeam error ==> ${error}`);
            next(error);
        }
    },
    async deleteTeam(req, res, next) {
        try {
            const { id } = req.params;

            const team = await db.Team.findByPk(id);

            if (!team) {
                return res.status(404).json({
                    success: false,
                    message: "Team not found"
                })
            }

            team.destroy();

            return res.status(200).json({
                success: true,
                message: "Deleted."
            })

        } catch (error) {
            console.error(`deleteTeam error ==> ${error}`);
            next(error);
        }
    },
    async addUserToTeam(req, res, next) {
        try {
            const { role } = req.body;
            const { teamId, userId } = req.body;

            if (!teamId || !userId) {
                return res.status(400).json({
                    success: false,
                    message: "Please select user and team"
                })
            }

            const user = await db.User.findByPk(userId);
            const team = await db.Team.findByPk(teamId);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                })
            }

            if (!team) {
                return res.status(404).json({
                    success: false,
                    message: "Team not found"
                })
            }

            const teamMember = await db.teamMember.findOne({ where: { teamId: teamId, userId: userId } })

            if (teamMember) {
                return res.status(401).json({
                    success: false,
                    message: "User already included the team"
                })
            }

            await db.teamMember.create({
                role,
                userId,
                teamId
            });

            return res.status(200).json({
                success: true,
                message: `${user.userName} added to ${team.name}`
            })

        } catch (error) {
            console.error(`addUserToTeam error ==> ${error}`);
            next(error);
        }
    },
    async deleteUserFromTeam(req, res, next) {
        try {
            const teamId = req.params.id;
            const { userId } = req.body;

            const deletedUser = await db.teamMember.findOne({
                where: {
                    userId,
                    teamId
                }
            })

            if (!deletedUser) {
                return res.status(404).json({
                    success: false,
                    message: "You are not in this team"
                })
            }

            await deletedUser.destroy();

            return res.status(200).json({
                success: true,
                message: "User deleted successfuly"
            })
        } catch (error) {
            console.error(`deletedUserFromTeam error ==> ${error}`);
            next(error);
        }
    },
    async getUsersInTeam(req, res, next) {
        try {
            const teamId = req.params.id;
            const userId = req.user.id;

            const team = await db.Team.findByPk(teamId);

            if (!team) {
                return res.status(404).json({
                    success: false,
                    message: "Team not found"
                })
            }

            // Kurucu mu ?
            const isOWner = team.ownerId === userId;

            // Takımda var mı ?
            const isMember = db.teamMember.findOne({
                where: {
                    teamId,
                    userId
                }
            })

            if (!isOWner || !isMember) {
                return res.status(401).json({
                    success: false,
                    message: "Not authorized"
                })
            }

            // teamId olan db içerisinde çektiği verilere include ile user'ları ekliyoruz
            const users = await db.teamMember.findAll({
                where: { teamId },
                attributes: {
                    exclude: ["userId", "teamId", "createdAt", "updatedAt", "deletedAt"]
                },
                include: [
                    {
                        model: db.User,
                        as: "user",
                        attributes: ["id", "userName"]
                    }
                ]
            })

            return res.status(200).json({
                success: true,
                data: users
            })

        } catch (error) {
            console.error(`getUsersInTeam error ==> ${error}`);
            next(error);
        }
    }
}