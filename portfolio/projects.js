const fs = require("fs");

function listDirHTML(dir) {
    const folderContents = fs.readdirSync(dir, { withFileTypes: true });
    let output = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Projects</title>
    </head>
    <body>
    <ul>
    `;
    folderContents.forEach((element, index) => {
        output += makeHTML(element);
    });
    return output + "</ul>\n</body></html>";
}

function makeHTML(element) {
    const html = `<li><a href=${element.name}>${element.name}</a></li>\n`;
    return html;
}

module.exports = listDirHTML;
