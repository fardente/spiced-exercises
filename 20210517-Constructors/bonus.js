function Countdown(seconds) {
    this.seconds = seconds;
}

var start = function() {
    if (this.seconds < 0) {
        return 0;
    }
    console.log(this.seconds);
    this.seconds -= 1;
    setTimeout(this.start.bind(this), 1000, this.seconds);
}

Countdown.prototype.start = start;

var countdown = new Countdown(5);
countdown.start();