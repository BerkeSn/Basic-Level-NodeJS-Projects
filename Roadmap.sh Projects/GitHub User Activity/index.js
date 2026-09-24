const argv = process.argv[2];

async function githubUser(username) {
    try {
        if (username == undefined) {
            console.error("Please input username !!!");
            process.exit(1);
        }

        const githubAPI = await fetch(`https://api.github.com/users/${username}/events`);

        const api = await githubAPI.json();

        if (api["message"] == "Not Found") {
            console.error("There are no one in this username");
            process.exit(1);
        }

        // console.log(api);

        let pushCounter = 0;

        api.forEach((i) => {
            if (i["type"] == "PushEvent") {
                pushCounter++;
            }
        })

        if (api.length > 0) {
            console.log(`Pushed ${pushCounter} commits to ${api[0]["repo"]["name"]}`)
            console.log(`Opened a new issue in ${api[0]["repo"]["name"]}`)
            console.log(`Starred ${api[0]["repo"]["name"]}`)
        } else {
            console.log(`There are no repo`)
            console.log(`Opened nothing`)
            console.log(`Starred nothing`)
        }

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

githubUser(argv);