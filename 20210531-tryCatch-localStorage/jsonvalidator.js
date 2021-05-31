var $textfield = $("#textfield");
var $result = $(".result");
var $btnValidate = $("#validate");
var $btnReset = $("#reset");

$btnValidate.on("click", validate);

$btnReset.on("click", function () {
    $textfield.val("");
    $result.text("");
    $textfield.removeClass("valid");
    $textfield.removeClass("error");
});

function validate() {
    $textfield.removeClass("valid");
    $textfield.removeClass("error");
    try {
        JSON.parse($textfield.val());
        console.log("valid");
        $textfield.addClass("valid");
        $result.text("JSON is valid.");
    } catch (error) {
        console.log(error);
        $textfield.addClass("error");
        $result.text("JSON is invalid. " + error.message);
    }
}
