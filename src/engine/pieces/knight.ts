import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import SquareState from '../squareState';
import AvailableMoves from '../availableMoves';

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public _getAvailableMoves(board: Board) : AvailableMoves {
        const offsets = [
            [1, 2],
            [2, 1],
            [-1, 2],
            [2, -1],
            [-2, 1],
            [1, -2],
            [-1, -2],
            [-2, -1],
        ];

        const current = board.findPiece(this);
        const availableMoves = new AvailableMoves();

        for (let [rowOffset, colOffset] of offsets) {

            const nextSquare = new Square(current.row + rowOffset, current.col + colOffset);

            if (this.isSquareAvailable(nextSquare, this.player, board)) {
                availableMoves.availableSquares.push(nextSquare);
            } else if (board.squareState(nextSquare) === SquareState.King) {
                availableMoves.kingSquares.push(nextSquare);
            }

        }

        return availableMoves;
    }
}
