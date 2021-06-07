const urlAnalyse = require("./urlAnalyse");

if (process.argv.length > 2) {
    urlAnalyse(process.argv[2]);
} else {
    console.log("Please provide a URL");
}
