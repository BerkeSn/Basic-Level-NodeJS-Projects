const db = require('../models');

module.exports = {
    // Tüm yorumları çekme
    async getAllComment(req, res, next) {
        try {
            const comments = await db.Comment.findAll({
                include: [
                    {
                        model: db.Task,
                        attributes: ["title", "description"],
                        include: {
                            model: db.Team,
                            attributes: ["name"],
                            as: "Team"
                        }
                    },
                    {
                        model: db.User,
                        attributes: ["userName"],
                    },
                ]
            });

            return res.status(200).json({
                succuess: true,
                data: comments
            })

        } catch (error) {
            console.error(`getComments error ==> ${error}`);
            next(error);
        }
    },

    // Id bazlı yorum çekme
    async getCommentById(req, res, next) {
        try {
            const commentId = req.params.id;

            if (!commentId) {
                return res.status(404).json({
                    succuess: false,
                    message: "Please select a comment"
                })
            }

            const comment = await db.Comment.findByPk(commentId, {
                include: [
                    {
                        model: db.User,
                        attributes: ["userName"]
                    },
                    {
                        model: db.Task,
                        attributes: ["title"],
                        include: {
                            model: db.Team,
                            as: "Team",
                            attributes: ["name"]
                        }
                    }
                ]
            })

            if (!comment) {
                return res.status(404).json({
                    succuess: false,
                    message: "Not exits"
                })
            }

            return res.status(200).json({
                succuess: true,
                data: comment
            })
        } catch (error) {
            console.error(`getCommentById error ==> ${error}`);
            next(error);
        }
    },

    // Kullanıcı yorum oluşturur
    async createComment(req, res, next) {
        try {
            const userId = req.user.id;
            const { content } = req.body;
            const taskId = req.params.taskId;

            const task = await db.Task.findByPk(taskId,
                {
                    include: {
                        model: db.Team, as: "Team"
                    }
                }
            );

            if (!task) {
                return res.status(404).json({
                    succuess: false,
                    message: "Task does not exits"
                })
            }

            const teamMember = await db.teamMember.findOne({
                where: {
                    userId,
                    teamId: task.teamId
                }
            })

            if (!teamMember) {
                return res.status(403).json({
                    succuess: false,
                    message: "Not authorized"
                })
            }

            if (!content) {
                return res.status(400).json({
                    succuess: false,
                    message: "Please input all the areas"
                })
            }

            const newComment = await db.Comment.create({
                content,
                taskId,
                userId
            })

            return res.status(200).json({
                succuess: true,
                data: newComment
            })

        } catch (error) {
            console.error(`createComment error ==> ${error}`);
            next(error);
        }
    },

    // Kullanıcı kendi yorumunu günceller
    async updateComment(req, res, next) {
        try {
            const userId = req.user.id;
            const taskId = req.params.taskId;
            const commentId = req.params.commentId;
            const { content } = req.body;

            if (!taskId || !commentId) {
                return res.status(404).json({
                    succuess: false,
                    message: "Please select Task and Comment for update"
                })
            }

            const task = await db.Task.findByPk(taskId);

            if (!task) {
                return res.status(404).json({
                    succuess: false,
                    message: "Not exits"
                })
            }

            const teamMember = await db.teamMember.findOne({
                where: {
                    userId,
                    teamId: task.teamId
                }
            })

            if (!teamMember) {
                return res.status(403).json({
                    succuess: false,
                    message: "Not authorized"
                })
            }

            if (!content) {
                return res.status(400).json({
                    succuess: false,
                    message: "Please input a content"
                })
            }

            const comment = await db.Comment.findByPk(commentId);

            if (!comment) {
                return res.status(404).json({
                    succuess: false,
                    message: "Comment does not exits"
                })
            }

            if (comment.userId != userId) {
                return res.status(403).json({
                    succuess: false,
                    message: "Not authorized"
                })
            }

            const updated = await comment.update({
                content
            })

            return res.status(200).json({
                succuess: true,
                data: updated
            })
        } catch (error) {
            console.error(`updateComment error ==> ${error}`);
            next(error);
        }
    },

    // Kullanıcı kendi yorumunu siler
    async deleteComment(req, res, next) {
        try {
            const userId = req.user.id;
            const commentId = req.params.commentId;
            const taskId = req.params.taskId;

            const task = await db.Task.findByPk(taskId);

            if (!task) {
                return res.status(404).json({
                    succuess: false,
                    message: "Task does not exits"
                })
            }

            const teamMember = await db.teamMember.findOne({
                where: {
                    userId,
                    teamId: task.teamId
                }
            })

            if (!teamMember) {
                return res.status(403).json({
                    succuess: false,
                    message: "Not authorized"
                })
            }

            const comment = await db.Comment.findByPk(commentId);

            if (comment.userId != userId) {
                return res.status(403).json({
                    succuess: false,
                    message: "Not authorized"
                })
            }

            if (!comment) {
                return res.status(404).json({
                    succuess: false,
                    message: "Comment does not exits"
                })
            }

            await comment.destroy();

            return res.status(200).json({
                succuess: true,
                message: "Deleted successfully"
            })
        } catch (error) {
            console.error(`deleteComment error ==> ${error}`);
            next(error);
        }
    },

    // Göreve ait kullanıcı o görevlere gelen yorumları çeker
    async getAllCommentByTask(req, res, next) {
        try {
            const taskId = req.params.taskId;
            const userId = req.user.id;

            const task = await db.Task.findByPk(taskId);

            if (!task) {
                return res.status(404).json({
                    succuess: false,
                    message: "Task does not exits"
                })
            }

            const teamMember = await db.teamMember.findOne({
                where: {
                    userId,
                    teamId: task.teamId
                }
            })

            if (!teamMember) {
                return res.status(403).json({
                    succuess: false,
                    message: "Not authorized"
                })
            }

            const comments = await db.Comment.findAll({
                where: {
                    taskId
                },
                include: [
                    {
                        model: db.User,
                        attributes: ["userName"]
                    }
                ]
            })

            if (!comments) {
                return res.status(404).json({
                    succuess: false,
                    message: "There are no comment"
                })
            }

            return res.status(200).json({
                succuess: true,
                data: comments
            })

        } catch (error) {
            console.error(`getAllCommentByTask error ==> ${error}`);
            next(error);
        }
    },
}