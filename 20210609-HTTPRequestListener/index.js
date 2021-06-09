const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((request, response) => {
    console.log("incoming request");

    let { method, url, headers } = request;
    logRequest(method, url, headers["user-agent"]);
    console.log(
        `Method: ${method}\nURL: ${url}\nHeader: ${JSON.stringify(
            headers,
            null,
            4
        )}\n`
    );

    request.on("error", (error) => {
        console.log("Request error", error.stack);
    });

    response.on("error", (error) => {
        console.log("Response error", error.stack);
    });

    var body = "";
    request
        .on("data", function (chunk) {
            body += chunk;
        })
        .on("end", function () {
            switch (method) {
                case "HEAD":
                    response.statusCode = 200;
                    response.setHeader("Content-type", "text/html");
                    break;
                case "GET":
                    response.statusCode = 200;
                    if (url == "/requests.txt") {
                        response.setHeader("Content-type", "text/plain");
                        console.log("Someone is trying to get reguests.txt");
                        var readableStream = fs.createReadStream(
                            path.join(__dirname, "requests.txt")
                        );

                        readableStream.on("error", (error) => {
                            console.log("error on readableStream", error);
                        });
                        readableStream.pipe(response);
                    } else {
                        response.setHeader("Content-type", "text/html");
                        let body = `<!doctype html>
                        <html>
                        <title>Hello World!</title>
                        <p>Hello World!</p>
                        </html>`;
                        response.write(body);
                        response.end();
                    }
                    break;
                case "POST":
                    console.log(request.body);
                    response.statusCode = 302;
                    response.setHeader("Location", "/");
                    break;
                default:
                    response.statusCode = 405;
            }
        });
});

server.listen(8080);

function logRequest(method, url, userAgent) {
    const filePath = path.join(__dirname, "requests.txt");
    const date = new Date();
    let text = `${date}\t${method}\t${url}\t${userAgent}\n`;

    fs.appendFile(filePath, text, (error) => {
        if (error) {
            console.log(`Error writing to file ${filePath}`);
        }
    });
}
