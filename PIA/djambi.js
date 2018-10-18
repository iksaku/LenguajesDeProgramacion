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
        let colors = ["Green", "Yellow", "Red", "Blue"];
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
            this.players = new Player(count, "Player " + (count + 1));
        }

        this.draw();
    }

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