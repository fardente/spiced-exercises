var container = $("#headlines"); //document.getElementById("headlines");
var links = $("a"); //document.getElementsByTagName("a");

var frameId;
var position = container.position().left;
var SPEED = 2;

links.on("mouseover", function (event) {
    $(this).addClass("stop");
    //event.target.style.textDecoration = "underline";
    cancelAnimationFrame(frameId);
});

links.on("mouseleave", function (event) {
    $(this).removeClass("stop");
    frameId = requestAnimationFrame(update);
});

update();

function update() {
    position -= SPEED;
    var firstLink = container.find("a").eq(0);
    var firstLinkWidth = +firstLink.css("width").slice(0, -2);
    if (position <= -firstLinkWidth) {
        position += firstLinkWidth;
        container.append(firstLink);
    }
    container.css({ left: position + "px" }); //container.style.left = position + "px";
    frameId = requestAnimationFrame(update);
}
