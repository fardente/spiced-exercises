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
                return;
            }
            fs.stat(filePath, (error, stats) => {
                if (error) {
                    console.log("Stats error", error);
                }
                console.log(filePath, ": ", stats.size);
            });
        });
    });
}

logSizes(folder);

function mapSizes(dirPath) {
    let tree = {};
    let files = fs.readdirSync(dirPath, { withFileTypes: true });

    files.forEach((file) => {
        let filePath = path.join(dirPath, file.name);
        if (file.isDirectory()) {
            tree[file.name] = mapSizes(filePath);
            return;
        }
        let { size } = fs.statSync(filePath);
        tree[file.name] = size;
    });
    return tree;
}

const folderMap = mapSizes(folder);
const folderMapStringy = JSON.stringify(folderMap, null, 4);

fs.writeFileSync("files.json", folderMapStringy);
