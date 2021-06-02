console.log("Spotify search!");

// define your constants
var API_URL = "https://spicedify.herokuapp.com/spotify";

// cache your DOM selectors
var $form = $("form");
var $input = $form.find("input");
var $type = $form.find("select");
var $resultList = $(".result-list");
var $resultTitle = $(".result-title");
var $moreButton = $(".load-more-button");

// define your global variables
var nextURL = null;
var q = null;
var type = null;

// define your reusable functions
function extractInfoFromData(data) {
    // if data contains the artists key, return data.artists
    // else, return data.albums
    if (data.artists) {
        return data.artists;
    }
    return data.albums;
}

// you need this to "fix" the spotify response
// because it still has its own URL references
function replaceURLName(spotifyURL) {
    return spotifyURL.replace("https://api.spotify.com/v1/search", API_URL);
}

//
function renderResults(results) {
    console.log(results);
    if (results.length < 1) {
        var $noResults = $("<h3></h3>");
        $noResults.text("No Results!");
        $resultList.append($noResults);
    }

    results.forEach(function (result) {
        // create the appropriate elements, e.g. var $img = $('<img></img>');
        // fill them with the right info, e.g. $img.attr('src', result.images[0].url)
        // (beware: some results may have no images array!)
        // append them to the $resultList
        var imgUrl;
        if (result.images.length < 1) {
            imgUrl = "https://via.placeholder.com/200";
        } else {
            imgUrl = result.images[0].url;
        }

        $li = $(
            "<li><a target=_blank href='" +
                result.external_urls.spotify +
                "'><img src='" +
                imgUrl +
                "'>" +
                result.name +
                "</a></li>"
        );
        $li.addClass("item");
        $resultList.append($li);
    });
}

$moreButton.on("click", function () {
    // here you make an ajax request to the nextURL
    // inside the success:
    // append the new results
    // make the appropriate considerations about whether to show or hide the $moreButton
    // hint: there is a point when data.artists/albums.next will be null!

    $.ajax({
        url: replaceURLName(nextURL),
        success: function (data) {
            var result = extractInfoFromData(data);
            renderResults(result.items);
            if (result.next) {
                nextURL = result.next;
                $moreButton.show();
            } else {
                $moreButton.hide();
            }
        },
    });
});

$form.on("submit", function (event) {
    event.preventDefault();
    q = $input.val();
    type = $type.val();
    $.ajax({
        url: API_URL,
        data: {
            q: q, // get the textinput value
            type: type, // get the select value
        },
        success: function (data) {
            // update $resultTitle
            // clear any previous results
            // keep track of the next URL
            // render the results
            $resultTitle.html('Results for "' + q + '"');
            $resultList.empty();
            var result = extractInfoFromData(data);
            renderResults(result.items);
            if (result.next) {
                nextURL = result.next;
                $moreButton.show();
            }
        },
    });
});
