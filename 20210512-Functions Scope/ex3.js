// Write a function that expects a number as an argument.
// If the value that is passed in is less than 0, equal to 0, or not a number, the function should return the string 'ERROR'.
// If the number that is passed in is greater than or equal to 1000000 it should simply return the number.
// Otherwise it should multiply the number by 10 however many times it takes to get a number that is greater than or equal to 1000000 and return that.

function million(num) {
    if (num < 1 || isNaN(num)) {
        return "ERROR";
    } else if (num >= 1000000) {
        return num;
    }

    while (num < 1000000) {
        num *= 10;
    }
    return num;
}

console.log("Expect Error - negative number: ", million(-2));
console.log("Expect Error - zero: ", million(0));
console.log("Expect Error - NaN: ", million("asd"));
console.log("small positive number: ", million(2));
console.log("10.000: ", million(10000));
console.log("500 ", million(500));
console.log("large number: ", million(1200000));
