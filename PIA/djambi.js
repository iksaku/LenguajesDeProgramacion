class Piece {
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

    onCapture() {
        this.alive = false;
        // TODO: Make corpse...
    }

    calculatePossibleMoves() {
        // TODO...
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
                    (Math.abs(x - targetSquare.x) <= this.stepLimit) || 
                    (Math.abs(y - targetSquare.y) <= this.stepLimit);
        }
        else if (Math.abs(x - targetSquare.x) == Math.abs(y - targetSquare.y)) {
            isDiagonalMove = true;
            isInValidDirection =
                    this.stepLimit == null ||
                    Math.abs(x - targetSquare.x) <= this.stepLimit;
        }

        if (!isInValidDirection) return false;

        xStep = (x == targetSquare.x ? 0 : (x < targetSquare.x ? 1 : -1));
        yStep = (y == targetSquare.y ? 0 : (y < targetSquare.y ? 1 : -1));
        currentSquare = this.square;

        if (isDiagonalMove) {
            for (x += xStep, y += xStep; currentSquare != targetSquare; x += xStep, y += yStep) {
                currentSquare = this.square.board.getSquare(x, y);
                if (currentSquare.piece != null) return false;
            }
        } else {
            for (x += xStep; currentSquare != targetSquare; x += xStep) {
                for (y += yStep; currentSquare != targetSquare; y += yStep) {
                    currentSquare = this.square.board.getSquare(x, y);
                    if (currentSquare.piece != null) return false;
                }
            }
        }

        if (targetSquare.piece.isAlive()) {
            return this.canKill() || this.canMovePiece();
        } else {
            return this.canMoveCorpse();
        }
    }

    moveTo(targetSquare) {
        if (!this.couldMoveTo(targetSquare)) {
            // TODO: Alert
            return;
        }

        this.square.piece = null;

        movedPiece = targetSquare.piece;
        targetSquare.piece = this;

        if (movedPiece.isAlive() && this.canKill()) movedPiece.alive = false;

        this.player.moving = movedPiece;
    }

    onMove(targetSquare) {
        // TODO: Implement, so pieces with different effects on move can be modified
    }
}

class Chief extends Piece {}
class Assassin extends Piece {}
class Reporter extends Piece {}

class Militant extends Piece {
    constructor(player, square) {
        super(player, square);
        this.stepLimit = 2;
    }
}

class Diplomat extends Piece {
    get canKill() {
        return false;
    }

    get canMovePiece() {
        return false;
    }
}

class Necromobile extends Piece {
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
        return Board.columnLetter(this.y).toLowerCase() + (this.x + 1);
    }

    get isOcuppied() {
        return this.piece !== null;
    }

    get piece() {
        return this.ownedPiece;
    }

    set piece(piece) {
        this.ownedPiece = piece;
        this.render();
    }

    render() {
        var square = document.getElementById(this.displayName);
        square.innerHTML = "";
        square.className = "";

        if (this.isCenter) square.className += "centerSquare";

        if (this.piece == null) return;

        var toAppend;
        switch(this.piece.constructor) {
            case Chief:
                toAppend = "C";
                break;
            case Assassin:
                toAppend = "A";
                break;
            case Reporter:
                toAppend = "R";
                break;
            case Militant:
                toAppend = "M";
                break;
            case Diplomat:
                toAppend = "D";
                break;
            case Necromobile:
                toAppend = "N";
                break;
        }

        square.className += this.piece.player.color.toLowerCase();
        square.innerHTML = toAppend;
    }
}

class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.moving = null;
    }

    get color() {
        return Board.playerColor(this.id);
    }

    onClick(targetSquare) {
        if (this.moving == null) {
            if (targetSquare.piece == null) return;
            this.moving = targetSquare.piece;
        } else {
            // Try moving
            this.moving.moveTo(targetSquare);
        }
    }
}

class Board {
    static columnLetter(column) {
        let columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
        return columns[column];
    }

    static playerColor(id) {
        // TODO: Make sure these colors are correcly represented in CSS...
        // Or change this colors to respective Hexadecimal colors...
        // BTW... This is the actual order of play :D
        let colors = ["Red", "Blue", "Yellow", "Green"];
        return colors[id];
    }

    getSquare(x, y) {
        try {
            return this.squares[x][y];
        } catch (TypeError) {
            return null;
        }
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
                board.innerHTML += '<div id="' + square.displayName + '"></div>';
                square.render();
            }
        }

        // Set Players
        this.players = []
        for (var count = 0; count < 4; count++) {
            var player = new Player(count, "Player " + (count + 1));
            this.players[count] = player;

            // Set Pieces
            let xStart = player.id < 2 ? 8 : 0;
            let yStart = player.id % 2 == 0 ? 0 : 8;
            let xStep = player.id < 2 ? -1 : 1;
            let yStep = player.id % 2 == 0 ? 1 : -1;

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

var board = new Board();
board.regenerate();