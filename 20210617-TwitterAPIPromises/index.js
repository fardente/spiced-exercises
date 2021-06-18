const https = require("https");

const { Key, Secret } = require("./secrets.json");

const HOST = "https://api.twitter.com";
const PATH = "/oauth2/token";

function encodeCredentials() {
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
        request.end(requestBody);
    });
}

function getToken() {
    const headers = {
        Authorization: `Basic ${encodeCredentials()}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    };
    const body = "grant_type=client_credentials";
    return makeRequest(
        "POST",
        "api.twitter.com",
        "/oauth2/token",
        headers,
        body
    ).then((token) => {
        return token["access_token"];
    });
}

function getTweets(screenName, count, token) {
    const host = "api.twitter.com";
    const path = `/1.1/statuses/user_timeline.json?tweet_mode=extended&exclude_replies=true&trim_user=true&screen_name=${screenName}&count=${count}`;
    const headers = {
        Authorization: "Bearer " + token,
    };
    return makeRequest("GET", host, path, headers);
}

function parseTweets(tweets, screenName) {
    tweets = tweets
        .filter((tweet) => tweet.entities.urls.length)
        .map((tweet) => {
            const text = tweet.full_text.split("http")[0].trim();
            const url = tweet.entities.urls[0].url;
            return {
                text: `${text} (${screenName})`,
                url,
            };
        });
    return tweets;
}

function getTickerItems(screenName, count, token) {
    return getTweets(screenName, count, token).then((tweets) => {
        return parseTweets(tweets, screenName);
    });
}

module.exports = { getTickerItems, getToken };
