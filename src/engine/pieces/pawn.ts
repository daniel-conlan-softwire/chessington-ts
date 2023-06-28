import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import GameSettings from '../gameSettings';
import SquareState from '../squareState';

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {

        const moveDirection = (this.player === Player.WHITE) ? 1 : -1;

        const availableMoves = new Array();
        const currentPosition = board.findPiece(this);
        const nextPosition = new Square(currentPosition.row + moveDirection, currentPosition.col);

        if (!board.squareOccupied(nextPosition)) {
            availableMoves.push(nextPosition);

            const row = this.player === Player.WHITE ? 1 : GameSettings.BOARD_SIZE - 2;

            if (currentPosition.row === row) {
                const doubleMovePosition = new Square(nextPosition.row + moveDirection, currentPosition.col);
                if (!board.squareOccupied(doubleMovePosition)) {
                    availableMoves.push(doubleMovePosition);
                }
            }
        }

        for (let x of [-1, 1]) {
            const nextSquare = new Square(currentPosition.row + moveDirection, currentPosition.col + x);

            switch (board.squareState(nextSquare)) {
                case SquareState.White:
                    if (this.player === Player.BLACK) availableMoves.push(nextSquare);
                    break;
                case SquareState.Black:
                    if (this.player === Player.WHITE) availableMoves.push(nextSquare);
                    break;
                case SquareState.Free:
                case SquareState.OutOfBounds:
                case SquareState.King:
                    break;
            }
        }

        return availableMoves;
    }
}
