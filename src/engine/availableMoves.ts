import Square from "./square";

export default class AvailableMoves {
    public availableSquares: Square[];
    public blockingSquares: Square[];
    public kingSquares: Square[];

    public constructor() {
        this.availableSquares = [];
        this.blockingSquares = [];
        this.kingSquares = [];
    }
}