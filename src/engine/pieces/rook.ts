import Piece from './piece';
import Player from '../player';
import Board from '../board';
import GameSettings from '../gameSettings';
import Square from '../square';
import SquareState from '../squareState';

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {

        const availableMoves = new Array();
        const currentPosition = board.findPiece(this);

        const mults = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ]

        // Upwards
        for (let [rowMult, colMult] of mults) {
            for (let offset = 1; offset < GameSettings.BOARD_SIZE; offset++) {
                const nextSquare = new Square(currentPosition.row + offset * rowMult, currentPosition.col + offset * colMult);

                let earlyBreak = false;

                switch (board.squareState(nextSquare)) {
                    case SquareState.White:
                        if (this.player === Player.BLACK) availableMoves.push(nextSquare);
                        earlyBreak = true;
                        break;
                    case SquareState.Black:
                        if (this.player === Player.WHITE) availableMoves.push(nextSquare);
                        earlyBreak = true;
                        break;
                    case SquareState.OutOfBounds:
                        earlyBreak = true; break;
                    case SquareState.Free:
                        availableMoves.push(nextSquare);
                        break;
                    case SquareState.King:
                        earlyBreak = true;
                        break;
                }

                if (earlyBreak) break;
            }
        }

        return availableMoves;
    }
}
