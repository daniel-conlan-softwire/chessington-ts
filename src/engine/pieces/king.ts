import Piece from './piece';
import Player from '../player';
import Board from '../board';
import GameSettings from '../gameSettings';
import Square from '../square';
import SquareState from '../squareState';

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const availableMoves = new Array();
        const currentPosition = board.findPiece(this);

        const offsets = [1, 0, -1];

        for (let rowOffset of offsets) {
            for (let colOffset of offsets) {

                const nextSquare = new Square(
                    currentPosition.row + rowOffset,
                    currentPosition.col + colOffset
                );

                if (this.isSquareAvailable(nextSquare, this.player, board)) {
                    availableMoves.push(nextSquare);
                }
                
            }
        }
        return availableMoves;
    }
}
