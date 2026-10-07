const { URL, URLSearchParams } = require("url");

const myURL = new URL('http://localhost:8080/default.htm?year=2017&month=february');
const params = new URLSearchParams(myURL.search);
params.append("key", "value")
// params.delete("");

console.log("params ==> ", params.get("year"));
