import Player from '../player';
import Board from '../board';
import Square from '../square';
import SquareState from '../squareState';

export default class Piece {
    public player: Player;

    public constructor(player: Player) {
        this.player = player;
    }

    public getAvailableMoves(board: Board) {
        throw new Error('This method must be implemented, and return a list of available moves');
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
