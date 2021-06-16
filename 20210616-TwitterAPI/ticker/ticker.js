$.get("./links.json", function (data) {
    var links = data;
    var container = $("#headlines");

    $.each(links, function (i, { text, url }) {
        console.log(text, url);
        container.append(
            '<a href="' + url + '" target="_blank">' + text + "</a>"
        );
    });

    links = $("a"); //document.getElementsByTagName("a");

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
            // container.append(firstLink);
            firstLink.appendTo(container);
        }
        container.css({ left: position + "px" }); //container.style.left = position + "px";
        frameId = requestAnimationFrame(update);
    }
});
