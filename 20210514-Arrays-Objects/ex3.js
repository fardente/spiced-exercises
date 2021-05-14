function getLessThanZero(array) {
    var cleanedArray = [];
    for (var i = 0; i < array.length; i++) {
        if (array[i] < 0) {
            cleanedArray.push(array[i]);
        }
    }
    return cleanedArray;
}

// Testing:

console.log(getLessThanZero([1, 2, -1, -90, 10])); //[-1, -90]
console.log(getLessThanZero([1, 2])); //[]
console.log(getLessThanZero([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]));
