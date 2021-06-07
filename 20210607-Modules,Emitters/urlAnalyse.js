const url = require("url");
const querystring = require("querystring");

function urlAnalyse(inputUrl) {
    inputUrl = url.parse(inputUrl);

    console.log("The protocol is " + inputUrl.protocol);
    console.log("The host is " + inputUrl.host);
    console.log("The hostname is " + inputUrl.hostname);
    console.log("The port is " + inputUrl.port);
    console.log("The pathname is " + inputUrl.pathname);
    console.log("The query is " + inputUrl.query);
    // console.log(querystring.parse(inputUrl.query));
    let query = querystring.parse(inputUrl.query);
    for (var param of Object.keys(query)) {
        console.log(`The value of the parameter ${param} is ${query[param]}`);
    }
}

module.exports = urlAnalyse;
