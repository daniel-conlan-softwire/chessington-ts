import Piece from './piece';
import Player from '../player';
import Board from '../board';
import GameSettings from '../gameSettings';
import Square from '../square';

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const availableMoves = new Array();
        const currentPosition = board.findPiece(this);
        const currentRow = currentPosition.row;
        const currentCol = currentPosition.col;


        const offsets = [1, 0, -1];

        for (let x of offsets) for (let y of offsets) {
            const nextSquare = new Square(currentRow + x, currentCol + y);
            if (!board.squareOccupied(nextSquare)) {
                availableMoves.push(nextSquare);
            }
        }
        return availableMoves;
    }
}
