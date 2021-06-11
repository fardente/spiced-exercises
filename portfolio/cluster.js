const cluster = require("cluster");
const os = require("os");

console.log("Starting Cluster");

cluster.setupMaster({
    exec: __dirname + "/index.js",
});

cluster.on("exit", (worker) => {
    console.log(`Worker ${worder.process.pid} died`);
    cluster.fork();
});

for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
}
