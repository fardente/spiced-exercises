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
                const sortedTweets = tweets.flat().sort((a, b) => {
                    if (new Date(a["createdAt"]) < new Date(b["createdAt"])) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
                console.log(sortedTweets);
                response.json(sortedTweets);
            })
            .catch((error) => {
                console.log(error);
            });
    });
});

app.listen(8080);
