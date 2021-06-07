const { EventEmitter } = require("events");

function Countdown(num) {
    this.countdown(num);
}

Countdown.prototype = new EventEmitter();

Countdown.prototype.countdown = function (num) {
    if (num >= 0) {
        setTimeout(() => {
            this.emit("secondElapsed", num);
            // console.log(this.num);
            num--;
            this.countdown(num);
        }, 1000);
    }
};

module.exports = Countdown;
