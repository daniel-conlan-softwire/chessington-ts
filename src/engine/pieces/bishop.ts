import Piece from './piece';
import Player from '../player';
import Board from '../board';
import GameSettings from '../gameSettings';
import Square from '../square';

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const availableMoves = new Array();
        const currentPosition = board.findPiece(this);

        // Everywhere
        for (let leftMult of [1, -1]) for (let rightMult of [1, -1]) {
            for (let offset = 1; offset < GameSettings.BOARD_SIZE; offset++) {
                const nextSquare = new Square(currentPosition.row + offset*leftMult, currentPosition.col + offset*rightMult);

                if (!board.squareOccupied(nextSquare)) {
                    availableMoves.push(nextSquare);
                } else break;
            }
        }

        return availableMoves;
    }
}
