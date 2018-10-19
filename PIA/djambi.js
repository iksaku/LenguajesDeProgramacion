class Piece {
    constructor(player, square) {
        this.player = owner;
        this.square = square;
        this.alive = true;
    }

    get isAlive() {
        return this.alive;
    }

    get canCapture() {
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

    highlightPossibleMoves() {
        // TODO...
    }

    movePiece(targetSquare) {
        this.square.piece = null;
        targetSquare.piece = this;
    }
}

class Chief extends Piece {}
class Assassin extends Piece {}
class Reporter extends Piece {}
class Militant extends Piece {}

class Diplomat extends Piece {
    get canCapture() {
        return false;
    }

    get canMovePiece() {
        return false;
    }
}

class Necromobile extends Piece {
    get canCapture() {
        return false;
    }

    get canMoveCorpse() {
        return false;
    }
}

class Square {
    constructor(x, y, isCenter = false) {
        this.x = x;
        this.y = y;
        this.isCenter = isCenter;
        this.piece = null;
    }

    get displayName() {
        return Board.columnLetter(this.y) + this.x;
    }

    get isOcuppied() {
        return this.piece !== null;
    }
}

class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    get color() {
        return Board.playerColor(this.id);
    }
}

class Board {
    constructor() {}

    static get columnLetter(column) {
        let columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
        return columns[column];
    }

    static get playerColor(id) {
        // TODO: Make sure these colors are correcly represented in CSS...
        // Or change this colors to respective Hexadecimal colors...
        // BTW... This is the actual order of play :D
        let colors = ["Red", "Blue", "Yellow", "Green"];
        return colors.id;
    }

    regenerate() {
        // Set the board
        this.squares = []
        for (var x = 0; x < 9; x++) {
            this.squares[x] = [];

            for (var y = 1; y <= 9; y++) {
                this.squares[x][y] = new Square(x, y, x == 5 && y == 5);
            }
        }

        // Set Players
        this.players = []
        for (var count = 0; count < 4; count++) {
            var player = new Player(count, "Player " + (count + 1));
            this.players[count] = player;

            // Set Pieces
            let xStart = player.id < 2 ? 9 : 0;
            let yStart = player.id % 2 == 0 ? 0 : 9;
            let xStep = player.id < 2 ? -1 : 1;
            let yStep = player.id % 2 == 0 ? 1 : -1;

            for (var x = xStart; (x >= 0 && x <= 3) || (x >= 7 && x <= 9); x += xStep) {
                for (var y = yStart; (y >= 0 && y <= 3) || (y >= 7 && y <= 9); y += yStep) {
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

        this.draw();
    }

    /**
     * 
     * @param {int} x 
     * @param {int} y 
     * @returns Square|null
     */
    getSquare(x, y) {
        try {
            return this.squares[x][y];
        } catch (TypeError) {
            return null;
        }
    }

    draw() {
        // TODO...
    }
}