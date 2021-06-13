var container = document.getElementById("headlines");
var links = document.getElementsByTagName("a");
var frameId;
var position = container.offsetLeft;
var SPEED = 2;
console.log(links);

addHoverEffectToLinks();

update();

function update() {
    position -= SPEED;
    // console.log(position);
    if (position <= -links[0].offsetWidth) {
        position += links[0].offsetWidth;
        console.log("before", links);
        container.appendChild(links[0]);
        console.log("after", links);
    }
    container.style.left = position + "px";
    frameId = requestAnimationFrame(update);
}

function addHoverEffectToLinks() {
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener("mouseover", function (event) {
            event.target.style.textDecoration = "underline";
            cancelAnimationFrame(frameId);
        });
        links[i].addEventListener("mouseleave", function (event) {
            event.target.style.textDecoration = "";
            frameId = requestAnimationFrame(update);
        });
    }
}
