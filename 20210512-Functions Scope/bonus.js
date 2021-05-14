function getTotaler() {
    var sum = 0;
    return function (num) {
        sum += num;
        return sum;
    };
}

var totaler = getTotaler();
console.log(totaler(1)); //1
console.log(totaler(2)); //3
console.log(totaler(5)); //8
console.log(totaler(2)); //10
console.log(totaler(11)); //21
console.log(totaler(-1)); //20
