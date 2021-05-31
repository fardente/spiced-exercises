function translateNumberToGerman() {
    var germanNumbers = [
        "eins",
        "zwei",
        "drei",
        "vier",
        "fünf",
        "sechs",
        "sieben",
        "acht",
        "neun",
        "zehn",
    ];
    var answer;
    try {
        answer = askForNumber();
        return germanNumbers[answer - 1];
    } catch (error) {
        console.log(error.message);
        console.log(translateNumberToGerman());
    }
}

function askForNumber() {
    var num = prompt("Please enter a number between 1 and 10");
    if (num >= 1 && num <= 10 && num == parseInt(num)) {
        return num;
    }
    throw new Error("Bad number");
}

console.log(translateNumberToGerman());
