import Player from './player';
import GameSettings from './gameSettings';
import Square from './square';
import Piece from './pieces/piece';
import SquareState from './squareState';
import King from './pieces/king';
import Pawn from './pieces/pawn';
import Queen from './pieces/queen';

export default class Board {
    public currentPlayer: Player;
    private readonly board: (Piece | undefined)[][];

    public constructor(currentPlayer?: Player) {
        this.currentPlayer = currentPlayer ? currentPlayer : Player.WHITE;
        this.board = this.createBoard();
    }

    public setPiece(square: Square, piece: Piece | undefined) {
        this.board[square.row][square.col] = piece;
    }

    public getPiece(square: Square) {
        return this.board[square.row][square.col];
    }

    public findPiece(pieceToFind: Piece) {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === pieceToFind) {
                    return Square.at(row, col);
                }
            }
        }
        throw new Error('The supplied piece is not on the board');
    }

    public movePiece(fromSquare: Square, toSquare: Square) {
        const movingPiece = this.getPiece(fromSquare);
        if (!!movingPiece && movingPiece.player === this.currentPlayer) {
            this.setPiece(toSquare, movingPiece);
            this.setPiece(fromSquare, undefined);

            if (movingPiece instanceof Pawn && toSquare.row === (this.currentPlayer === Player.WHITE ? 7 : 0)) {
                this.setPiece(toSquare, new Queen(
                    movingPiece.player
                ));
            }
            
            this.currentPlayer = (this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE);

        }
    }

    private createBoard() {
        const board = new Array(GameSettings.BOARD_SIZE);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(GameSettings.BOARD_SIZE);
        }
        return board;
    }

    public squareOccupied(position: Square): boolean {
        if (position.row >= GameSettings.BOARD_SIZE || position.col >= GameSettings.BOARD_SIZE || position.row < 0 || position.col < 0) return true;
        return typeof (this.getPiece(position)) != "undefined";
    }

    public squareState(position: Square): SquareState {

        if (
            position.col >= GameSettings.BOARD_SIZE
            || position.col < 0
            || position.row >= GameSettings.BOARD_SIZE
            || position.row < 0
        ) {
            return SquareState.OutOfBounds;
        }

        const piece = this.getPiece(position);


        if (typeof (piece) == "undefined") {
            return SquareState.Free;
        } else if (piece instanceof King) {
            return SquareState.King;
        } else if (piece.player == Player.WHITE) {
            return SquareState.White;
        } else {
            return SquareState.Black
        }

    }

}
