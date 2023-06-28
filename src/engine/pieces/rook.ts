import Piece from './piece';
import Player from '../player';
import Board from '../board';
import GameSettings from '../gameSettings';
import Square from '../square';

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {

        const availableMoves = new Array();
        const currentPosition = board.findPiece(this);
        const currentRow = currentPosition.row;
        const currentCol = currentPosition.col;

        const mults = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ]

        // Upwards
        for (let [rowMult, colMult] of mults) {
            for (let offset = 1; offset < GameSettings.BOARD_SIZE; offset++) {
                const nextSquare = new Square(currentRow + offset*rowMult, currentCol + offset*colMult);

                if (!board.squareOccupied(nextSquare)) {
                    availableMoves.push(nextSquare);
                } else break;
            }
        }

        return availableMoves;
    }
}
