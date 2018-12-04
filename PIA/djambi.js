/**
 * TODO: What happens when Chief is in Maze
 * TODO: Identify when a player looses
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
var piece, movingPiece, targetPiece;

// Piece Logic
function canKillDirectly(piece) {
    return piece.type !== diplomat && piece.type !== necromobile && piece.type !== reporter;
}

function canMovePiece(piece) {
    return piece.type === diplomat;
}

function canMoveCorpse(piece) {
    return piece.type === necromobile;
}

function canBeInMaze(piece) {
    return piece.type === chief || !piece.alive;
}

function killInPlace(x, y) {
    piece = getPiece(x, y);
    if (piece === null || piece.owner === game.currentTurn) return;
    piece.alive = false;
    setPiece(x, y, piece);
}

// Game Logic
function nextTurn(visuals = true) {
    game.currentTurn++;
    if (game.currentTurn < 0 || game.currentTurn > 3) game.currentTurn = 0;
    movingPiece = null;

    if (visuals) highlightPlayerPieces(true);
}

function isMovementValid() {
    if (selectedSquare === targetSquare) return false;

    if (movingPiece.alive && !movingPiece.beingMovedByDiplomat && (movingPiece !== getPieceInMaze() || movingPiece === chief)) {
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
            if (x === targetSquare[0] && y === targetSquare[1]) break;
            else if (isOccupied(x, y)) return false;
        }
    }

    if (movingPiece.beingMovedByDiplomat && isCenterSquare(...targetSquare))
        return false;
    else if (movingPiece === getPieceInMaze())
        return !isOccupied(...targetSquare);
    else if (!isOccupied(...targetSquare))
        return true;
    else if (!movingPiece.alive)
        return false;
    else if (getPiece(...targetSquare).alive && getPiece(...targetSquare).owner !== game.currentTurn)
        return canKillDirectly(movingPiece) || canMovePiece(movingPiece);
    else
        return canMoveCorpse(movingPiece) && !getPiece(...targetSquare).alive;
}

function tryMovePiece() {
    if (!isMovementValid()) {
        alert("Movimiento no válido.");
        return false;
    }

    setPiece(selectedSquare[0], selectedSquare[1], null);

    targetPiece = getPiece(...targetSquare);

    setPiece(targetSquare[0], targetSquare[1], movingPiece);

    if (movingPiece !== null) {
        if (!movingPiece.beingMovedByDiplomat) {
            if (movingPiece.type === reporter && movingPiece.alive) {
                if (movingPiece !== getPieceInMaze()) {
                    [x, y] = targetSquare;
                    killInPlace(x - 1, y);
                    killInPlace(x + 1, y);
                    killInPlace(x, y - 1);
                    killInPlace(x, y + 1);
                    movingPiece = null;
                }
                else selectedSquare = [4, 4];
            }
            else if (targetPiece !== null) {
                if (targetPiece.alive && canKillDirectly(movingPiece)) targetPiece.alive = false;
        
                if (movingPiece.type === assassin) {
                    setPiece(selectedSquare[0], selectedSquare[1], targetPiece);
                    movingPiece = null;
                } else {
                    if (movingPiece.type === diplomat) targetPiece.beingMovedByDiplomat = true;
                    movingPiece = targetPiece;
                }
            }
            else if (getPieceInMaze() !== null && !canBeInMaze(getPieceInMaze())){
                movingPiece = getPieceInMaze();
                selectedSquare = [4, 4];
            }
            else movingPiece = null;
        } else {
            movingPiece.beingMovedByDiplomat = false;
            setPiece(targetSquare[0], targetSquare[1], movingPiece);
            movingPiece = null;
        }
    }

    highlightPlayerPieces(false);
    renderSquare(...selectedSquare);
    renderSquare(...targetSquare);
    return true;
}

function onClick(element) {
    piece = getPieceByName(element.id);
    if (movingPiece == null) {
        if (piece=== null) return;
        else if (piece.owner !== game.currentTurn) return;
        else if (!piece.alive) return;

        movingPiece = piece;
        selectedSquare = getSquareByName(element.id);
        highlightPlayerPieces(false);
        renderSquare(selectedSquare[0], selectedSquare[1], true);
    }
    else if (movingPiece === piece && !isCenterSquare(...selectedSquare)) {
        renderSquare(...getSquareByName(element.id));
        highlightPlayerPieces(true);
        movingPiece = null;
    }
    else {
        targetSquare = getSquareByName(element.id);
        if (tryMovePiece() && movingPiece === null) {
            nextTurn();
        }
    }
}

function highlightPlayerPieces(status = true) {
    game.board.dom.className = "";
    if (status) game.board.dom.className = colors[game.currentTurn].toLowerCase() + '-turn';
}

function renderSquare(x, y, highlight = false) {
    square = document.getElementById(squareName(x, y));
    square.innerHTML = "";
    square.className = "";

    if (highlight) square.className += "highlight ";
    if (isCenterSquare(x, y)) square.className += "centerSquare ";

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

    renderBoard();

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
                piece = null;
                
                switch(row) {
                    case 0: // First Row
                        switch (col) {
                            case 0: // First Column
                                piece = chief;
                                break;
                            case 1: // Second Column
                                piece = assassin;
                                break;
                            case 2: // Third Column
                                piece = militant;
                                break;
                        }
                        break;
                    case 1: // Second Row
                        switch (col) {
                            case 0: // First Column
                                piece = reporter;
                                break;
                            case 1: // Second Column
                                piece = diplomat;
                                break;
                            case 2: // Third Column
                                piece = militant;
                                break;
                        }
                        break;
                    case 2: // Third Row
                        switch (col) {
                            case 0: // First Column
                                piece = militant;
                                break;
                            case 1: // Second Column
                                piece = militant;
                                break;
                            case 2: // Third Column
                                piece = necromobile;
                                break;
                        }
                        break;
                }

                if (piece === null) continue;

                setPiece(x, y, {
                    type: piece,
                    owner: game.currentTurn,
                    alive: true,
                    beingMovedByDiplomat: false
                });
            }
        }

        nextTurn(false);
    }
}

function start() {
    if (svgStore.length < 1) pieces.forEach(requestPieceSvg);
    game.board.dom.innerHTML = '<h1 style="grid-column: 5; grid-row: 5">Loading...</h1>';
    setTimeout(() => {
        generateBoard();
        game.currentTurn = -1;
        nextTurn();
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

function getPieceInMaze() {
    return getPiece(4, 4);
}

function setPiece(x, y, piece) {
    if (piece == null) {
        if (!(x in game.board.squares)) return;

        if (y in game.board.squares) delete game.board.squares[x][y];

        if (game.board.squares[x].length < 1) delete game.board.squares[x];
    } else {
        if (!(x in game.board.squares)) game.board.squares[x] = {};

        game.board.squares[x][y] = piece;
    }
    renderSquare(x, y);
}

function isOccupied(x, y) {
    return (x in game.board.squares) && (y in game.board.squares[x]) && game.board.squares[x][y] !== null;
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