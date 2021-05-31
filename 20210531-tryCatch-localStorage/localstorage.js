var $textfield = $("#textfield");

$textfield.val(localStorage.getItem("input"));

$textfield.on("input", function () {
    localStorage.setItem("input", $textfield.val());
});
