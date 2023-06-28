import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import GameSettings from '../gameSettings';
import SquareState from '../squareState';

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {

        const moveDirection = (this.player === Player.WHITE) ? 1 : -1;

        const availableMoves = new Array();
        const currentPosition = board.findPiece(this);
        const nextPosition = new Square(currentPosition.row + moveDirection, currentPosition.col);

        if (!board.squareOccupied(nextPosition)) {
            availableMoves.push(nextPosition);

            const row = this.player === Player.WHITE ? 1 : GameSettings.BOARD_SIZE - 2;

            if (currentPosition.row === row) {
                const doubleMovePosition = new Square(nextPosition.row + moveDirection, currentPosition.col);
                if (!board.squareOccupied(doubleMovePosition)) {
                    availableMoves.push(doubleMovePosition);
                }
            }
        }

        for (let takeDirection of [-1, 1]) {

            const nextSquare = new Square(
                currentPosition.row + moveDirection,
                currentPosition.col + takeDirection
            );

            if (this.isSquareAvailable(nextSquare, this.player, board)) {
                availableMoves.push(nextSquare);
            }
            
        }

        return availableMoves;
    }

    protected isSquareAvailable(square: Square, player: Player, board: Board): boolean {
        switch (board.squareState(square)) {
            case SquareState.White:
                return this.player === Player.BLACK;
            case SquareState.Black:
                return this.player === Player.WHITE;
            case SquareState.Free:
            case SquareState.King:
            case SquareState.OutOfBounds:
                return false;
        }
    }
}
