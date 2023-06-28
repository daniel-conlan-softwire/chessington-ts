import Piece from './piece';
import Player from '../player';
import Board from '../board';
import GameSettings from '../gameSettings';
import Square from '../square';
import SquareState from '../squareState';

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {

        const availableMoves = new Array();
        const currentPosition = board.findPiece(this);

        // Everywhere
        for (let rowOffsetDirection of [1, -1]) {
            for (let colOffsetDirection of [1, -1]) {
                for (let offset = 1; offset < GameSettings.BOARD_SIZE; offset++) {

                    const nextSquare = new Square(
                        currentPosition.row + offset*rowOffsetDirection,
                        currentPosition.col + offset*colOffsetDirection
                    );

                    if (this.isSquareAvailable(nextSquare, this.player, board)) {
                        availableMoves.push(nextSquare);
                    }

                    if (this.isSquareBlocking(nextSquare, this.player, board)) {
                        break;
                    }

                }
            }
        }

        return availableMoves;
    }
}
