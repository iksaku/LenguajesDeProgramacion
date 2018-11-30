/**
 * TODO: What happens when Chief is in Maze
 * TODO: Identify when a player looses
 * TODO:
 */
// Declare Variables and Constants
const chief = {name: "Chief", id: 0};
const assassin = {name: "Assassin", id: 1};
const reporter = {name: "Reporter", id: 2};
const militant = {name: "Militant", id: 3};
const diplomat = {name: "Diplomat", id: 4};
const necromobile = {name: "Necromobile", id: 5};
const pieces = [chief, assassin, reporter, militant, diplomat, necromobile];
const columns = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
const colors = ["Red", "Blue", "Yellow", "Green"];
const game = {
    board: {
        dom: document.getElementById("board"),
        squares: {}
    },
    currentTurn: -1,
    players: []
};
const svgStore = [];
let x = 0, xStart = 0, xStep = 0;
let y = 0, yStart = 0, yStep = 0;
let row = 0, col = 0;
let isInValidDirection = false;
var square, selectedSquare, targetSquare;
var piece, selectedPiece, movingPiece;

// Piece Logic
function canKill(piece) {
    return piece !== diplomat && piece !== necromobile;
}

function canMovePiece(piece) {
    return piece === diplomat;
}

function canMoveCorpse(piece) {
    return piece === necromobile;
}

// Game Logic
function nextTurn() {
    game.currentTurn++;
    if (game.currentTurn < 0 || game.currentTurn > 3) game.currentTurn = 0;
    movingPiece = null;
}

function isMovementValid() {
    if (selectedSquare === targetSquare) return false;

    if (!movingPiece.beingMovedByDiplomat) {
        isInValidDirection = false;

        [x, y] = selectedSquare;

        if (x === targetSquare[0] || y === targetSquare[1]) {
            isInValidDirection =
                movingPiece.type !== militant ||
                ((Math.abs(x - targetSquare[0]) <= 2) &&
                    (Math.abs(y - targetSquare[1]) <= 2));
        }
        else if (Math.abs(x - targetSquare[0]) === Math.abs(y - targetSquare[1])) {
            isInValidDirection =
                movingPiece.type !== militant ||
                Math.abs(x - targetSquare[0]) <= 2;
        }

        if (!isInValidDirection) return false;

        xStep = (x === targetSquare[0] ? 0 : (x < targetSquare[0] ? 1 : -1));
        yStep = (y === targetSquare[1] ? 0 : (y < targetSquare[1] ? 1 : -1));

        for (x += xStep, y += yStep; ((x - targetSquare[0]) * xStep <= 0) &&
                                     ((y - targetSquare[1]) * yStep <= 0);
             x += xStep, y += yStep) {
            if ([x, y] === targetSquare) break;
            else if (isOccupied(x, y)) return false;
        }
    }

    if (!isOccupied(...targetSquare))
        return true;
    else if (!movingPiece.alive)
        return false;
    else if (movingPiece.alive && getPiece(...targetSquare).owner !== game.currentTurn)
        return canKill(movingPiece) || canMovePiece(movingPiece);
    else
        return canMoveCorpse(movingPiece) && !getPiece(...targetSquare).alive;
}

function tryMovePiece() {
    if (!isMovementValid()) {
        alert("Movimiento no válido.");
        return false;
    }

    // TODO: Actually move the piece :P
    return true;
}

function onClick(element) {
    selectedPiece = getPieceByName(element.id);
    if (movingPiece == null) {
        if (selectedPiece=== null) return;
        else if (selectedPiece.owner !== game.currentTurn) return;
        else if (!selectedPiece.alive) return;

        movingPiece = selectedPiece;
        selectedSquare = getSquareByName(element.id);
        renderSquare(selectedSquare[0], selectedSquare[1], true);
    }
    else if (movingPiece === selectedPiece) {
        renderSquare(...getSquareByName(element.id));
        movingPiece = null;
    }
    else {
        targetSquare = getSquareByName(element.id);
        if (tryMovePiece() && movingPiece === null) {
            nextTurn();
        }
    }
}

function renderSquare(x, y, highlight = false) {
    square = document.getElementById(squareName(x, y));
    square.innerHTML = "";
    square.className = "";

    if (highlight) square.className += "highlight ";
    if (isCenterSquare(x, y)) square.className += "centerSquare in-power ";

    if (!isOccupied(x, y)) return;

    piece = getPiece(x, y);
    square.className += colors[piece.owner].toLowerCase();
    if (!piece.alive) square.className += " corpse";
    square.innerHTML = svgStore[piece.type.id];
}

function renderBoard() {
    for (x = 0; x < 9; x++) {
        for (y = 0; y < 9; y++) {
            game.board.dom.innerHTML += '<div id="' + squareName(x, y) + '" onclick="onClick(this);"></div>';
            renderSquare(x, y);
        }
    }
}

function generateBoard() {
    game.board.dom.innerHTML = "";
    game.board.squares = {};
    game.currentTurn = 0;
    game.players = [];

    while (!(game.currentTurn in game.players)) {
        game.players.push('Player ' + (game.currentTurn + 1));

        xStart = game.currentTurn < 2 ? 8 : 0;
        yStart = (game.currentTurn === 0 || game.currentTurn === 3) ? 0 : 8;
        xStep = game.currentTurn < 2 ? -1 : 1;
        yStep = (game.currentTurn === 0 || game.currentTurn === 3) ? 1 : -1;

        for (x = xStart; (x >= 0 && x < 3) || (x >= 6 && x < 9); x += xStep) {
            for (y = yStart; (y >= 0 && y < 3) || (y >= 6 && y < 9); y += yStep) {
                row = Math.abs(x - xStart);
                col = Math.abs(y - yStart);
                selectedPiece = null;
                
                switch(row) {
                    case 0: // First Row
                        switch (col) {
                            case 0: // First Column
                                selectedPiece = chief;
                                break;
                            case 1: // Second Column
                                selectedPiece = assassin;
                                break;
                            case 2: // Third Column
                                selectedPiece = militant;
                                break;
                        }
                        break;
                    case 1: // Second Row
                        switch (col) {
                            case 0: // First Column
                                selectedPiece = reporter;
                                break;
                            case 1: // Second Column
                                selectedPiece = diplomat;
                                break;
                            case 2: // Third Column
                                selectedPiece = militant;
                                break;
                        }
                        break;
                    case 2: // Third Row
                        switch (col) {
                            case 0: // First Column
                                selectedPiece = militant;
                                break;
                            case 1: // Second Column
                                selectedPiece = militant;
                                break;
                            case 2: // Third Column
                                selectedPiece = necromobile;
                                break;
                        }
                        break;
                }

                if (selectedPiece === null) continue;

                if (!(x in game.board.squares)) game.board.squares[x] = {};

                game.board.squares[x][y] = {
                    type: selectedPiece,
                    owner: game.currentTurn,
                    alive: true,
                    beingMovedByDiplomat: false
                };
            }
        }

        nextTurn();
    }

    renderBoard();
}

function start() {
    if (svgStore.length < 1) pieces.forEach(requestPieceSvg);
    game.board.dom.innerHTML =
        '<h1 style="grid-column: 5; grid-row: 5">' + (svgStore.length < 1 ? 'Loading' : 'Resetting') + '...</h1>';
    setTimeout(() => {
        generateBoard();
        game.currentTurn = 0;
    }, 300);
}

// Utilities
function getPiece(x, y) {
    if (!isOccupied(x, y)) return null;
    return game.board.squares[x][y];
}

function getPieceByName(name) {
    return getPiece(...getSquareByName(name));
}

function isOccupied(x, y) {
    return (x in game.board.squares) && (y in game.board.squares[x]);
}

function isCenterSquare(x, y) {
    return x === 4 && y === 4;
}

function squareName(x, y) {
    return columns[y] + (x + 1);
}

function getSquareByName(name) {
    return [name[1] - 1, columns.indexOf(name[0])];
}

function requestPieceSvg(piece) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", getBasePath() + "/img/" + piece.name.toLowerCase() + ".svg", true);
    xhr.overrideMimeType("img/svg+html");

    xhr.onload = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                svgStore[piece.id] = xhr.responseText;
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.onerror = function () {
        console.error(xhr.statusText);
    };

    xhr.send(null);
}

function getBasePath() {
    const actualPath = window.location.href;
    const parts = actualPath.split("/");
    parts.pop();
    return parts.join("/");
}

// Start Game
start();