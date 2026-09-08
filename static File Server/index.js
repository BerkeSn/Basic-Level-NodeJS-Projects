const http = require('http');
const path = require('path');
const fs = require('fs');


const server = http.createServer((req, res) => {
    try {
        console.log("URL ====> ", req.url);

        const files = fs.readdirSync(__dirname + "/public", (err) => {
            console.log("files ==> ", err);
        })
        console.log("My files ==> ", files); // Current Folder

        const newUrl = req.url.slice(1);

        if (files.includes(newUrl)) {
            const index = files.indexOf(newUrl);

            if (req.method == "GET" && req.url == `/${files[index]}`) {
                let currentFolder = __dirname + "/public" + `/${files[index]}`;
                let context = fs.readFileSync(currentFolder, "utf-8", (err) => {
                    console.log("Context Error ==> " + err);
                })
                res.end(context);
            }
        } else {
            req.url = "/";

            if (req.method == "GET" && req.url == "/") {
                let context = fs.readdirSync(`${__dirname}/public`, "utf-8", (err) => {
                    console.log("__dirname error ", err)
                })
                res.end(context.join(' '));
            }
        }

    } catch (err) {
        console.log("CreateServer Error ==> ", err)
    };
});

const PORT = 8000;

server.listen(PORT, "localhost", () => {
    console.log(`Running at ${PORT}`)
})