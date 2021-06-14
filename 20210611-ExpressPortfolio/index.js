var express = require("express");
const listDirHTML = require("./projects");
const basicAuth = require("basic-auth");
const path = require("path");

var app = express();

app.use(
    express.urlencoded({
        extended: false,
    })
);

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
app.use(checkCookies);
function checkCookies(request, response, next) {
    const isUserLogged = request.cookies.returning;
    console.log(isUserLogged, "logged");
    if (isUserLogged) {
        console.log("logged in");
        next();
        return;
    } else {
        response.cookie("url", request.url);
        console.log("redirecting");
        response.redirect("/cookie");
    }
}

app.get("/", function (request, response) {
    console.log("went to /");
    response.send(listDirHTML(__dirname + "/projects"));
});

function checkAuth(request, response, next) {
    console.log("checking auth");
    const credentials = basicAuth(request);
    if (credentials) {
        const { name, pass } = credentials;
        if (name === "admin2" && pass === "letmein") {
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

app.get("/stickman", checkAuth, function (request, response) {
    response.sendFile(
        path.join(__dirname, "/projects", "/stickman", "/index.html")
    );
});

app.use(express.static(path.join(__dirname, "/projects")));

app.listen(8080);
