// Exercise 1

function changeStyle(selector) {
    var elements = document.querySelectorAll(selector);
    for (var element of elements) {
        element.style.textDecoration = "underline";
        element.style.fontWeight = "bold";
        element.style.fontStyle = "italic";
    }
}

changeStyle("h1");
changeStyle("p");

// Exercise 2

function getClassArray(className) {
    var array = [];
    var elements = document.getElementsByClassName(className);
    for (var element of elements) {
        array.push(element);
    }
    return array;
}

console.log(getClassArray("heading"));

// Exercise 3

function insertAwesome() {
    var element = document.createElement("p");
    element.style.position = "fixed";
    element.style.zIndex = "2147483647";
    element.style.left = "20px";
    element.style.top = "100px";
    element.style.fontSize = "200px";
    element.innerText = "AWESOME";
    document.body.appendChild(element);
}

insertAwesome();
