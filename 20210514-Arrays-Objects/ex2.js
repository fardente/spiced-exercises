function copy_reverse(array) {
    return array.slice().reverse();
}

// Testing:

var testArray = ["a", "b", "c", "d"];

console.log("Reversed Array: ", copy_reverse(testArray));
console.log("Original Array unchanged?", testArray);
