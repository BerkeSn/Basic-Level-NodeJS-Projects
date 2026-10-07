const fs = require('fs').promises;
const uuid = require('uuidv7');

async function getUsers(req, res, next) {
    try {
        const { minAge } = req.query;
        let db = JSON.parse(await fs.readFile('db.json', 'utf-8'));

        const filteredData = db.filter((i) => {
            const ageFilteredData = minAge ? i.age >= minAge : true;
            return ageFilteredData;
        })

        res.status(200).json({
            success: true,
            data: filteredData
        });
    } catch (error) {
        next(error);
    }
}

async function getUserById(req, res, next) {
    try {
        const id = req.params.id;

        if (!id) {
            res.status(400).send('Please send id');
        }

        let db = await fs.readFile('db.json', 'utf-8');
        db = JSON.parse(db);

        user = db.find((data) => data.id == id);

        if (!user) {
            res.status(400).send("There is no user in this Id");
        }

        res.status(200).json(user);
    } catch (error) {
        next(error)
    }

}

async function createUser(req, res, next) {
    try {
        const { name, surname, age } = req.body;
        let db = await fs.readFile('db.json', 'utf-8');
        db = JSON.parse(db);

        console.log(db);

        if (!name || !surname || !age) {
            res.status(400).send("Please input all the areas");
        }

        const id = uuid.uuidv7();

        db.push({
            "id": id,
            "name": name,
            "surname": surname,
            "age": age
        })

        await fs.writeFile('db.json', JSON.stringify(db, null, 2), 'utf-8');

        res.status(200).json(db);
    } catch (error) {
        next(error)
    }

}

async function updateUser(req, res, next) {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).send("There are no id whice you are looking");
        }

        const db = await fs.readFile('db.json', 'utf-8');

        const data = JSON.parse(db);

        const user = data.find((i) => i.id == id);

        if (!user) {
            res.status(400).send('There is no user in this id');
        }

        user.name = req.body.name || user.name;
        user.surname = req.body.surname || user.surname;
        user.age = req.body.age || user.age;



        await fs.writeFile('db.json', JSON.stringify(data, null, 2), 'utf-8');

        res.status(200).json(user);

    } catch (error) {
        next(error)
    }
}

async function deleteUser(req, res, next) {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).send('There are no id whice you are looking for');
        }

        const db = JSON.parse(await fs.readFile('db.json', 'utf-8'));

        const newData = db.filter((i) => i.id != id);

        await fs.writeFile('db.json', JSON.stringify(newData, null, 2), 'utf-8');

        res.status(200).send(`${id} deleted succesfully`);

    } catch (error) {
        next(error)
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};