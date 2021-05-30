var $board = $(".connectFour");
var $columns = $board.find(".column");
var $allSlots = $board.find(".slot");

var boardHeight = 6;
var boardWidth = 7;

var currentPlayer = 1;

var $lastSlot = $();
var rowIndex;
var colIndex;

var victory;

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
    //add class to last free position in column
    // for loop reverse i-- -> if free place tile
    //$curren.hasClass("player2")
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

    $rowIndex = getRowIndex($lastSlot);
    // console.log($lastSlot, "last", $rowIndex);
    return 0;
}

function getSlotsRow($slot) {
    var currentRowIndex = getRowIndex($slot);
    var currentColIndex = getColIndex($slot);
    var $slots = $();

    // ROW - LEFT AND RIGHT
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
        $(".modal").css("background-color", "grey");
    }
    $(".modal-text").text(playerColor + " won!");
}

function showModal() {
    var modal = $(".modal");
    var backdropModal = $(".modal-wrapper");
    var modalClose = $(".modal-close");
    var modalBtn = $("#modalBtn");
    backdropModal.addClass("show");
    modal.on("click", function (event) {
        event.stopPropagation();
    });
    modalBtn.on("click", function (event) {
        location.reload();
    });
    backdropModal.on("click", function (event) {
        continueToSite();
    });
}

// function checkUp($slot) {
//     var currentRowIndex = getRowIndex($slot);
//     var currentColIndex = getColIndex($slot);

//     if (lookUp($slot)) {
//         console.log("looked up, good");
//         for (var i = currentRowIndex; i >= currentRowIndex - 3; i--) {
//             console.log("hightlight", currentColIndex, currentRowIndex);
//             // highlightSlot(getSlot(currentColIndex, i));
//             if (
//                 checkSlotForPlayer(getSlot(currentColIndex, i)) !==
//                 currentPlayer
//             ) {
//                 console.log("check for", currentColIndex, i);
//                 break;
//             }
//         }
//     }
// }

// function checkDown($slot) {
//     var currentRowIndex = getRowIndex($slot);
//     var currentColIndex = getColIndex($slot);
//     var winners = $();

//     if (lookDown($slot)) {
//         console.log("looked down, good");
//         for (var i = currentRowIndex; i <= currentRowIndex + 3; i++) {
//             console.log("hightlight", currentColIndex, currentRowIndex);
//             // highlightSlot(getSlot(currentColIndex, i));
//             if (
//                 checkSlotForPlayer(getSlot(currentColIndex, i)) !==
//                 currentPlayer
//             ) {
//                 console.log("break for", currentColIndex, i);
//                 return -1;
//             } else {
//                 winners = winners.add(getSlot(currentColIndex, i));
//             }
//         }
//         return winners;
//     }
// }

// function checkLeft($slot) {
//     var currentRowIndex = getRowIndex($slot);
//     var currentColIndex = getColIndex($slot);
//     var winners = $();

//     if (lookLeft($slot)) {
//         console.log("looked left, good");
//         for (var i = currentColIndex; i >= currentColIndex - 3; i--) {
//             console.log("hightlight", currentColIndex, currentRowIndex);
//             // highlightSlot(getSlot(currentColIndex, i));
//             if (
//                 checkSlotForPlayer(getSlot(i, currentRowIndex)) !==
//                 currentPlayer
//             ) {
//                 console.log("break for", i, currentRowIndex);
//                 return -1;
//             } else {
//                 winners = winners.add(getSlot(i, currentRowIndex));
//             }
//         }
//         return winners;
//     }
// }

// function checkRight($slot) {
//     var currentRowIndex = getRowIndex($slot);
//     var currentColIndex = getColIndex($slot);
//     var winners = $();

//     if (lookRight($slot)) {
//         console.log("looked right, good");
//         for (var i = currentColIndex; i <= currentColIndex + 3; i++) {
//             console.log("hightlight", currentColIndex, currentRowIndex);
//             // highlightSlot(getSlot(currentColIndex, i));
//             if (
//                 checkSlotForPlayer(getSlot(i, currentRowIndex)) !==
//                 currentPlayer
//             ) {
//                 console.log("break for", i, currentRowIndex);
//                 return -1;
//             } else {
//                 winners = winners.add(getSlot(i, currentRowIndex));
//             }
//         }
//         return winners;
//     }
// }

// function checkNW($slot) {
//     var currentRowIndex = getRowIndex($slot);
//     var currentColIndex = getColIndex($slot);
//     var $slots = $();

//     if (lookNW($slot)) {
//         for (var i = 1; i < 4; i++) {
//             if (
//                 checkSlotForPlayer(
//                     getSlot(currentColIndex - i, currentRowIndex - i)
//                 ) !== currentPlayer
//             ) {
//                 return -1;
//             } else {
//                 $slots = $slots.add(
//                     getSlot(currentColIndex - i, currentRowIndex - i)
//                 );
//             }
//         }
//         return $slots;
//     }
//     return -1;
// }

// function checkNE($slot) {
//     var currentRowIndex = getRowIndex($slot);
//     var currentColIndex = getColIndex($slot);
//     var winners = $();

//     if (lookNE($slot)) {
//         for (var i = 1; i < 4; i++) {
//             if (
//                 checkSlotForPlayer(
//                     getSlot(currentColIndex + i, currentRowIndex - i)
//                 ) !== currentPlayer
//             ) {
//                 return -1;
//             } else {
//                 winners = winners.add(
//                     getSlot(currentColIndex + i, currentRowIndex - i)
//                 );
//             }
//         }
//         return winners;
//     }
//     return -1;
// }

// function checkSW($slot) {
//     var currentRowIndex = getRowIndex($slot);
//     var currentColIndex = getColIndex($slot);
//     var winners = $();

//     if (lookSW($slot)) {
//         for (var i = 1; i < 4; i++) {
//             if (
//                 checkSlotForPlayer(
//                     getSlot(currentColIndex - i, currentRowIndex + i)
//                 ) !== currentPlayer
//             ) {
//                 return -1;
//             } else {
//                 winners = winners.add(
//                     getSlot(currentColIndex - i, currentRowIndex + i)
//                 );
//             }
//         }
//         return winners;
//     }
//     return -1;
// }

// function checkSE($slot) {
//     var currentRowIndex = getRowIndex($slot);
//     var currentColIndex = getColIndex($slot);
//     var $slots = $();

//     if (lookSE($slot)) {
//         for (var i = 1; i < 4; i++) {
//             if (
//                 checkSlotForPlayer(
//                     getSlot(currentColIndex + i, currentRowIndex + i)
//                 ) !== currentPlayer
//             ) {
//                 return -1;
//             } else {
//                 $slots = $slots.add(
//                     getSlot(currentColIndex + i, currentRowIndex + i)
//                 );
//             }
//         }
//         return $slots;
//     }
//     return -1;
// }

// // function lookUp(rowIndex) {
// //     return rowIndex - 3 >= 0;
// // }

// function lookUp($slot) {
//     return getRowIndex($slot) - 3 >= 0;
// }

// // function lookDown(rowIndex) {
// //     return rowIndex + 3 < boardHeight;
// // }

// function lookDown($slot) {
//     return getRowIndex($slot) + 3 < boardHeight;
// }

// // function lookLeft(colIndex) {
// //     return colIndex - 3 >= 0;
// // }

// function lookLeft($slot) {
//     return getColIndex($slot) - 3 >= 0;
// }

// // function lookRight(colIndex) {
// //     return colIndex + 3 < boardWidth;
// // }

// function lookRight($slot) {
//     return getColIndex($slot) + 3 < boardWidth;
// }

// // function lookNW(colIndex, rowIndex) {
// //     return lookUp(rowIndex) && lookLeft(colIndex);
// // }

// function lookNW($slot) {
//     return lookUp($slot) && lookLeft($slot);
// }

// // function lookNE(colIndex, rowIndex) {
// //     return lookUp(rowIndex) && lookRight(colIndex);
// // }

// function lookNE($slot) {
//     return lookUp($slot) && lookRight($slot);
// }

// // function lookSW(colIndex, rowIndex) {
// //     return lookDown(rowIndex) && lookLeft(colIndex);
// // }

// function lookSW($slot) {
//     return lookDown($slot) && lookLeft($slot);
// }

// // function lookSE(colIndex, rowIndex) {
// //     return lookDown(rowIndex) && lookRight(colIndex);
// // }

// function lookSE($slot) {
//     return lookDown($slot) && lookRight($slot);
// }

//checkWin -> local Column, local Row
// initialize count to 0, loop over positions, if current is player count +1, if next is current player count +1, ...
// reset count if next is not player..

//check rows-
// get rowindex where player clicked bzw where last tile was placed
//  functiong getRowPositions(rowIndex){}
//  var $row = $();
// for column in columns, var $column = $columns.eq(i); get column(rowIndex) var $pos = $columnPositions.eq(rowIndex)
// return $row

//reset board. window.location.reload()
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
    // console.log("tile placed", $(this).index(), rowIndex);
    // checkDirections(colIndex, rowIndex);
    // var down = checkDown(getSlot(colIndex, rowIndex));
    // console.log(down);
    // var nw = checkNW(getSlot(colIndex, rowIndex));
    // console.log(nw);
    // checkWin(getSlot(colIndex, rowIndex));
    $columnSlots = $(this).find(".slot");
    checkWin($columnSlots);
    checkWin(getSlotsRow($slot));
    checkWin(getSlotsNWSE($slot));
    checkWin(getSlotsSWNE($slot));
    if (victory) {
        announceWin();
    }
    // getSlot(colIndex, rowIndex)
    //     .find(".circle")
    //     .text(colIndex + " " + rowIndex);

    // console.log($columnSlots);
    // console.log(checkWin($columnSlots));
    switchPlayer(); // TODO: only if last move was valid and placed something
});
