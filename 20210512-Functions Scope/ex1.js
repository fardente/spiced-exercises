function sum() {
    var total = 0;
    for (var i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}

console.log("expect 6: ", sum(1, 2, 3));
console.log("expect 30: ", sum(2, 4, 8, 16));
