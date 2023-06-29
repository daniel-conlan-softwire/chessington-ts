import Piece from './piece';
import Player from '../player';
import Board from '../board';
import GameSettings from '../gameSettings';
import Square from '../square';
import SquareState from '../squareState';
import AvailableMoves from '../availableMoves';

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public _getAvailableMoves(board: Board) {

        const availableMoves = new AvailableMoves();
        const currentPosition = board.findPiece(this);

        const offsetDirections = [-1, 0, 1];

        for (let rowOffsetDirection of offsetDirections) {
            for (let colOffsetDirection of offsetDirections) {

                if (rowOffsetDirection == 0 && colOffsetDirection == 0) continue;

                for (let offset = 1; offset < GameSettings.BOARD_SIZE; offset++) {

                    const nextSquare = new Square(
                        currentPosition.row + offset * rowOffsetDirection,
                        currentPosition.col + offset * colOffsetDirection
                    );

                    if (this.isSquareAvailable(nextSquare, this.player, board)) {
                        availableMoves.availableSquares.push(nextSquare);
                    } else if (board.squareState(nextSquare) === SquareState.King) {
                        availableMoves.kingSquares.push(nextSquare);
                    }

                    if (this.isSquareBlocking(nextSquare, this.player, board)) {
                        availableMoves.blockingSquares.push(nextSquare);
                        break;
                    }

                }
            }
        }

        return availableMoves;
    }
}
