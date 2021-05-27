var countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Côte D'Ivoire",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Democratic People's Republic of Korea",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People’s Democratic Republic",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Republic of Korea",
    "Republic of Moldova",
    "Romania",
    "Russian Federation",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Tajikistan",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United Republic of Tanzania",
    "United States of America",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Viet Nam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
];

var $inputWrapper = $("#inputWrapper");

var $searchBox = $("#searchBox");

var $resultBox = $("#resultBox");

var countryList = countries;

function searchCountryList(input) {
    var results = [];
    // console.log(input);
    for (var i = 0; i < countryList.length; i++) {
        //startswith = new way. Old way is .indexOf(input) ! NOTE !
        if (results.length == 4) {
            break;
        } else if (
            countryList[i].toLowerCase().startsWith(input.toLowerCase())
        ) {
            results.push(countryList[i]);
        }
    }
    return results;
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

function checkInput() {
    var value = $searchBox.val();
    if (value == "") {
        hideResults();
        return;
    }

    var results = searchCountryList(value);

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

$searchBox.on("input", function (event) {
    //input event fires everytime the value of the textfield changes
    checkInput();
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
    checkInput();
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
