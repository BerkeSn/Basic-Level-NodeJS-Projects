const fs = require('fs').promises;
const path = require('path');

const user = process.argv[2];

// https://github.com/BerkeSn

async function myFunction(reqUser) {
    try {
        if (reqUser == undefined) {
            console.error("error: please provide a GitHub username")
            process.exit(1);
        }

        const userProfile = await fetch(`https://api.github.com/users/${reqUser}`)
        // console.log(userProfile)

        if (userProfile == undefined) {
            console.error(`error: GitHub user not found: ${userProfile}.`)
            process.exit(1);
        }

        const data = await userProfile.json();
        // console.log(data);

        console.log(`Name: ${data["name"]}`);
        console.log(`Username: ${data["login"]}`);
        console.log(`Profile: ${data["url"]}`);
        console.log(`Public repos: ${data["public_repos"]}`);
        console.log(`Followers: ${data["followers"]}`);

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

myFunction(user);