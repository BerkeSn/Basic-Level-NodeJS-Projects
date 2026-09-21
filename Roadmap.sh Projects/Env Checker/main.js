const req = process.argv.slice(2);
const arr = Object.keys(process.env);

function myFunction(req, arr) {
    if (req.length === 0) {
        console.error("error: please provide at least one environment variable name")
        process.exitCode = 1;
        return;
    }
    let boolean = true;
    const notIncluded = []
    for (x of req) {
        if (arr.includes(x)) {
            console.log(`SET: ${x}`);
        } else {
            boolean = false;
            notIncluded.push(x);
        }
    }

    if (notIncluded.length > 0) {
        let text = "";
        for (x of notIncluded) {
            text = x + "," + text;
        }
        console.error(`error: missing environment variables: ${text}`)
        process.exitCode = 1;
        return;
    }

    if (boolean == true) {
        console.log("All required environment variables are set.");
    }
}

myFunction(req, arr);