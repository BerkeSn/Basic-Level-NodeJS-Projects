const uuidv7 = require('uuidv7');
const fs = require('fs').promises;

module.exports = {
    async getWorkouts(req, res, next) {
        try {
            const { category, minWeight } = req.query;

            const data = JSON.parse(await fs.readFile('workouts.json', 'utf-8'));

            const filteredData = data.filter((i) => {
                const categoryData = category ? i.category.toLowerCase() == category.toLowerCase() : true;

                const minWeightData = minWeight ? i.weight >= Number(minWeight) : true;

                return categoryData && minWeightData;
            });

            res.status(200).json({
                success: true,
                data: filteredData
            })

        } catch (error) {
            next(error);
        }
    },

    async createWorkout(req, res, next) {
        try {
            const { name, category, sets, reps, weight } = req.body;

            if (!name || !category || !sets || !reps || !weight) {
                res.status(400).send('Please input all the areas');
            }

            const data = JSON.parse(await fs.readFile('workouts.json', 'utf-8'));

            const id = uuidv7.uuidv7();

            data.push({
                "id": id,
                "name": name,
                'category': category,
                'sets': sets,
                'reps': reps,
                'weight': weight
            });

            await fs.writeFile('workouts.json', JSON.stringify(data, null, 2), 'utf-8');

            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    },

    async getWorkoutsById(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                res.stats(400).send("There are no such a id!");
            }

            const data = JSON.parse(await fs.readFile('workouts.json', 'utf-8'));

            const workout = data.find((i) => i.id == id);

            if (!workout) {
                res.status(400).json({ success: false, message: "There are no workout" });
            }

            res.status(200).json(workout);

        } catch (error) {
            next(error)
        }
    },

    async updateWorkout(req, res, next) {
        try {
            const id = req.params.id;

            if (!id) {
                res.status(404).json({ success: false, message: "There are no id" });
            }

            const data = JSON.parse(await fs.readFile('workouts.json', 'utf-8'));

            const workout = data.find((j) => j.id == id);

            workout.name = req.body.name || workout.name;
            workout.category = req.body.category || workout.category;
            workout.sets = req.body.sets || workout.sets;
            workout.reps = req.body.reps || workout.reps;
            workout.weight = req.body.weight || workout.weight;

            await fs.writeFile('workouts.json', JSON.stringify(data, null, 2), 'utf-8');

            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    },

    async deleteWorkout(req, res, next) {
        try {
            const id = req.params.id;

            if (!id) {
                res.status(404).json({ success: false, message: "You need to send id" });
            }

            const data = JSON.parse(await fs.readFile('workouts.json', 'utf-8'));

            const workout = data.find((j) => j.id == id);

            if (!workout) {
                res.status(404).json({ success: false, message: "There is no id like this" });
            }

            const newData = data.filter((j) => j.id != id);

            await fs.writeFile('workouts.json', JSON.stringify(newData, null, 2), 'utf-8');

            res.status(200).json({ success: true, message: newData });
        } catch (error) {
            next(error)
        }
    }

}