import King from '../../../src/engine/pieces/king';
import Board from '../../../src/engine/board';
import Player from '../../../src/engine/player';
import Square from '../../../src/engine/square';
import Pawn from '../../../src/engine/pieces/pawn';
import Rook from '../../../src/engine/pieces/rook';
import Bishop from '../../../src/engine/pieces/bishop';
import { expect } from 'chai';

describe('King', () => {
    let board: Board;
    beforeEach(() => board = new Board());

    it('can move to adjacent squares', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(3, 4), king);

        const moves = king.getAvailableMoves(board);

        const expectedMoves = [
            Square.at(2, 3), Square.at(2, 4), Square.at(2, 5), Square.at(3, 5),
            Square.at(4, 5), Square.at(4, 4), Square.at(4, 3), Square.at(3, 3)
        ];

        moves.should.deep.include.members(expectedMoves);
    });

    it('cannot make any other moves', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(3, 4), king);

        const moves = king.getAvailableMoves(board);

        moves.should.have.length(8);
    });

    it('cannot leave the board', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(0, 0), king);

        const moves = king.getAvailableMoves(board);

        const expectedMoves = [Square.at(0, 1), Square.at(1, 1), Square.at(1, 0)];

        moves.should.have.deep.members(expectedMoves);
    });

    it('can take opposing pieces', () => {
        const king = new King(Player.WHITE);
        const opposingPiece = new Pawn(Player.BLACK);
        board.setPiece(Square.at(4, 4), king);
        board.setPiece(Square.at(5, 5), opposingPiece);

        const moves = king.getAvailableMoves(board);

        moves.should.deep.include(Square.at(5, 5));
    });

    it('cannot take the opposing king', () => {
        const king = new King(Player.WHITE);
        const opposingKing = new King(Player.BLACK);
        board.setPiece(Square.at(4, 4), king);
        board.setPiece(Square.at(5, 5), opposingKing);

        const moves = king.getAvailableMoves(board);
        moves.should.not.deep.include(Square.at(5, 5));
    });

    it('cannot take friendly pieces', () => {
        const king = new King(Player.WHITE);
        const friendlyPiece = new Pawn(Player.WHITE);
        board.setPiece(Square.at(4, 4), king);
        board.setPiece(Square.at(5, 5), friendlyPiece);

        const moves = king.getAvailableMoves(board);
        moves.should.not.deep.include(Square.at(5, 5));
    });

    describe('Castling (white)', () => {

        it('can castle left if possible', () => {
            const king = new King(Player.WHITE);
            const leftRook = new Rook(Player.WHITE);

            board.setPiece(Square.at(0, 3), king);
            board.setPiece(Square.at(0, 0), leftRook);

            const kingMoves = king.getAvailableMoves(board);
            kingMoves.should.deep.include(Square.at(0, 1));
        });

        it('can castle right if possible', () => {
            const king = new King(Player.WHITE);
            const rightRook = new Rook(Player.WHITE);

            board.setPiece(Square.at(0, 3), king);
            board.setPiece(Square.at(0, 7), rightRook);

            const kingMoves = king.getAvailableMoves(board);
            kingMoves.should.deep.include(Square.at(0, 5));
        });

        it('can\'t castle left if blocked', () => {
            const king = new King(Player.WHITE);
            const leftRook = new Rook(Player.WHITE);
            const blockingBishop = new Bishop(Player.WHITE);

            board.setPiece(Square.at(0, 3), king);
            board.setPiece(Square.at(0, 0), leftRook);
            board.setPiece(Square.at(0, 2), blockingBishop);

            const kingMoves = king.getAvailableMoves(board);
            kingMoves.should.not.deep.include(Square.at(0, 1));
        });

        it('can\'t castle right if blocked', () => {
            const king = new King(Player.WHITE);
            const rightRook = new Rook(Player.WHITE);
            const blockingBishop = new Bishop(Player.WHITE);

            board.setPiece(Square.at(0, 3), king);
            board.setPiece(Square.at(0, 7), rightRook);
            board.setPiece(Square.at(0, 5), blockingBishop);

            const kingMoves = king.getAvailableMoves(board);
            kingMoves.should.not.deep.include(Square.at(0, 5));
        });

        it('can\'t castle left if king has moved', () => {
            const king = new King(Player.WHITE);
            const leftRook = new Rook(Player.WHITE);

            board.setPiece(Square.at(0, 3), king);
            board.setPiece(Square.at(0, 0), leftRook);

            board.movePiece(Square.at(0, 3), Square.at(1, 3));
            board.movePiece(Square.at(1, 3), Square.at(0, 3));

            const kingMoves = king.getAvailableMoves(board);
            kingMoves.should.not.deep.include(Square.at(0, 1));
        });

        it('can\'t castle right if king has moved', () => {
            const king = new King(Player.WHITE);
            const rightRook = new Rook(Player.WHITE);

            board.setPiece(Square.at(0, 3), king);
            board.setPiece(Square.at(0, 7), rightRook);

            board.movePiece(Square.at(0, 3), Square.at(1, 3));
            board.movePiece(Square.at(1, 3), Square.at(0, 3));

            const kingMoves = king.getAvailableMoves(board);
            kingMoves.should.not.deep.include(Square.at(0, 5));
        });

        it('can\'t castle left if left rook has moved', () => {
            const king = new King(Player.WHITE);
            const leftRook = new Rook(Player.WHITE);

            board.setPiece(Square.at(0, 3), king);
            board.setPiece(Square.at(0, 0), leftRook);

            board.movePiece(Square.at(0, 0), Square.at(1, 0));
            board.movePiece(Square.at(1, 0), Square.at(0, 0));

            const kingMoves = king.getAvailableMoves(board);
            kingMoves.should.not.deep.include(Square.at(0, 1));
        });

        it('can\'t castle left if right rook has moved', () => {
            const king = new King(Player.WHITE);
            const rightRook = new Rook(Player.WHITE);

            board.setPiece(Square.at(0, 3), king);
            board.setPiece(Square.at(0, 7), rightRook);

            board.movePiece(Square.at(0, 7), Square.at(1, 7));
            board.movePiece(Square.at(1, 7), Square.at(0, 7));

            const kingMoves = king.getAvailableMoves(board);
            kingMoves.should.not.deep.include(Square.at(0, 5));
        });

        it('castling left is performed correctly', () => {
            const king = new King(Player.WHITE);
            const leftRook = new Rook(Player.WHITE);

            board.setPiece(Square.at(0, 4), king);
            board.setPiece(Square.at(0, 0), leftRook);

            board.movePiece(Square.at(0, 4), Square.at(0, 2));

            expect(board.getPiece(Square.at(0, 2))).instanceOf(King);
            expect(board.getPiece(Square.at(0, 3))).instanceOf(Rook);
        });

        it('castling right is performd correctly', () => {
            const king = new King(Player.WHITE);
            const rightRook = new Rook(Player.WHITE);

            board.setPiece(Square.at(0, 4), king);
            board.setPiece(Square.at(0, 7), rightRook);

            board.movePiece(Square.at(0, 4), Square.at(0, 6));

            expect(board.getPiece(Square.at(0, 6))).instanceOf(King);
            expect(board.getPiece(Square.at(0, 5))).instanceOf(Rook);
        });
    });

    describe('Castling (black)', () => {

        beforeEach(() => {
            board.currentPlayer = Player.BLACK;
        });

        it('can castle left if possible', () => {
            const king = new King(Player.BLACK);
            const leftRook = new Rook(Player.BLACK);

            board.setPiece(Square.at(7,3), king);
            board.setPiece(Square.at(7,0), leftRook);

            const kingMoves = king.getAvailableMoves(board);
            kingMoves.should.deep.include(Square.at(7,1));
        });

        it('can castle right if possible', () => {
            const king = new King(Player.BLACK);
            const rightRook = new Rook(Player.BLACK);

            board.setPiece(Square.at(7,3), king);
            board.setPiece(Square.at(7,7), rightRook);

            const kingMoves = king.getAvailableMoves(board);
            kingMoves.should.deep.include(Square.at(7,5));
        });

        it('can\'t castle left if blocked', () => {
            const king = new King(Player.BLACK);
            const leftRook = new Rook(Player.BLACK);
            const blockingBishop = new Bishop(Player.BLACK);

            board.setPiece(Square.at(7,3), king);
            board.setPiece(Square.at(7,0), leftRook);
            board.setPiece(Square.at(7,2), blockingBishop);

            const kingMoves = king.getAvailableMoves(board);
            kingMoves.should.not.deep.include(Square.at(7,1));
        });

        it('can\'t castle right if blocked', () => {
            const king = new King(Player.BLACK);
            const rightRook = new Rook(Player.BLACK);
            const blockingBishop = new Bishop(Player.BLACK);

            board.setPiece(Square.at(7,3), king);
            board.setPiece(Square.at(7,7), rightRook);
            board.setPiece(Square.at(7,5), blockingBishop);

            const kingMoves = king.getAvailableMoves(board);
            kingMoves.should.not.deep.include(Square.at(7,5));
        });
        

        it('can\'t castle left if king has moved', () => {
            const king = new King(Player.BLACK);
            const leftRook = new Rook(Player.BLACK);

            board.setPiece(Square.at(7,3), king);
            board.setPiece(Square.at(7,0), leftRook);

            board.movePiece(Square.at(7,3), Square.at(6, 3));
            board.movePiece(Square.at(6, 3), Square.at(7,3));

            const kingMoves = king.getAvailableMoves(board);
            kingMoves.should.not.deep.include(Square.at(7,1));
        });

        it('can\'t castle right if king has moved', () => {
            const king = new King(Player.BLACK);
            const rightRook = new Rook(Player.BLACK);

            board.setPiece(Square.at(7,3), king);
            board.setPiece(Square.at(7,7), rightRook);

            board.movePiece(Square.at(7,3), Square.at(6, 3));
            board.movePiece(Square.at(6, 3), Square.at(7,3));

            const kingMoves = king.getAvailableMoves(board);
            kingMoves.should.not.deep.include(Square.at(7,5));
        });

        it('can\'t castle left if left rook has moved', () => {
            const king = new King(Player.BLACK);
            const leftRook = new Rook(Player.BLACK);

            board.setPiece(Square.at(7,3), king);
            board.setPiece(Square.at(7,0), leftRook);

            board.movePiece(Square.at(7,0), Square.at(6, 0));
            board.movePiece(Square.at(6, 0), Square.at(7,0));

            const kingMoves = king.getAvailableMoves(board);
            kingMoves.should.not.deep.include(Square.at(7,1));
        });

        it('can\'t castle left if right rook has moved', () => {
            const king = new King(Player.BLACK);
            const rightRook = new Rook(Player.BLACK);

            board.setPiece(Square.at(7,3), king);
            board.setPiece(Square.at(7,7), rightRook);

            board.movePiece(Square.at(7,7), Square.at(6, 7));
            board.movePiece(Square.at(6, 7), Square.at(7,7));

            const kingMoves = king.getAvailableMoves(board);
            kingMoves.should.not.deep.include(Square.at(7,5));
        });

        it('castling left is performed correctly', () => {
            const king = new King(Player.BLACK);
            const leftRook = new Rook(Player.BLACK);

            board.setPiece(Square.at(7,3), king);
            board.setPiece(Square.at(7,0), leftRook);

            board.movePiece(Square.at(7,3), Square.at(7,1));

            expect(board.getPiece(Square.at(7,1))).instanceOf(King);
            expect(board.getPiece(Square.at(7,2))).instanceOf(Rook);
        });

        it('castling right is performd correctly', () => {
            const king = new King(Player.BLACK);
            const rightRook = new Rook(Player.BLACK);

            board.setPiece(Square.at(7,3), king);
            board.setPiece(Square.at(7,7), rightRook);

            board.movePiece(Square.at(7,3), Square.at(7,5));

            expect(board.getPiece(Square.at(7,5))).instanceOf(King);
            expect(board.getPiece(Square.at(7,4))).instanceOf(Rook);
        });
    });
});
