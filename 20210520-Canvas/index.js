(function () {
    var cnv = document.querySelector("#canvas");

    var ctx = cnv.getContext("2d");

    ctx.lineWidth = 3;
    ctx.strokeStyle = "orange";
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(400, 200, 50, 0, 2 * Math.PI); // Head
    ctx.fillRect(380, 180, 10, 10); // left eye
    ctx.fillRect(410, 180, 10, 10); // right eye
    ctx.moveTo(425, 200);
    ctx.arc(400, 200, 25, 0, Math.PI); // Mouth
    ctx.moveTo(400, 250);
    ctx.lineTo(400, 500); // Body
    ctx.moveTo(400, 350);
    ctx.lineTo(300, 250); // Left arm
    ctx.moveTo(400, 350);
    ctx.lineTo(500, 250); // Right arm
    ctx.moveTo(400, 500);
    ctx.lineTo(300, 600); // Left leg
    ctx.moveTo(400, 500);
    ctx.lineTo(500, 600); // Right leg
    ctx.stroke();

    // ctx.drawImage(document.querySelector("canvas"));
    document.addEventListener("dblclick", function () {
        ctx.clearRect(0, 0, 400, 400);
    });
})();
