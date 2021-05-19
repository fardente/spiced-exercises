var outer = document.querySelector("main");
var inner = document.querySelector("div");

outer.addEventListener("click", function (event) {
    outer.style.backgroundColor = getRandomColor();
});

inner.addEventListener("click", function (event) {
    event.stopPropagation();
    inner.style.backgroundColor = getRandomColor();
});

function getRandomColor() {
    var r = getRandomNumber();
    var g = getRandomNumber();
    var b = getRandomNumber();
    return "rgb(" + r + "," + g + "," + b + ")";
}

function getRandomNumber() {
    return Math.floor(Math.random() * 255);
}
