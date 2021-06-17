const { rejects } = require("assert");
const https = require("https");

const { Key, Secret } = require("./secrets.json");

const HOST = "https://api.twitter.com";
const PATH = "/oauth2/token";

function encodeCredentials() {
    // console.log("KEY", Key, "SECRET", Secret);
    return Buffer.from(`${Key}:${Secret}`).toString("base64");
}

function makeRequest(method, host, path, requestHeaders, requestBody) {
    return new Promise((resolve, reject) => {
        const request = https.request(
            {
                method,
                host,
                path,
                headers: requestHeaders,
            },
            function (response) {
                let responseBody = "";
                response.on("data", function (chunk) {
                    responseBody += chunk;
                });
                response.on("end", function () {
                    // console.log("Response end", responseBody);
                    try {
                        responseBody = JSON.parse(responseBody);
                    } catch (error) {
                        reject(error);
                    }
                    resolve(responseBody);
                });
                response.on("error", function (error) {
                    console.log("Response error", error);
                    reject(error);
                });
            }
        );
        // console.log("Request:", request);
        // console.log(requestHeaders);
        request.end(requestBody);
    });
}

function getToken() {
    return new Promise((resolve, reject) => {
        // console.log("encoded creds", encodeCredentials());
        const headers = {
            Authorization: `Basic ${encodeCredentials()}`,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        };
        const body = "grant_type=client_credentials";
        makeRequest("POST", "api.twitter.com", "/oauth2/token", headers, body)
            .then((responseBody) => {
                const token = responseBody["access_token"];
                resolve(token);
            })
            .catch((error) => {
                console.log("error getting token", error);
            });
    });
}

function getTweets(screenName, count, token) {
    return new Promise((resolve, reject) => {
        // console.log("responsebody", responseBody, responseBody["access_token"]);
        // const screenName = "QuantaMagazine",
        const host = "api.twitter.com";
        const path = `/1.1/statuses/user_timeline.json?tweet_mode=extended&exclude_replies=true&trim_user=true&screen_name=${screenName}&count=${count}`;
        const query = "asd";
        const headers = {
            Authorization: "Bearer " + token,
        };
        makeRequest("GET", host, path, headers)
            .then((tweets) => {
                // console.log("gettweets ", tweets);
                resolve(tweets);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function parseTweets(tweets) {
    tweets = tweets
        .filter((tweet) => tweet.entities.urls.length)
        .map((tweet) => {
            const text = tweet.full_text.split("http")[0].trim();
            console.log(tweet);
            const url = tweet.entities.urls[0].url;
            // console.log(url);
            return {
                text,
                url,
            };
        });
    return tweets;
}

function getTickerItems(screenName, count) {
    getToken().then((token) => {
        console.log(token);
        getTweets(screenName, count, token).then((tweets) => {
            console.log(tweets);
            return tweets;
        });
    });
}

// getTickerItems((tweets) => {
//     console.log(tweets);
// });

module.exports = getTickerItems;
