var $pane = $(".pane");
var $slider = $pane.find(".slider");
var $after = $pane.find(".after");

var paneWidth = $pane.width();

var dragging = false;

function getPosition(event, element) {
    return event.clientX - element.offsetLeft;
}

$pane.on("mousemove", function (event) {
    if (dragging) {
        var xpos = getPosition(event, this);
        if (xpos > -5 && xpos < this.clientWidth + 5) {
            $slider.css({ left: -5 + xpos + "px" });
            $after.css({ width: xpos + "px" });
        }
    }
});

$slider.on("mousedown", function (event) {
    dragging = true;
});

$pane.on("mouseup", function (event) {
    dragging = false;
});

$pane.on("mouseenter", function (event) {
    dragging = false;
});
