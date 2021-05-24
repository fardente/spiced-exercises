//get carousel by id
// get kitties carousel.querysel...
// var kittyIndex = 0
// function moveKitties(){
//kitties[kittyIndex].classlist.remove(onscreen)
// kitties[kittyIndex].classList.add('exit');
// kitties[kittyIndex+1].classList.add('onscreen')
//}
// listen for end of transition
//carousel.addeventlistener('transitionend', function(event){
//  event.target -> toggle class
// if (!event.target.classlist.contains("exit")) return
// event.target.classlist.remove("exit")
// kittyIndex++;
//moveKitties();
//})

var carousel = document.getElementById("carousel");
// var kitties = carousel.querySelectorAll(".kitty");
var kitties = carousel.getElementsByClassName("kitty");
var dots = carousel.getElementsByClassName("dot");

var kittyIndex = 0;
var nextKittyIndex = 1;

var delay = 500;

function moveKitties() {
    console.log("KI", kittyIndex, "nKI", nextKittyIndex);
    exit(kitties[kittyIndex]);
    moveOnScreen(kitties[nextKittyIndex]);
    updateDots();

    if (nextKittyIndex >= kitties.length - 1) {
        kittyIndex = nextKittyIndex;
        nextKittyIndex = 0;
    } else {
        kittyIndex = nextKittyIndex;
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
    if (!event.target.classList.contains("exit")) {
        // early return
        return;
    }
    // else, put it back to the right hidden pile
    event.target.classList.remove("exit");

    // slide to the next kitty after {delay} ms
    setTimeout(function () {
        moveKitties();
    }, delay);
});

function dotClickHandler() {}

setTimeout(moveKitties, delay);

// toggle("current", kittyIndex === index);
