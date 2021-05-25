var carousel = document.getElementById("carousel");
// var kitties = carousel.querySelectorAll(".kitty");
var kitties = carousel.getElementsByClassName("kitty");
var dots = carousel.querySelectorAll(".dot");

var kittyIndex = 0;
var nextKittyIndex = 1;

var delay = 500;

var timer;
var animating;

function moveKitties() {
    console.log("KI", kittyIndex, "nKI", nextKittyIndex);
    exit(kitties[kittyIndex]);
    moveOnScreen(kitties[nextKittyIndex]);
    updateDots();
    animating = true;
    kittyIndex = nextKittyIndex;

    if (nextKittyIndex >= kitties.length - 1) {
        nextKittyIndex = 0;
    } else {
        nextKittyIndex++;
    }
}

function moveOnScreen(kitty) {
    kitty.classList.remove("exit");
    kitty.classList.add("onscreen");
}

function exit(kitty) {
    kitty.classList.remove("onscreen");
    kitty.classList.add("exit");
}

function updateDots() {
    toggleDot(dots[kittyIndex]);
    toggleDot(dots[nextKittyIndex]);
}

function toggleDot(dot) {
    dot.classList.toggle("current");
}

carousel.addEventListener("transitionend", function (event) {
    // if the kitty entered, do nothing
    console.log("transition ended", timer);
    if (!event.target.classList.contains("exit")) {
        // early return
        return;
    }
    // else, put it back to the right hidden pile
    event.target.classList.remove("exit");
    animating = false;
    // slide to the next kitty after {delay} ms
    timer = setTimeout(function () {
        moveKitties();
    }, delay);
});

dots.forEach(function (element, index) {
    console.log(element, index);
    element.addEventListener("click", dotClickHandler(index));
});

function dotClickHandler(idx) {
    return function () {
        clearTimeout(timer);
        nextKittyIndex = idx;
        if (!animating) {
            timer = setTimeout(function () {
                moveKitties();
            }, delay);
        }
    };
}

setTimeout(moveKitties, delay);
