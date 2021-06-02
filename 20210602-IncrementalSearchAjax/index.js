var $inputWrapper = $("#inputWrapper");
var $searchBox = $("#searchBox");
var $resultBox = $("#resultBox");

var API_URL = "https://spicedworld.herokuapp.com/";

var THROTTLE_INTERVAL = 200;
var timerID;

function getSuggestions() {
    var input = $searchBox.val();
    if (input == "") {
        hideResults();
        return;
    }
    $.ajax({
        url: API_URL,
        data: {
            q: input,
        },
        success: function (results) {
            console.log("data", results);
            var currentInput = $searchBox.val();
            if (input == currentInput) {
                checkInput(results);
            }
        },
    });
}

function checkInput(results) {
    var value = $searchBox.val();

    if (results.length == 0) {
        var html = "<div class='noResults'>No results!</div>";
        $resultBox.html(html);
    } else {
        var html = "";
        for (var i = 0; i < results.length; i++) {
            html += '<div class="result">';
            html += results[i];
            html += "</div>";
        }
        $resultBox.html(html);
    }
    showResults();
}

function showResults() {
    $("#resultBox").show();
}

function hideResults() {
    $("#resultBox").hide();
}

function checkHighlight() {
    return $(".highlight").length > 0;
}

$searchBox.on("input", function () {
    if (timerID) {
        clearTimeout(timerID);
    }
    timerID = setTimeout(getSuggestions, THROTTLE_INTERVAL);
});

// In JQUERY possible to use event delegeation by using 2nd parameter ! NOTE!
$inputWrapper.on("mouseover", ".result", function (event) {
    // console.log(event.target.innerText);
    // console.log($(event.target).text());
    $(".highlight").removeClass("highlight");
    $(event.target).addClass("highlight");
});

$inputWrapper.on("mousedown", ".result", function (event) {
    // event.preventDefault();
    $searchBox.val($(event.target).text());
    // hideResults();
    // console.log("mousedown");
});

$inputWrapper.on("mousedown", ".noResults", function (event) {
    event.preventDefault();
    $searchBox.val("");
    hideResults();
    console.log("mousedown");
});

// $inputWrapper.on("mouseup", ".result", function (event) {
//     $searchBox.focus();
//     console.log("mouseup");
// });

$searchBox.on("focus", function (event) {
    // checkInput();
    // getSuggestions();
    if ($searchBox.val() != "") {
        showResults();
    }
    console.log("focuss");
});

$searchBox.on("blur", function (event) {
    // console.log("bluring");
    hideResults();
});

$searchBox.on("keydown", function (event) {
    // console.log("keystroke:", event.key);
    switch (event.key) {
        case "ArrowUp":
            if (checkHighlight()) {
                var $prev = $(".highlight").prev();
                if ($prev.length > 0) {
                    $(".highlight").removeClass("highlight");
                    $prev.addClass("highlight");
                }
            } else {
                $(".result").last().addClass("highlight");
            }
            break;
        case "ArrowDown":
            if (checkHighlight()) {
                var $next = $(".highlight").next();
                if ($next.length > 0) {
                    $(".highlight").removeClass("highlight");
                    $next.addClass("highlight");
                }
            } else {
                $(".result").first().addClass("highlight");
            }
            break;
        case "Enter":
            $searchBox.val($(".highlight").text());
            hideResults();
            break;
        case "ArrowLeft":
            break;
    }
});

//Notes from encounter:
//focus vs. blur

//events: input, mousevents: enter/over and mousedown, keydown:uparrow, downarrow, returnkey, focus-event and blur-event

//state: empty - invisible

//state: no result

//state: show results max. 4
//find strings startswith input.value
//for top4 results - create resultsdivs in JS - attach to searchBox
//on mouseover-hover-highlight, bgcolor, color, mousecursor -> onclick.value into textfield
//on keydown: up/down/-> move highlight up/down - return.value into textfield
//KEYSTROKES
//Jquery $('.highlight').index(); gives index of element in parent container
//Jquery $('.highlight').next(); gets next sibling to add class to (.prev() also exists)

//Jquery: trigger events. field.trigger('input') -> useful for focus event
// alternative for focus: use same eventhandler for focus as for input. field.on('input focus')
