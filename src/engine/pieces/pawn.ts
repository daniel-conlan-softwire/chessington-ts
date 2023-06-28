import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {

        const moveDirection = (this.player === Player.WHITE) ? 1 : -1;

        const availableMoves = new Array();
        const currentPosition = board.findPiece(this);
        const nextPosition = new Square(currentPosition.row + moveDirection, currentPosition.col);
        const nextPositionPiece = board.getPiece(nextPosition);

        if ((typeof nextPositionPiece) == "undefined") {
            availableMoves.push(nextPosition);
        }
        return availableMoves;

    }
}
