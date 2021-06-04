// EX 1
const reverseArray = (arr) => {
    if (arr.length == 1) {
        return arr;
    }
    let [a, ...b] = arr;
    return [...reverseArray(b), a];
};

console.log(reverseArray([1, 2, 3, 4, 5]));

// EX 2
