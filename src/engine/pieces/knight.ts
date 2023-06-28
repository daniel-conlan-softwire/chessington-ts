import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

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

        for (let [x, y] of offsets) {
            const candidatePosition = new Square(current.row + y, current.col + x);

            if (!board.squareOccupied(candidatePosition)) availableMoves.push(candidatePosition);
        }

        return availableMoves;
    }
}
