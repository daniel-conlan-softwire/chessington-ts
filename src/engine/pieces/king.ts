import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import SquareState from '../squareState';
import Rook from './rook';
import AvailableMoves from '../availableMoves';

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public _getAvailableMoves(board: Board) : AvailableMoves {
        const availableMoves = new AvailableMoves();
        const currentPosition = board.findPiece(this);

        const offsets = [1, 0, -1];

        for (let rowOffset of offsets) {
            for (let colOffset of offsets) {

                const nextSquare = new Square(
                    currentPosition.row + rowOffset,
                    currentPosition.col + colOffset
                );

                if (this.isSquareAvailable(nextSquare, this.player, board)) {
                    if (!board.isCheck(this.player, nextSquare)) {
                        availableMoves.availableSquares.push(nextSquare);
                    }
                } else if (board.squareState(nextSquare) === SquareState.King) {
                    availableMoves.kingSquares.push(nextSquare);
                }

            }
        }
        // Castling
        if (!this.hasMoved) {

            // left rook
            let leftRook = board.getPiece(Square.at(
                currentPosition.row,
                0
            ));

            if (leftRook instanceof Rook && !leftRook.hasMoved && board.isRowPathFree(currentPosition.row, 0, currentPosition.col)) {
                availableMoves.availableSquares.push(Square.at(currentPosition.row, currentPosition.col - 2));
            }

            // right rook
            let rightRook = board.getPiece(Square.at(
                currentPosition.row,
                7
            ));

            if (rightRook instanceof Rook && !rightRook.hasMoved && board.isRowPathFree(currentPosition.row, 7, currentPosition.col)) {
                availableMoves.availableSquares.push(Square.at(currentPosition.row, currentPosition.col + 2));
            }

        }

        return availableMoves;
    }
}
