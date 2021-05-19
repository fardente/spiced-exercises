var box = document.getElementById("cursorBox");

document.addEventListener("mousemove", function (event) {
    box.style.left = event.clientX - 0.5 * box.offsetWidth + "px";
    box.style.top = event.clientY - 0.5 * box.offsetHeight + "px";
});
