import Piece from './piece';
import Player from '../player';
import Board from '../board';
import GameSettings from '../gameSettings';
import Square from '../square';

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const availableMoves = new Array();
        const currentPosition = board.findPiece(this);

        const mults = [-1,0,1];

        for (let xMul of mults) for (let yMul of mults) {
            if (xMul == 0 && yMul == 0) continue;
            for (let offset = 1; offset < GameSettings.BOARD_SIZE; offset++) {
                const nextSquare = new Square(currentPosition.row + offset*yMul, currentPosition.col + offset*xMul);
    
                if (!board.squareOccupied(nextSquare)) {
                    availableMoves.push(nextSquare);
                } else break;
            }
        }

        return availableMoves;
    }
}
