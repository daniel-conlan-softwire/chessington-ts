import Piece from './piece';
import Player from '../player';
import Board from '../board';
import GameSettings from '../gameSettings';
import Square from '../square';
import SquareState from '../squareState';
import Rook from './rook';

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const availableMoves = new Array();
        const currentPosition = board.findPiece(this);

        // Standard Moves
        const offsets = [1, 0, -1];

        for (let rowOffset of offsets) {
            for (let colOffset of offsets) {

                const nextSquare = new Square(
                    currentPosition.row + rowOffset,
                    currentPosition.col + colOffset
                );

                if (this.isSquareAvailable(nextSquare, board)) {
                    availableMoves.push(nextSquare);
                }
                
            }
        }

        // Castling
        if (!this.hasMoved) {

            for (let castleDirection of [-1, 1]) {

                const rookColumn = (castleDirection === -1) ? 0 : 7;

                let rookPiece = board.getPiece(Square.at(
                    currentPosition.row,
                    rookColumn
                ));

                if (rookPiece instanceof Rook && !rookPiece.hasMoved && board.isRowPathFree(currentPosition.row, rookColumn, currentPosition.col)) {
                    availableMoves.push(Square.at(currentPosition.row, currentPosition.col + 2*castleDirection));
                }

            }

        }      

        return availableMoves;
    }
}
