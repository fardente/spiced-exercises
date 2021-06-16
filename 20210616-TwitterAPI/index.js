const https = require("https");

const { Key, Secret } = require("./secrets.json");

const HOST = "https://api.twitter.com";
const PATH = "/oauth2/token";

function encodeCredentials() {
    // console.log("KEY", Key, "SECRET", Secret);
    return Buffer.from(`${Key}:${Secret}`).toString("base64");
}

function makeRequest(
    method,
    host,
    path,
    requestHeaders,
    requestBody,
    callback
) {
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
                responseBody = JSON.parse(responseBody);
                callback(responseBody);
            });
            response.on("error", function (error) {
                console.log("Response error", error);
            });
        }
    );
    // console.log("Request:", request);
    // console.log(requestHeaders);
    request.end(requestBody);
}

function getToken(callback) {
    // console.log("encoded creds", encodeCredentials());
    const headers = {
        Authorization: `Basic ${encodeCredentials()}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    };
    const body = "grant_type=client_credentials";
    makeRequest(
        "POST",
        "api.twitter.com",
        "/oauth2/token",
        headers,
        body,
        (responseBody) => {
            const token = responseBody["access_token"];
            callback(token);
        }
    );
}

function getTweets(screenName, count, token, callback) {
    // console.log("responsebody", responseBody, responseBody["access_token"]);
    // const screenName = "QuantaMagazine",
    const host = "api.twitter.com";
    const path = `/1.1/statuses/user_timeline.json?tweet_mode=extended&exclude_replies=true&trim_user=true&screen_name=${screenName}&count=${count}`;
    const query = "asd";
    const headers = {
        Authorization: "Bearer " + token,
    };
    makeRequest("GET", host, path, headers, null, (tweets) => {
        // console.log("gettweets ", tweets);
        callback(tweets);
    });
}

function parseTweets(tweets, callback) {
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
    callback(tweets);
}

function getTickerItems(screenName, number, callback) {
    getToken((token) => {
        getTweets(screenName, number, token, (tweets) => {
            parseTweets(tweets, (parsedTweets) => {
                // console.log("Parsed Tweeties", parsedTweets);
                callback(parsedTweets);
            });
        });
    });
}

// getTickerItems((tweets) => {
//     console.log(tweets);
// });

module.exports = getTickerItems;
