import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import SquareState from '../squareState';

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
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
        const availableMoves = new Array();

        for (let [rowOffset, colOffset] of offsets) {

            const nextSquare = new Square(current.row + rowOffset, current.col + colOffset);

            if (this.isSquareAvailable(nextSquare, this.player, board)) {
                availableMoves.push(nextSquare);
            }

        }

        return availableMoves;
    }
}
