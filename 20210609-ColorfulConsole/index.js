const http = require("http");
const chalk = require("chalk");
const querystring = require("querystring");

const html = `
<!doctype html>
<html>
<title>Colors</title>
<form method="POST">
  <input type="text" name="text">
  <select name="color">
    <option value="red">red</option>
    <option value="blue">blue</option>
    <option value="green">green</option>
    <option value="yellow">yellow</option>
    <option value="gray">gray</option>
    <option value="magenta">magenta</option>
    <option value="cyan">cyan</option>
  </select>
  <button type="submit">Go</button>
</form>
</html>`;

function buildResult(title, color) {
    const htmlResult = `
<!doctype html>
<html>
<title>${title}</title>
<a href="/" style="color:${color}">${title}</a>
</html>`;
    return htmlResult;
}

const server = http.createServer((request, response) => {
    const { method, url, headers } = request;

    request.on("error", (error) => {
        console.log("Request error", error.stack);
    });

    response.on("error", (error) => {
        console.log("Response error", error.stack);
    });

    let body = [];
    request.on("data", (chunk) => {
        body.push(chunk);
    });

    request.on("end", () => {
        body = Buffer.concat(body).toString();
        response.statusCode = 404;

        if (method == "GET") {
            console.log("got GET");
            handleGet();
        } else if (method == "POST") {
            console.log("got POST");
            handlePOST();
        } else {
            response.statusCode = 405;
            response.end();
        }

        function handleGet() {
            console.log("Building response for GET");
            response.statusCode = 200;
            response.write(html);
            response.end();
        }

        function handlePOST() {
            console.log("Building POST response");
            const query = querystring.parse(body);
            console.log("Input was: ", chalk[query.color](query.text));
            response.statusCode = 200;
            response.write(buildResult(query.text, query.color));
            response.end();
        }
    });
});

server.listen(8081);
