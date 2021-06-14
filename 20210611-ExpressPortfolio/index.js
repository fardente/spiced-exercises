var express = require("express");
var cookieParser = require("cookie-parser");
const listDirHTML = require("./projects");
const { response } = require("express");
const basicAuth = require("basic-auth");

var app = express();

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use(checkAuth);
app.use(require("cookie-parser")());

app.get("/cookie", function (request, response) {
    console.log("went to /cookie, wanted ", request.url);
    console.log("cookies are ", request.cookies);
    if (request.cookies.returning) {
        response.send("Welcome back!");
        return;
    } else {
        const cookieHTML = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Projects</title>
    </head>
    <body>
        <form action="/cookie" method="POST">
        <input type="checkbox" name="accepted">
        <input type="submit" value="Accept Cookies">
    </body>
    </html>
    `;
        response.send(cookieHTML);
    }
});

app.get("/", function (request, response) {
    response.send(listDirHTML(__dirname + "/projects"));
});

app.get("/stickman", checkAuth, function (request, response) {
    response.send(listDirHTML(__dirname + "/projects"));
});

app.post("/cookie", function (request, response) {
    console.log(
        "submitted something via post",
        request.cookies,
        request.body.accepted
    );
    if (request.body.accepted) {
        response.cookie("returning", true);
        response.redirect(request.cookies.url);
    } else {
        response.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Cookies are needed!</title>
    </head>
    <body>
        <h1>No cookies = no access!!</h1>
    </body>
    </html>
        `);
    }
});

function checkCookies(request, response, next) {
    const isUserLogged = request.cookies.returning;
    console.log(isUserLogged, "logged");
    if (isUserLogged) {
        console.log("logged in");
        next();
        return;
    }
    response.cookie("url", request.url);
    console.log("redirecting");
    response.redirect("/cookie");
}

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

app.use(checkCookies);
app.use(express.static(__dirname + "/projects"));
app.listen(8080);
