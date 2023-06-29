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

        // if (king not moved) {

        //     if (left rook not moved) {
        //         Add castling square
        //     }

        //     if (right rook not moved) {
        //         Add castling square
        //     }

        // }

        // Castling
        if (!this.hasMoved) {

            // left rook
            let leftRook = board.getPiece(Square.at(
                currentPosition.row,
                0
            ));

            if (leftRook instanceof Rook && !leftRook.hasMoved && board.isRowPathFree(currentPosition.row, 0, currentPosition.col)) {
                availableMoves.push(Square.at(currentPosition.row, currentPosition.col - 2));
            }

            // right rook
            let rightRook = board.getPiece(Square.at(
                currentPosition.row,
                7
            ));

            if (rightRook instanceof Rook && !rightRook.hasMoved && board.isRowPathFree(currentPosition.row, 7, currentPosition.col)) {
                availableMoves.push(Square.at(currentPosition.row, currentPosition.col + 2));
            }

            // for (let castleDirection of [1, -1]) {

            //     let rookPiece = board.getPiece(Square.at(
            //         currentPosition.row,
            //         (GameSettings.BOARD_SIZE + castleDirection) % GameSettings.BOARD_SIZE
            //     ));

            //     if (rookPiece instanceof Rook && !rookPiece.hasMoved) {
            //         availableMoves.push(Square.at(currentPosition.row, currentPosition.col + 2*castleDirection));
            //     }

            // }
        }      

        return availableMoves;
    }
}
