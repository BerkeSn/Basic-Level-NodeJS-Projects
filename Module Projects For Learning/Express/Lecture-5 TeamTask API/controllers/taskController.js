const db = require('../models');

module.exports = {
    async createTask(req, res, next) {
        try {
            const userId = req.user.id;
            const teamId = req.params.id;
            const { title, description, status, dueDate, assignedToId } = req.body;

            const teamMember = await db.teamMember.findOne({
                where: {
                    teamId,
                    userId
                }
            })

            if (!title || !description || !status || !dueDate || !assignedToId) {
                return res.status(400).json({
                    success: false,
                    message: "Please input all the areas"
                })
            }

            if (!teamMember) {
                return res.status(404).json({
                    success: false,
                    message: "You are not in the team"
                })
            }

            const assignUser = await db.teamMember.findOne({
                where: {
                    userId: assignedToId,
                    teamId
                }
            })

            if (!assignUser) {
                return res.status(404).json({
                    success: false,
                    message: "Assigned user not found"
                })
            }

            const newTask = await db.Task.create({
                title,
                description,
                status,
                dueDate,
                createdById: userId,
                teamId,
                assignedToId
            })

            return res.status(200).json({
                success: true,
                data: newTask
            })
        } catch (error) {
            console.error(`createTask error ==> ${error}`);
            next(error);
        }
    },
    async getTasksForTeams(req, res, next) {
        try {
            const teamId = req.params.id;

            const tasks = await db.Team.findAll(
                {
                    where: { id: teamId },
                    include: {
                        model: db.Task,
                        as: "Task",
                        attributes: ["title", "description", "status"]
                    }
                });

            if (!tasks) {
                return res.status(404).json({
                    success: false,
                    message: "There is no task for this team"
                })
            }

            return res.status(200).json({
                success: true,
                data: tasks
            })

        } catch (error) {
            console.error(`getTasksForTeams error==> ${error}`);
            next(error);
        }
    },
    async updateTask(req, res, next) {
        try {
            const taskId = req.params.taskId;
            const teamId = req.params.teamId;
            const userId = req.user.id;
            const { title, description, status, dueDate, assignedToId } = req.body;


            if (!title || !description || !status || !dueDate) {
                return res.status(400).json({
                    success: false,
                    message: "Please input all the areas"
                })
            }

            // Kullanıcının takımın üyesi olup olmadığını kontrol ediyorum.
            const isMember = await db.teamMember.findOne({
                where: {
                    teamId,
                    userId
                }
            })

            if (!isMember) {
                return res.status(403).json({
                    success: false,
                    message: "You are not member of this team"
                })
            }

            const isAssignUserMember = await db.teamMember.findOne({
                where: {
                    teamId,
                    userId: assignedToId
                }
            })

            if (!isAssignUserMember) {
                return res.status(403).json({
                    success: false,
                    message: "Assigned user is not a member"
                })
            }

            const task = await db.Task.findOne({
                where: {
                    teamId,
                    id: taskId
                }
            });

            if (!task) {
                return res.status(404).json({
                    success: false,
                    message: "Task not found"
                })
            }

            task.title = title ?? task.title;
            task.description = description ?? task.description;
            task.status = status ?? task.status;
            task.dueDate = dueDate ?? task.dueDate;
            task.assignedToId = assignedToId ?? task.assignedToId;

            await task.save();

            return res.status(200).json({
                success: true,
                message: "Task updated",
                data: task
            })

        } catch (error) {
            console.error(`updateTask error ==> ${error}`);
            next(error);
        }
    },
    async deleteTask(req, res, next) {
        try {
            const taskId = req.params.taskId;
            const teamId = req.params.teamId;
            const userId = req.user.id;

            const theTeam = await db.teamMember.findOne({
                where: {
                    userId,
                    teamId
                }
            })

            if (!(theTeam.role.toLowerCase() === "admin")) {
                return res.status(403).json({
                    success: false,
                    message: "Not authorized"
                })
            }

            if (!theTeam) {
                return res.status(404).json({
                    success: false,
                    message: "Team not found"
                })
            }

            const deletedTask = await db.Task.findOne({
                where: {
                    id: taskId,
                    teamId
                }
            });

            if (!deletedTask) {
                return res.status(403).json({
                    success: false,
                    message: "Not authorized"
                })
            }

            const task = await db.Task.findByPk(taskId);

            await task.destroy();

            return res.status(200).json({
                success: true,
                message: "Task deleted successfully"
            })

        } catch (error) {
            console.error(`deleteTask error => ${error}`);
            next(error);
        }
    }
}