/**
 * TODO: Militants can still kill Chief in Maze
 * TODO: When down to 3 players, Leading Player gets 3 turns in a row... Should only be able to get 2
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
const colors = ["Red", "Blue", "Yellow", "Green", "Gray"];
const translatedColors = ["Rojo", "Azul", "Amarillo", "Verde"];
const game = {
    started: false,
    board: {
        dom: document.getElementById("board"),
        squares: {}
    },
    previousTurn: -1,
    currentTurn: -1,
    players: []
};
const svgStore = [];
let x = 0, xStart = 0, xStep = 0;
let y = 0, yStart = 0, yStep = 0;
let row = 0, col = 0;
let isInValidDirection = false;
let hasLooped = true;
let targetPlayer, alivePlayers;
var alertMessage;
var square, selectedSquare, targetSquare, centerSquare = [4, 4];
var piece, movingPiece, targetPiece;

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
    if (piece === null || piece.owner === getCurrentPlayer().id) return;
    piece.alive = false;
    setPiece(x, y, piece);
}

function isMovementValid() {
    if (selectedSquare === targetSquare) {
        alertMessage += "No puedes moverte a la misma casilla.";
        return false;
    }
    if (targetSquare === centerSquare && getPieceInMaze() === null) {
        alertMessage += "El centro del tablero está vacío.";
        return false;
    }

    if (movingPiece.alive && !movingPiece.beingMovedByDiplomat && (movingPiece !== getPieceInMaze() || movingPiece.type === chief)) {
        isInValidDirection = false;

        [x, y] = selectedSquare;

        if (x === targetSquare[0] || y === targetSquare[1]) {
            isInValidDirection =
                movingPiece.type !== militant ||
                ((Math.abs(x - targetSquare[0]) <= 2) &&
                    (Math.abs(y - targetSquare[1]) <= 2));
            if (!isInValidDirection) alertMessage += "Un militante solo puede moverse un máximo de 2 casillas.";
        }
        else if (Math.abs(x - targetSquare[0]) === Math.abs(y - targetSquare[1])) {
            isInValidDirection =
                movingPiece.type !== militant ||
                Math.abs(x - targetSquare[0]) <= 2;
            if (!isInValidDirection) alertMessage += "Un militante solo puede moverse un máximo de 2 casillas.";
        }

        if (!isInValidDirection) {
            if (alertMessage.indexOf("militante") < 0)
                alertMessage += "Solo se pueden mover piezas verticalmente, horizontalmente y de forma diagonal (casillas conectadas esquina con esquina en la misma dirección).";
            return false;
        }

        xStep = (x === targetSquare[0] ? 0 : (x < targetSquare[0] ? 1 : -1));
        yStep = (y === targetSquare[1] ? 0 : (y < targetSquare[1] ? 1 : -1));

        for (x += xStep, y += yStep; ((x - targetSquare[0]) * xStep <= 0) &&
                                     ((y - targetSquare[1]) * yStep <= 0);
             x += xStep, y += yStep) {
            if (x === targetSquare[0] && y === targetSquare[1]) break;
            else if (isOccupied(x, y)) {
                alertMessage += "No se puede realizar esta acción debido a que otra pieza se encuentra obstruyendo el paso.";
                return false;
            }
        }
    }

    targetPiece = getPiece(...targetSquare);

    if (movingPiece.beingMovedByDiplomat && isCenterSquare(...targetSquare)) {
        if (isOccupied(...targetSquare) || !movingPiece.alive || movingPiece.type !== chief) {
            if (!movingPiece.alive) alertMessage += "No se puede mover un cadáver al centro del tablero.";
            else if (movingPiece.type !== chief) alertMessage += "No se puede colocar una pieza que no sea 'Jefe' al centro del tablero con un diplomata.";
            else alertMessage += "No se puede colocar la pieza al centro del tablero con el diplomata porque dicha casilla ya se encuentra ocupado.";
            return false;
        }
        return true;
    }
    else if (movingPiece === getPieceInMaze()) {
        if (isOccupied(...targetSquare)) {
            alertMessage += "No se puede mover esta pieza del centro del tablero.";
            return false;
        }
        return true;
    }
    else if (!movingPiece.alive) {
        if (isCenterSquare(...targetSquare)) {
            alertMessage += "No se puede mover un cadáver al centro del tablero.";
            return false;
        }
        if (isOccupied(...targetSquare)) {
            alertMessage += "No se puede colocar el cadáver en una casilla ocupada por otra pieza.";
            return false;
        }
        return true;
    }
    else if (!isOccupied(...targetSquare)) {
        return true;
    }
    else if (movingPiece.type === militant && targetSquare === centerSquare && getPieceInMaze() !== null) {
        alertMessage += "No se puede matar la pieza Jefe de otro jugador con un militante cuando esta se encuentra al centro del tablero.";
        return false;
    }
    else if (getPiece(...targetSquare).alive && getPiece(...targetSquare).owner !== movingPiece.owner) {
        if (!canKillDirectly(movingPiece) && !canMovePiece(movingPiece)) {
            alertMessage += "Esta pieza no puede interactuar con otras piezas vivas (matar o mover)";
            if (movingPiece.type !== necromobile) alertMessage += " de manera directa";
            alertMessage += ".";
            return false;
        }
        return canKillDirectly(movingPiece) || canMovePiece(movingPiece);
    }
    else if (!getPiece(...targetSquare).alive) {
        if (!canMoveCorpse(movingPiece)) {
            alertMessage += "Esta pieza no puede interactuar con cadáveres.";
            return false;
        }
        return true;
    }
    else {
        if (getPiece(...targetSquare).owner === movingPiece.owner) {
            alertMessage += "No se puede interactuar entre piezas del mismo jugador.";
            return false;
        }
        return true;
    }

    /*else if (movingPiece.type === necromobile){
        if (!canMoveCorpse(movingPiece) || getPiece(...targetSquare).alive) {

            return false;
        }
        return true;
    }
    else {

    }*/
}

function tryMovePiece() {
    alertMessage = "Movimiento no válido.\n\n";
    if (!isMovementValid()) {
        alertMessage += "\n\nPor favor realize otra acción, seleccione una casilla donde no haya piezas o cambie de pieza a mover.";
        alertMessage += "\n(Para cambiar de pieza seleccione nuevamente la pieza que se encuentra resaltada, posteriormente, seleccione otra pieza disponible, es decir, que se encuentre resaltada.)";
        alert(alertMessage);
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
                else selectedSquare = centerSquare;
            }
            else if (targetPiece !== null) {
                if (targetPiece.alive && canKillDirectly(movingPiece)) {
                    targetPiece.alive = false;
                    if (targetPiece.type === chief) {
                        game.players[targetPiece.owner].playing = false;
                        transferOwnership(targetPiece.owner, game.currentTurn);
                    }
                }

                if (movingPiece.type === assassin) {
                    setPiece(selectedSquare[0], selectedSquare[1], targetPiece);
                    movingPiece = null;
                } else {
                    if (movingPiece.type === diplomat) {
                        targetPiece.beingMovedByDiplomat = true;
                        alertMessage = "Por favor seleccione una casilla vacía donde desee colocar la pieza.";
                        if (targetPiece.type !== chief) alertMessage += "\n(Esta pieza no puede ser colocada al centro del tablero.)";
                    } else {
                        alertMessage = "Por favor seleccione una casilla vacía donde desee colocar el cádaver de la pieza.";
                        alertMessage += "\n(Los cádaveres no pueden ser colocados al centro del tablero.)"
                    }
                    alert(alertMessage);
                    movingPiece = targetPiece;
                }
            }
            else movingPiece = null;
        } else {
            movingPiece.beingMovedByDiplomat = false;
            setPiece(targetSquare[0], targetSquare[1], movingPiece);
            movingPiece = null;
        }
    }

    if (movingPiece === null && getPieceInMaze() !== null && !canBeInMaze(getPieceInMaze())){
        movingPiece = getPieceInMaze();
        selectedSquare = centerSquare;
    }

    highlightPlayerPieces(false);
    renderSquare(...selectedSquare);
    renderSquare(...targetSquare);
    return true;
}

function onClick(element) {
    if (!game.started) return;
    piece = getPieceByName(element.id);
    if (movingPiece == null) {
        if (piece=== null) return;
        else if (piece.owner !== getCurrentPlayer().id) return;
        else if (!piece.alive) return;

        movingPiece = piece;
        selectedSquare = getSquareByName(element.id);
        highlightPlayerPieces(false);
        renderSquare(selectedSquare[0], selectedSquare[1], true);
    }
    else if (movingPiece === piece && (!isCenterSquare(...selectedSquare) || canBeInMaze(piece))) {
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
    if (status) game.board.dom.className = colors[getCurrentPlayer().id].toLowerCase() + '-turn';
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
    game.players = {};

    renderBoard();

    while (!(game.currentTurn in game.players)) {
        game.players[game.currentTurn] = {
            id: game.currentTurn,
            name: 'Jugador ' + (game.currentTurn + 1),
            playing: true,
            chief: null
        };

        xStart = game.currentTurn < 2 ? 8 : 0;
        yStart = (game.currentTurn === 0 || game.currentTurn === 3) ? 0 : 8;
        xStep = game.currentTurn < 2 ? -1 : 1;
        yStep = (game.currentTurn === 0 || game.currentTurn === 3) ? 1 : -1;

        for (x = xStart; (x >= 0 && x < 3) || (x >= 6 && x < 9); x += xStep) {
            for (y = yStart; (y >= 0 && y < 3) || (y >= 6 && y < 9); y += yStep) {
                row = Math.abs(x - xStart);
                col = Math.abs(y - yStart);
                targetPiece = null;
                
                switch(row) {
                    case 0: // First Row
                        switch (col) {
                            case 0: // First Column
                                targetPiece = chief;
                                break;
                            case 1: // Second Column
                                targetPiece = assassin;
                                break;
                            case 2: // Third Column
                                targetPiece = militant;
                                break;
                        }
                        break;
                    case 1: // Second Row
                        switch (col) {
                            case 0: // First Column
                                targetPiece = reporter;
                                break;
                            case 1: // Second Column
                                targetPiece = diplomat;
                                break;
                            case 2: // Third Column
                                targetPiece = militant;
                                break;
                        }
                        break;
                    case 2: // Third Row
                        switch (col) {
                            case 0: // First Column
                                targetPiece = militant;
                                break;
                            case 1: // Second Column
                                targetPiece = militant;
                                break;
                            case 2: // Third Column
                                targetPiece = necromobile;
                                break;
                        }
                        break;
                }

                if (targetPiece === null) continue;

                setPiece(x, y, {
                    type: targetPiece,
                    owner: game.currentTurn,
                    alive: true,
                    beingMovedByDiplomat: false,
                    x: x,
                    y: y
                });

                if (targetPiece === chief) game.players[game.currentTurn].chief = getPiece(x, y);
            }
        }

        nextTurn();
    }
}

function start() {
    if (svgStore.length < 1) pieces.forEach(requestPieceSvg);
    game.board.dom.innerHTML = '<h1 style="grid-column: 5; grid-row: 5">Loading...</h1>';
    game.started = false;
    setTimeout(() => {
        generateBoard();
        game.previousTurn = -1;
        game.currentTurn = -1;
        game.started = true;
        nextTurn();
    }, 300);
}

function getCurrentPlayer() {
    return getPlayer(game.currentTurn);
}

function getPlayer(id) {
    if (id < 0 || id > 3 || !(id in game.players)) return null;
    return game.players[id];
}

function nextTurn() {
    piece = null;
    movingPiece = null;
    targetPiece = null;

    if (game.previousTurn < 0 || game.previousTurn > 3) game.previousTurn = game.currentTurn;

    if (getPieceInMaze() !== null && getPieceInMaze().owner !== game.currentTurn) {
        game.previousTurn = game.currentTurn;
        game.currentTurn = getPieceInMaze().owner;
    } else {
        targetPlayer = [game.previousTurn, game.currentTurn];

        if (getPieceInMaze() !== null && getPieceInMaze().owner === game.currentTurn) {
            game.currentTurn = game.previousTurn;
        }

        game.previousTurn = game.currentTurn;
        game.currentTurn++;
        if (game.currentTurn < 0 || game.currentTurn > 3) game.currentTurn = 0;

        if (getCurrentPlayer() !== null && !getCurrentPlayer().playing) {
            if (getPieceInMaze() !== null && targetSquare[1] === getPieceInMaze().owner) game.currentTurn = getPieceInMaze().owner;
            nextTurn();
            return;
        }

        if (targetPlayer[0] === game.previousTurn && targetPlayer[1] === game.currentTurn) {
            if (!hasLooped) hasLooped = true;
            else {
                hasLooped = false;
                game.previousTurn = game.currentTurn;
                game.currentTurn++;
                if (game.currentTurn < 0 || game.currentTurn > 3) game.currentTurn = 0;
            }
        }
    }

    if (game.started) {
        alivePlayers = 0;

        for (targetPlayer = 0; targetPlayer < 4; ++targetPlayer) {
            if (!getPlayer(targetPlayer).playing) continue;

            if (!canPlayerContinue(targetPlayer)) {
                game.players[targetPlayer].playing = false;
                piece = game.players[targetPlayer].chief;
                piece.alive = false;
                setPiece(piece.x, piece.y, piece);
                transferOwnership(targetPlayer, 4);
            } else {
                ++alivePlayers;
            }
        }

        if (alivePlayers === 1) {
            for (targetPlayer = 0; targetPlayer < 4; ++targetPlayer) {
                if (getPlayer(targetPlayer).playing) break;
            }
            alert("¡El Jugador " + translatedColors[getPlayer(targetPlayer).id] + " ha ganado la partida!");
            game.started = false;
            highlightPlayerPieces(false);
            return;
        }

        checkChiefInMaze();

        if (!getCurrentPlayer().playing) {
            nextTurn();
            return;
        }

        movingPiece = null;

        highlightPlayerPieces(true);
    }
}

function canPlayerContinue(id) {
    piece = getPlayer(id).chief;

    if (piece === null || !piece.alive) return false;
    if (piece === getPieceInMaze() || playerHas(id, necromobile)) return true;

    for (x = piece.x - 1; x <= piece.x + 1; ++x) {
        if (x < 0 || x > 8) continue;

        for (y = piece.y - 1; y <= piece.y + 1; ++y) {
            if (y < 0 || y > 8) continue;

            targetPiece = getPiece(x, y);
            if (targetPiece === piece) continue;
            if (targetPiece === null || targetPiece.alive) return true;
        }
    }

    return false;
}

function playerHas(id, type) {
    for (xStep = 0; xStep < 9; ++xStep) {
        for (yStep = 0; yStep < 9; ++yStep) {
            targetPiece = getPiece(xStep, yStep);
            if (targetPiece === null) continue;
            if (targetPiece.type === type && targetPiece.owner === id && targetPiece.alive) return true;
        }
    }
    return false;
}

function checkChiefInMaze() {
    if (getPieceInMaze() === null) return;

    transferOwnership(null, getPieceInMaze().owner);
}

function transferOwnership(from, to) {
    for (x = 0; x < 9; ++x) {
        for (y = 0; y < 9; ++y) {
            piece = getPiece(x, y);
            if (piece === null || !piece.alive ||
                (from !== null && piece.owner !== 4 && piece.owner !== from) ||
                (piece.owner !== 4 && getPlayer(from || piece.owner).playing)) continue;

            piece.owner = to;
            setPiece(x, y, piece);
        }
    }
}

function getPiece(x, y) {
    if (!isOccupied(x, y)) return null;
    return game.board.squares[x][y];
}

function getPieceByName(name) {
    return getPiece(...getSquareByName(name));
}

function getPieceInMaze() {
    return getPiece(...centerSquare);
}

function setPiece(x, y, piece) {
    if (piece == null) {
        if (!(x in game.board.squares)) return;

        if (y in game.board.squares[x]) delete game.board.squares[x][y];

        if (game.board.squares[x].length < 1) delete game.board.squares[x];
    } else {
        if (!(x in game.board.squares)) game.board.squares[x] = {};

        piece.x = x;
        piece.y = y;
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