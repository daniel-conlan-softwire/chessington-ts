import Player from './player';
import GameSettings from './gameSettings';
import Square from './square';
import Piece from './pieces/piece';
import SquareState from './squareState';
import King from './pieces/king';
import Pawn from './pieces/pawn';
import Queen from './pieces/queen';

class Move {
    fromSquare: Square;
    toSquare: Square;
    piece: Piece;


    constructor(from: Square,
        to: Square,
        piece: Piece,

    ) {
        this.fromSquare = from;
        this.toSquare = to;
        this.piece = piece;
    }
}

export default class Board {
    public currentPlayer: Player;
    private readonly board: (Piece | undefined)[][];

    public moves: Array<Move> = new Array();

    public constructor(currentPlayer?: Player) {
        this.currentPlayer = currentPlayer ? currentPlayer : Player.WHITE;
        this.board = this.createBoard();
    }

    public setPiece(square: Square, piece: Piece | undefined) {
        this.board[square.row][square.col] = piece;
    }

    public getPiece(square: Square) {
        if (square.row >= GameSettings.BOARD_SIZE || square.row < 0) return undefined;
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

            const nextSquareState = this.squareState(toSquare);

            this.setPiece(toSquare, movingPiece);
            this.setPiece(fromSquare, undefined);

            movingPiece.hasMoved = true;
            if (movingPiece instanceof Pawn) {
                this.checkSpecialPawnMoves(toSquare, fromSquare, movingPiece, nextSquareState);
            } else if (movingPiece instanceof King) {
                this.checkSpecialKingMoves(toSquare, fromSquare, movingPiece);
            }
            this.moves.push(new Move(
                fromSquare,
                toSquare,
                movingPiece,
            ));
            this.swapPlayer();
        }
    }

    private checkSpecialPawnMoves(toSquare: Square, fromSquare: Square, movingPiece: Piece, nextSquareState: SquareState) {

        // Pawn Promotion
        if (toSquare.row === (this.currentPlayer === Player.WHITE ? 7 : 0)) {
            this.setPiece(toSquare, new Queen(
                movingPiece.player
            ));

            // En Passant
        } else if (fromSquare.col !== toSquare.col && nextSquareState === SquareState.Free) {
            const targetPawnSquare = Square.at(fromSquare.row, toSquare.col);
            this.setPiece(targetPawnSquare, undefined);
        }

    }

    private checkSpecialKingMoves(toSquare: Square, fromSquare: Square, movingPiece: Piece) {

        const diff = toSquare.col - fromSquare.col;
        const kingHasCastled = Math.abs(diff) === 2;

        if (kingHasCastled) {
            const isCastleRight = (diff === 2);
            const rookFrom = Square.at(toSquare.row, isCastleRight ? 7 : 0);
            const rookTo = Square.at(toSquare.row, toSquare.col + (isCastleRight ? -1 : 1));
            const rook = this.getPiece(rookFrom);

            this.setPiece(rookTo, rook);
            this.setPiece(rookFrom, undefined);
            rook!.hasMoved = true;
            return new Move(
                rookFrom,
                rookTo,
                rook!,
            );
        }
        return null;

    }

    private swapPlayer() {
        this.currentPlayer = (this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE);
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

    public isRowPathFree(row: number, columnFrom: number, columnTo: number) {

        if (columnFrom > columnTo) {
            [columnFrom, columnTo] = [columnTo, columnFrom];
        }

        for (let column = columnFrom + 1; column < columnTo; column++) {
            if (this.squareState(Square.at(row, column)) !== SquareState.Free) {
                return false;
            }
        }

        return true;
    }

    public findKing(player: Player) : [King, number, number] | null {
        for (let row = 0; row < GameSettings.BOARD_SIZE; row++) for (let column = 0; column < GameSettings.BOARD_SIZE; column++) {
            const piece = this.getPiece(Square.at(row, column));
            if (piece instanceof King && piece.player === player) {
                return [piece, row, column];
            }
        }
        return null;
    }

    public isCheck(player: Player, position?: Square) : boolean {
        const [king, currentRow, currentCol] = this.findKing(player)!;
        const row = position?.row ?? currentRow;
        const column = position?.col ?? currentCol;
        for (let r = 0; r < GameSettings.BOARD_SIZE; r++) for (let c = 0; c < GameSettings.BOARD_SIZE; c++) {
            const piece = this.getPiece(Square.at(r, c)) ?? null;
            if (piece !== null) {
                if (piece.player !== player) {
                    console.log(piece._getAvailableMoves(this).kingSquares);
                    if (piece._getAvailableMoves(this).kingSquares.findIndex((s) => s.row === row && s.col === column) !== -1) {
                        console.log("returning true");
                        return true;
                    }
                }
            }
        }
        return false;
    }
}
