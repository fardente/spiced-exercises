const express = require("express");
const path = require("path");
const getTickerItems = require("./index");

var app = express();

app.use(express.static(path.join(__dirname, "ticker")));

app.get("/links.json", (request, response) => {
    console.log("incoming request", request.url);
    getTickerItems("heiseonline", 8, (tweets) => {
        console.log(tweets.length, tweets);
        response.json(tweets);
    });
});

app.listen(8080);
