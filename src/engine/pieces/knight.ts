import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import SquareState from '../squareState';

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const offsets = [
            [1, 2],
            [2, 1],
            [-1, 2],
            [2, -1],
            [-2, 1],
            [1, -2],
            [-1, -2],
            [-2, -1],
        ];

        const current = board.findPiece(this);
        const availableMoves = new Array();

        for (let [x, y] of offsets) {
            const nextSquare = new Square(current.row + y, current.col + x);


            switch (board.squareState(nextSquare)) {
                case SquareState.White:
                    if (this.player === Player.BLACK) availableMoves.push(nextSquare);
                    break;
                case SquareState.Black:
                    if (this.player === Player.WHITE) availableMoves.push(nextSquare);
                    break;
                case SquareState.Free:
                    availableMoves.push(nextSquare);
                    break;
                case SquareState.OutOfBounds:
                case SquareState.King:
                    break;
            }

        }

        return availableMoves;
    }
}
