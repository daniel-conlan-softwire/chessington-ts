import Piece from './piece';
import Player from '../player';
import Board from '../board';
import GameSettings from '../gameSettings';
import Square from '../square';
import SquareState from '../squareState';

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {

        const availableMoves = new Array();
        const currentPosition = board.findPiece(this);

        const offsetDirections = [
            [1, 0], [-1, 0],
            [0, 1], [0, -1],
        ];

        for (let [rowOffsetDirection, colOffsetDirection] of offsetDirections) {
            for (let offset = 1; offset < GameSettings.BOARD_SIZE; offset++) {

                const nextSquare = new Square(
                    currentPosition.row + offset * rowOffsetDirection,
                    currentPosition.col + offset * colOffsetDirection
                );

                if (this.isSquareAvailable(nextSquare, board)) {
                    availableMoves.push(nextSquare);
                }

                if (this.isSquareBlocking(nextSquare, board)) {
                    break;
                }

            }
        }

        return availableMoves;
    }

}
