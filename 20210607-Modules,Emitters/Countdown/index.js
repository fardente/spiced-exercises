const Countdown = require("./countdown");

const countdown = new Countdown(10);

countdown.on("secondElapsed", function (timeLeft) {
    if (timeLeft > 0) {
        console.log(timeLeft);
    } else {
        console.log("lift off!");
    }
});
