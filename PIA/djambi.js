class GenericPiece {
    constructor(player, square) {
        this.player = player;
        this.square = square;
        this.alive = true;
        this.stepLimit = null;
    }

    get isAlive() {
        return this.alive;
    }

    get canKill() {
        return true;
    }

    get canMovePiece() {
        return false;
    }

    get canMoveCorpse() {
        return false;
    }

    couldMoveTo(targetSquare) {
        if (targetSquare == this.square) return false;

        var isInValidDirection = false;
        var isDiagonalMove = false;

        var x = this.square.x;
        var y = this.square.y;

        if (x == targetSquare.x || y == targetSquare.y) {
            isInValidDirection =
                    this.stepLimit == null ||
                    ((Math.abs(x - targetSquare.x) <= this.stepLimit) && 
                    (Math.abs(y - targetSquare.y) <= this.stepLimit));
        }
        else if (Math.abs(x - targetSquare.x) == Math.abs(y - targetSquare.y)) {
            isDiagonalMove = true;
            isInValidDirection =
                    this.stepLimit == null ||
                    Math.abs(x - targetSquare.x) <= this.stepLimit;
        }

        if (!isInValidDirection) return false;

        var xStep = (x == targetSquare.x ? 0 : (x < targetSquare.x ? 1 : -1));
        var yStep = (y == targetSquare.y ? 0 : (y < targetSquare.y ? 1 : -1));
        var currentSquare = this.square;
        
        for (x += xStep, y += yStep; ((currentSquare.x - targetSquare.x) * xStep <= 0) && ((currentSquare.y - targetSquare.y) * yStep <= 0); x += xStep, y += yStep) {
            currentSquare = this.square.board.getSquare(x, y);
            if (currentSquare == targetSquare) break;
            else if (currentSquare.piece != null) return false;
        }

        if (targetSquare.piece == null)
            return true;
        else if (targetSquare.piece.isAlive)
            return this.canKill() || this.canMovePiece();
        else
            return this.canMoveCorpse();
    }

    moveTo(targetSquare) {
        if (!this.couldMoveTo(targetSquare)) {
            alert("Movimiento no valido");
            return false;
        }

        this.square.piece = null;

        var targetPiece = targetSquare.piece;

        targetSquare.piece = this;
        this.square = targetSquare;

        this.player.clean();

        if (targetPiece != null) {
            if (targetPiece.isAlive() && this.canKill()) targetPiece.alive = false;
            this.player.moving = targetPiece;
            // TODO: Tell to drop corpse or moved piece in other square...
        }

        return true;
    }

    onCapture() {
        // TODO: Make corpse...
    }

    calculatePossibleMoves() {
        // TODO... Maybe?
    }

    onMove(targetSquare) {
        // TODO: Implement, so pieces with different effects on move can be modified
    }
}

class Chief extends GenericPiece {}

class Assassin extends GenericPiece {}

class Reporter extends GenericPiece {}

class Militant extends GenericPiece {
    constructor(player, square) {
        super(player, square);
        this.stepLimit = 2;
    }
}

class Diplomat extends GenericPiece {
    get canKill() {
        return false;
    }

    get canMovePiece() {
        return false;
    }

    // Based on ruling... There's no mention that Diplomat can't move another piece of its same owner...
}

class Necromobile extends GenericPiece {
    get canKill() {
        return false;
    }

    get canMoveCorpse() {
        return false;
    }
}

class Square {
    constructor(x, y, board, isCenter = false) {
        this.x = x;
        this.y = y;
        this.isCenter = isCenter;
        this.ownedPiece = null;
        this.board = board;
    }

    get displayName() {
        return Board.getColumnLetter(this.y) + (this.x + 1);
    }

    get isOcuppied() {
        return this.piece !== null;
    }

    get piece() {
        return this.ownedPiece;
    }

    set piece(piece) {
        this.ownedPiece = piece;
        if (this.ownedPiece == null) this.highlight = false;

        this.render();
    }

    render() {
        var square = document.getElementById(this.displayName);
        square.innerHTML = "";
        square.className = "";

        if (this.highlight) square.className += "highlight ";
        if (this.isCenter) square.className += "centerSquare ";

        if (this.piece == null) return;

        square.className += this.piece.player.color.toLowerCase();
        square.innerHTML = game.svg.get(this.piece);
    }
}

class Player {
    constructor(id) {
        this.id = id;
        this.name = "Jugador " + (id + 1);
        this.moving = null;
    }

    get color() {
        return Board.playerColor(this.id);
    }

    clean(turnContinues = false) {
        if (this.moving != null) {
            this.moving = null;
        }
        
        if (turnContinues) {
            this.onTurnBegin(true);
        }
    }
    
    onTurnBegin(highlightPieces = false) {
        document.getElementById("board").className =
            this.color.toLowerCase() + "-turn";
        
        if (highlightPieces) {
            document.getElementById("board").className +=
                " " + this.color.toLowerCase() + "-turn-highlight";
        }
    }

    onClick(square) {
        if (square.piece != null && square.piece.player != this) return;

        if (this.moving == null) {
            if (square.piece == null) return;

            this.moving = square.piece;
            square.highlight = true;
            square.render();
            
            this.onTurnBegin(false);
        }
        else if (this.moving == square.piece) {
            square.highlight = false;
            square.render();
            this.clean(true);
        }
        else if (this.moving.moveTo(square)) {
            game.nextTurn();
        }
    }
}

class Board {
    constructor() {
        document.body.addEventListener("keypress", function (e) {
            if (e.key == "Escape") game.currentPlayer.clean();
        });
    }

    static get columns() {
        return ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
    }

    static getColumnLetter(column) {
        return Board.columns[column];
    }

    static playerColor(id) {
        // TODO: Make sure these colors are correcly represented in CSS...
        // Or change this colors to respective Hexadecimal colors...
        // BTW... This is the actual order of play :D
        let colors = ["Red", "Blue", "Yellow", "Green"];
        return colors[id];
    }

    static onClick(square) {
        var targetSquare = game.board.getSquareByName(square.id);

        game.currentPlayer.onClick(targetSquare);
    }

    getSquare(x, y) {
        try {
            return this.squares[x][y];
        } catch (TypeError) {
            return null;
        }
    }

    getSquareByName(name) {
        var x = parseInt(name[1]) - 1;
        var y = Board.columns.indexOf(name[0]);
        return this.getSquare(x, y);
    }

    regenerate() {
        // Empty the board
        var board = document.getElementById("board");
        board.innerHTML = "";

        // Set the board
        this.squares = []
        for (var x = 0; x < 9; x++) {
            this.squares[x] = [];

            for (var y = 0; y < 9; y++) {
                this.squares[x][y] = new Square(x, y, this, x == 4 && y == 4);
                
                let square = this.getSquare(x, y);
                board.innerHTML += '<div id="' + square.displayName + '" onclick="Board.onClick(this)"></div>';
                square.render();
            }
        }

        // Set Players
        this.players = []
        for (var count = 0; count < 4; count++) {
            var player = new Player(count);
            this.players[count] = player;

            // Set Pieces
            let xStart = player.id < 2 ? 8 : 0;
            let yStart = (player.id == 0 || player.id == 3) ? 0 : 8;
            let xStep = player.id < 2 ? -1 : 1;
            let yStep = (player.id == 0 || player.id == 3) ? 1 : -1;

            for (var x = xStart; (x >= 0 && x < 3) || (x >= 6 && x < 9); x += xStep) {
                for (var y = yStart; (y >= 0 && y < 3) || (y >= 6 && y < 9); y += yStep) {
                    let square = this.getSquare(x,y);
                    
                    let row = Math.abs(x - xStart);
                    let col = Math.abs(y - yStart);
                    var pieceType = null;
                    switch(row) {
                        case 0: // First Row
                            switch (col) {
                                case 0: // First Column
                                    pieceType = Chief;
                                    break;
                                case 1: // Second Column
                                    pieceType = Assassin;
                                    break;
                                case 2: // Third Column
                                    pieceType = Militant;
                                    break;
                            }
                            break;
                        case 1: // Second Row
                            switch (col) {
                                case 0: // First Column
                                    pieceType = Reporter;
                                    break;
                                case 1: // Second Column
                                    pieceType = Diplomat;
                                    break;
                                case 2: // Third Column
                                    pieceType = Militant;
                                    break;
                            }
                            break;
                        case 2: // Third Row
                            switch (col) {
                                case 0: // First Column
                                    pieceType = Militant;
                                    break;
                                case 1: // Second Column
                                    pieceType = Militant;
                                    break;
                                case 2: // Third Column
                                    pieceType = Necromobile;
                                    break;
                            }
                            break;
                    }

                    if (pieceType == null) continue;

                    square.piece = new pieceType(player, square);
                }
            }
        }
    }
}

class SVGStore {
    constructor() {
        this.store = {};
        this._requests = [];
        this.pieces.forEach(this.request);
    }

    get pieces() {
        return [Chief, Assassin, Reporter, Militant, Diplomat, Necromobile];
    }

    get ready() {
        for (var i = 0; i < this.pieces.length; ++i) {
            if (this.get(this.pieces[i]) == null) {
                return false;
            }
        }
        return true;
    }

    request(piece) {
        var name = String(piece.name);

        var xhr = new XMLHttpRequest();
        xhr.open("GET", getBasePath() + "/img/" + name.toLowerCase() + ".svg", true);
        xhr.overrideMimeType("img/svg+html");

        xhr.onload = function(e) {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    game.svg.store[name] = xhr.responseText;
                } else {
                    console.error(xhr.statusText);
                }
            }
        }
        xhr.onerror = function (e) {
            console.error(xhr.statusText);
        }

        xhr.send(null);
    }

    get(piece) {
        return this.store[piece.constructor.name];
    }
}

class Game {
    constructor() {
        this.svg = new SVGStore();
        this.board = new Board();
    }

    get currentPlayer() {
        return this.board.players[this.turn];
    }

    broadcastPlayerInTurn() {
        console.log("Turno actual: " + this.currentPlayer.name);
    }

    nextTurn() {
        if (this.currentPlayer != null) {
            this.currentPlayer.clean();
        }
        
        this.turn += 1;
        if (this.turn < 0 || this.turn > 3) this.turn = 0;
        this.broadcastPlayerInTurn();
        this.currentPlayer.onTurnBegin(true);
    }

    start() {
        setTimeout(() => {
            game.restart();
        }, 250);
    }

    restart() {
        this.turn = -1;
        this.board.regenerate();
        this.nextTurn();
    }
}

function getBasePath() {
    var actualPath = window.location.href;
    var parts = actualPath.split("/");
    parts.pop();
    return parts.join("/")
}

var game = new Game();
game.start();