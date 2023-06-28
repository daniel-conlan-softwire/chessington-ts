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

        for (let x of offsets) for (let y of offsets) {
            const nextSquare = new Square(currentPosition.row + x, currentPosition.col + y);
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
