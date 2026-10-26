const db = require('../models');

module.exports = {
    async createTask(req, res, next) {
        try {
            const { id } = req.user;
            const { title, description, status, assignedToId } = req.body;

            if (!title || !description || !status || !assignedToId) {
                return res.status(400).json({
                    success: false,
                    message: "Please input all the areas"
                })
            }

            const assignedUser = await db.User.findByPk(assignedToId);

            if (!assignedUser) {
                return res.status(404).json({
                    success: false,
                    message: "AssignedId not exits"
                })
            }

            const task = await db.Task.create({
                title,
                description,
                status,
                createdById: id,
                assignedToId
            })

            return res.status(200).json({
                success: true,
                data: task
            })

        } catch (error) {
            console.error(`createTask error ==> ${error}`);
            next(error);
        }
    },
    // Takıma ait tüm görevler (Yollayan kişinin takımdan olup olmadığını kontrol etmek gerekiyor.)(user role göre içerik çekebilmeyi middleware haline getirmem gerek)
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
    // Tüm görevler
    async getTasks(req, res, next) {
        try {
            const task = await db.Task.findAll();
            return res.status(200).json({
                success: true,
                data: task
            })
        } catch (error) {
            next(error)
        }
    },
    // takıma ait belirli bir görev
}