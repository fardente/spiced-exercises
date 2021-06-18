const express = require("express");
const path = require("path");
const { getTickerItems, getToken } = require("./index");

const newsSources = ["heiseonline", "TheOnion", "zeitonline"];

var app = express();

app.use(express.static(path.join(__dirname, "ticker")));

app.get("/links.json", (request, response) => {
    console.log("incoming request", request.url);

    getToken().then((token) => {
        Promise.all(
            newsSources.map((source) => getTickerItems(source, 3, token))
        )
            .then((tweets) => {
                response.json(tweets.flat());
            })
            .catch((error) => {
                console.log(error);
            });
        // getTickerItems("zeitonline", 8).then((tweets) => {
        //     console.log(typeof tweets);
        //     response.json(tweets);
        // });
    });
});

app.listen(8080);
