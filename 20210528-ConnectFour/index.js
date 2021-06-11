var $board = $(".connectFour");
var $columns = $board.find(".column");
// var $allSlots = $board.find(".slot");

var boardHeight = 6;
var boardWidth = 7;

var currentPlayer = 1;

var $lastSlot = $();
var rowIndex;
var colIndex;

var victory;

var draw;
var turnCount = 0;

function getRowIndex($slot) {
    return $slot.index();
}

function getColIndex($slot) {
    return $slot.parent().index();
}

function getRow(rowIndex) {
    var $row = $();
    for (var i = 0; i < boardWidth; i++) {
        $row = $row.add($columns.eq(i).find(".slot").eq(rowIndex));
    }
    return $row;
}

function getCol(colIndex) {
    return $columns.eq(colIndex);
}

function getSlot(colIndex, rowIndex) {
    return getCol(colIndex).find(".slot").eq(rowIndex);
}

function highlightSlot($slot) {
    $slot.find(".circle").addClass("highlight");
}

function unhighlightSlot($slot) {
    $slot.find(".circle").removeClass("highlight");
}

function hightlightSlots($slots) {
    for (var i = 0; i < $slots.length; i++) {
        highlightSlot($slots.eq(i));
    }
}

// Not really needed
function unhightlightSlots($slots) {
    for (var i = 0; i < $slots.length; i++) {
        unhighlightSlot($slots.eq(i));
    }
}

function switchPlayer() {
    if (currentPlayer === 1) {
        currentPlayer = 2;
    } else {
        currentPlayer = 1;
    }
}

function placeTile($column) {
    for (var i = $column.length - 1; i >= 0; i--) {
        var $currentSlot = $column.eq(i);
        if (checkFree($currentSlot)) {
            $currentSlot.addClass("player-" + currentPlayer);
            unhighlightSlot($lastSlot);
            $lastSlot = $currentSlot;
            highlightSlot($lastSlot);
            return i;
        }
    }
    return -1;
}

function checkFree($slot) {
    if ($slot.hasClass("player-1") || $slot.hasClass("player-2")) {
        return false;
    } else {
        return true;
    }
}

function checkSlotForPlayer($slot) {
    if ($slot.hasClass("player-1")) {
        return 1;
    } else if ($slot.hasClass("player-2")) {
        return 2;
    }
    return -1;
}

function checkWin($slots) {
    var count = 0;
    for (var i = $slots.length - 1; i >= 0; i--) {
        var $slot = $slots.eq(i);
        if (checkSlotForPlayer($slot) === currentPlayer) {
            // console.log("checkplayer true", $slot);
            count++;
            if (count === 4) {
                // console.log($slots.slice(i, i + 4));
                hightlightSlots($slots.slice(i, i + 4));
                victory = true;
            }
        } else {
            // console.log("checkplayer false", $slot);
            count = 0;
        }
    }
    return 0;
}

function getSlotsRow($slot) {
    var currentRowIndex = getRowIndex($slot);
    var $slots = $();

    // ROW - LEFT AND RIGHT -- Todo: use getRow()
    for (var i = 0; i < boardWidth; i++) {
        $slots = $slots.add(getSlot(i, currentRowIndex));
    }

    return $slots;
}

function getSlotsNWSE($slot) {
    var col = getColIndex($slot);
    var row = getRowIndex($slot);
    var $slots = $();
    var startCol;
    var startRow;

    if (row >= col) {
        // console.log("col <= row");
        startRow = row - col;
        startCol = 0;
        while (startRow < boardHeight) {
            $slots = $slots.add(getSlot(startCol, startRow));
            startCol++;
            startRow++;
        }
    } else {
        // console.log("col > row");
        startCol = col - row;
        startRow = 0;
        // console.log(startCol, startRow);
        while (startCol < boardWidth) {
            $slots = $slots.add(getSlot(startCol, startRow));
            startCol++;
            startRow++;
        }
    }
    return $slots;
}

function getSlotsSWNE($slot) {
    var col = getColIndex($slot);
    var row = getRowIndex($slot);
    var $slots = $();
    var startCol;
    var startRow;

    if (col + row < 6) {
        // console.log("col + row < 6");
        startRow = row + col;
        startCol = 0;
        while (startRow >= 0) {
            $slots = $slots.add(getSlot(startCol, startRow));
            startCol++;
            startRow--;
        }
    } else {
        // console.log("col + row >= 6");
        startCol = 6;
        startRow = row + col - 6;
        // console.log(startCol, startRow);
        while (startRow <= 5) {
            $slots = $slots.add(getSlot(startCol, startRow));
            startCol--;
            startRow++;
        }
    }
    return $slots;
}

function announceWin() {
    showModal();
    var playerColor = "Red";
    if (currentPlayer == 2) {
        playerColor = "Yellow";
        $(".modal-text").css("color", "yellow");
    }
    $(".modal-text").text(playerColor + " won!");
}

function announceDraw() {
    showModal();
    $(".modal-text").css("color", "blue");
    $(".modal-text").text("DRAW!");
}

function showModal() {
    $(".modal-wrapper").addClass("show");
    var modalBtn = $("#modalBtn");
    modalBtn.on("click", function (event) {
        location.reload();
    });
}

$board.find(".column").on("click", function () {
    var $columnSlots = $(this).find(".slot");
    colIndex = $(this).index();
    rowIndex = placeTile($columnSlots);

    // if the column is already full
    if (rowIndex < 0) {
        console.log("row was full", rowIndex);
        return;
    }
    var $slot = getSlot(colIndex, rowIndex);

    $columnSlots = $(this).find(".slot");
    checkWin($columnSlots);
    checkWin(getSlotsRow($slot));
    checkWin(getSlotsNWSE($slot));
    checkWin(getSlotsSWNE($slot));
    if (victory) {
        announceWin();
    }
    turnCount++;
    console.log("Turn #", turnCount);
    if (turnCount == 42) {
        announceDraw();
    }

    switchPlayer();
});
