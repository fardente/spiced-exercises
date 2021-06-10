const http = require("http");
const fs = require("fs");
const path = require("path");

const projectDir = "/projects";

const contentTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "application/json",
    ".gif": "image/gif",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".svg": "image/svg+xml",
};

const server = http.createServer((request, response) => {
    console.log("Server running");

    // Error handling
    request.on("error", (error) => {
        console.log("Request error", error);
    });
    response.on("error", (error) => {
        console.log("Response error", error);
    });

    // Handle request and URL
    const { url, method } = request;
    const filePath = path.join(__dirname, projectDir, url);
    const normalizedPath = path.normalize(filePath);
    console.log(url, method, filePath, normalizedPath);

    if (method != "GET") {
        response.statusCode = 405;
        return response.end();
    }

    if (!normalizedPath.startsWith(__dirname + projectDir)) {
        response.statusCode = 403;
        return response.end();
    }

    //Check for file / folder
    fs.stat(normalizedPath, (error, stats) => {
        if (error) {
            console.log("File not found error");
            response.statusCode = 404;
            return response.end();
        }

        if (stats.isDirectory()) {
            if (url.endsWith("/")) {
                console.log("path ends with /");
                fs.stat(normalizedPath + "index.html", (error, stats) => {
                    if (error) {
                        console.log("No index.html at given path");
                        response.statusCode = 404;
                        return response.end();
                    }
                    console.log("index.html exists");
                    serveFile(normalizedPath + "index.html");
                    return;
                });
            } else {
                console.log("redirecting");
                response.statusCode = 302;
                response.setHeader("Location", url + "/");
                return response.end();
            }
        } else {
            serveFile(normalizedPath);
        }
    });

    function getContentType(filePath) {
        console.log(path.extname(filePath));
        return contentTypes[path.extname(filePath)];
    }

    function serveFile(filePath) {
        const readableStream = fs.createReadStream(filePath);
        readableStream.on("error", (error) => {
            console.log("error on readableStream ", error);
        });
        const contentType = getContentType(filePath);
        console.log("contentType", contentType);
        response.setHeader("Content-type", contentType);
        return readableStream.pipe(response);
    }
});

server.listen(8080);
