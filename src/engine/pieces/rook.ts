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

        // Upwards
        for (let offset = 1; offset < GameSettings.BOARD_SIZE; offset++) {
            const nextSquare = new Square(currentRow + offset, currentCol);

            if (!board.squareOccupied(nextSquare)) {
                availableMoves.push(nextSquare);
            }
        }

        // Downards
        for (let offset = 1; offset < GameSettings.BOARD_SIZE; offset++) {
            const nextSquare = new Square(currentRow - offset, currentCol);

            if (!board.squareOccupied(nextSquare)) {
                availableMoves.push(nextSquare);
            }
        }

        // Left
        for (let offset = 1; offset < GameSettings.BOARD_SIZE; offset++) {
            const nextSquare = new Square(currentRow, currentCol - offset);

            if (!board.squareOccupied(nextSquare)) {
                availableMoves.push(nextSquare);
            }
        }

        // Right
        for (let offset = 1; offset < GameSettings.BOARD_SIZE; offset++) {
            const nextSquare = new Square(currentRow, currentCol + offset);

            if (!board.squareOccupied(nextSquare)) {
                availableMoves.push(nextSquare);
            }
        }


        return availableMoves;
    }
}
