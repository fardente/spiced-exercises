const fs = require("fs");
const path = require("path");

const folder = path.join(__dirname, "files");

function logSizes(dirPath) {
    fs.readdir(dirPath, { withFileTypes: true }, (error, files) => {
        if (error) {
            console.log("error", error);
            return;
        }
        files.forEach((file) => {
            let filePath = path.join(dirPath, file.name);
            if (file.isDirectory()) {
                logSizes(filePath);
            } else {
                fs.stat(filePath, (err, stats) => {
                    console.log(filePath, ": ", stats.size);
                });
            }
        });
    });
}

logSizes(folder);
