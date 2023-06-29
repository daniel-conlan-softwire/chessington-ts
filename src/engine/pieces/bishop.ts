import Piece from './piece';
import Player from '../player';
import Board from '../board';
import GameSettings from '../gameSettings';
import Square from '../square';
import SquareState from '../squareState';
import AvailableMoves from '../availableMoves';

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public _getAvailableMoves(board: Board) {

        const availableMoves = new AvailableMoves();
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
