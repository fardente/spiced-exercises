function testUpper(char) {
    if (char.toUpperCase() === char) {
        return true;
    }
    return false;
}

function invertCase(word) {
    var inverted = [];
    for (var char of word) {
        if (testUpper(char)) {
            inverted.push(char.toLowerCase());
        } else {
            inverted.push(char.toUpperCase());
        }        
    }
    return inverted.join("");
}

// TESTING

console.log(invertCase("abcDEGghi123"));