(function () {
    console.log("Hamburger Menu");
    var elementsThatToggle = document.querySelectorAll(".can-toggle-nav");
    elementsThatToggle.forEach(function (element) {
        element.addEventListener("click", function () {
            document.querySelector("nav").classList.toggle("open");
            document.querySelector(".backdrop").classList.toggle("open");
            console.log("clicked on", element);
        });
    });
})();
