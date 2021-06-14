const basicAuth = require("basic-auth");
const express = require("express");

function checkAuth(request, response, next) {
    const credentials = basicAuth(request);
    if (credentials) {
        const { name, pass } = credentials;
        if (name === "admin" && pass === "letmein") {
            next();
            return;
        }
    }
    response.setHeader(
        "WWW-Authenticate",
        'Basic realm="Provide your credentials."'
    );
    response.sendStatus(401);
}

const app = express();

app.use(checkAuth);

app.get("/", checkAuth, function (request, response) {
    console.log("requested /");
    response.send("Well hello there");
});

app.get("/public", function (request, response) {
    console.log("requested /public");
    response.send("Anyone can see this");
});

app.get("/private", checkAuth, function (request, response) {
    console.log("requested /private");
    response.send("Private site");
});

app.listen(8080);
