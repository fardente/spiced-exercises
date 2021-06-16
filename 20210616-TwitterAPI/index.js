const https = require("https");

const { Key, Secret } = require("./secrets.json");

const HOST = "https://api.twitter.com";
const PATH = "/oauth2/token";

function encodeCredentials() {
    console.log("KEY", Key, "SECRET", Secret);
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
                console.log("Response end", responseBody);
                callback(responseBody);
            });
            response.on("error", function (error) {
                console.log("Response error", error);
            });
        }
    );
    // console.log("Request:", request);
    request.end(requestBody);
}

function getToken() {
    console.log("encoded creds", encodeCredentials());
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
        function () {
            console.log("Callback gettoken called");
        }
    );
}

getToken();

// function getTweets(){
//     makeRequest()
// }
