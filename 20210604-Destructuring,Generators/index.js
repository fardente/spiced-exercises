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
const concatArrays = (arr, arr2) => {
    return [...arr, ...arr2];
};

console.log(concatArrays([1, 2, 3, 4], [5, 6, 7, 8]));

// EX 3

function logInfo({ name, country, population: numPeople }) {
    console.log(
        `${name} is in ${country} and has ${numPeople} inhabitants in it.`
    );
}

logInfo({ name: "Hamburg", country: "Germany", population: "1,8 million" });

// EX 4

function getNameAndCountry(city) {
    return [city.name, city.country];
}

function getRelocatedCity(city1, city2) {
    if (!city2) {
        var city2 = { country: "Germany" };
    }
    var country = getNameAndCountry(city2)[1];
    return {
        name: city1.name,
        country,
    };
}

// let getNameAndCountry = ({ name, country }) => [name, country];

// let getRelocatedCity = (city1, city2 = { country: "Germany" }) => {
//     console.log("city2 ", getNameAndCountry(city2));
//     let [, country] = getNameAndCountry(city2);
//     console.log({ ...city1 });
//     return {
//         ...city1,
//         country,
//     };
// };

var hamburg = { name: "Hamburg", country: "Germany" };
var london = { name: "London", country: "England" };

console.log(getRelocatedCity(london, hamburg));

// Generators:

// Fizzbuzz

function* fizzbuzz() {
    for (var i = 1; i <= 100; i++) {
        if (i % 3 == 0) {
            if (i % 5 == 0) {
                yield "fizzbuzz";
            } else {
                yield "fizz";
            }
        } else {
            if (i % 5 == 0) {
                yield "buzz";
            } else {
                console.log(i);
            }
        }
    }
}

for (var i of fizzbuzz()) {
    console.log(i);
}

// EX 2:

function* reverseArrayGenerator(arr) {
    var tempArr = arr.slice();
    for (var i of arr) {
        yield tempArr.pop();
    }
}

var arry = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var g = reverseArrayGenerator(arry);

for (var i of g) {
    console.log(i);
}
