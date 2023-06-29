import Player from '../player';
import Board from '../board';
import Square from '../square';
import SquareState from '../squareState';
import AvailableMoves from '../availableMoves';

export default abstract class Piece {
    public player: Player;
    public hasMoved: boolean;

    public constructor(player: Player) {
        this.player = player;
        this.hasMoved = false;
    }

    public abstract _getAvailableMoves(board: Board) : AvailableMoves;
    public getAvailableMoves(board: Board) {
        return this._getAvailableMoves(board).availableSquares;
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }

    protected isSquareAvailable(square: Square, player: Player, board: Board) {
        
        switch (board.squareState(square)) {
            case SquareState.White:
                return this.player === Player.BLACK;
            case SquareState.Black:
                return this.player === Player.WHITE;
            case SquareState.Free:
                return true;
            case SquareState.King:
            case SquareState.OutOfBounds:
                return false;
        }

    }

    protected isSquareBlocking(square: Square, player: Player, board: Board) {

        switch (board.squareState(square)) {
            case SquareState.White:
            case SquareState.Black:
            case SquareState.King:
            case SquareState.OutOfBounds:
                return true;
            case SquareState.Free:
                return false;
        }
    }
}
