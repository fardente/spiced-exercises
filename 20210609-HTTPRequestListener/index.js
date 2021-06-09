const http = require("http");

const server = http.createServer((request, response) => {
    console.log("incoming request");

    let { method, url, headers } = request;
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
            console.log(body); //logs the entire request body
            switch (method) {
                case "HEAD":
                    response.statusCode = 200;
                    break;
                case "GET":
                    let body = `<!doctype html>
                        <html>
                        <title>Hello World!</title>
                        <p>Hello World!</p>
                        </html>`;
                    response.statusCode = 200;
                    response.setHeader("Content-type", "text/html");
                    response.write(body);
                    break;
                case "POST":
                    console.log(request.body);
                    response.statusCode = 302;
                    response.setHeader("Location", "/");
                    break;
                default:
                    response.statusCode = 405;
            }

            response.end();
        });
});

server.listen(8080);
