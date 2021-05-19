var box = document.getElementsByTagName("div")[0];

box.addEventListener("mousedown", function (event) {
    box.style.backgroundColor = getRandomColor();
});
box.addEventListener("mouseup", function (event) {
    box.style.backgroundColor = getRandomColor();
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
