import Queue from "./queue.js";

export default class ChessBoard {
    #MAX_BOARD_SIZE = 7; 
    #MIN_BOARD_SIZE = 0;

    #possibleMoves = [[2, 1], [-2, 1], [2, -1], [-2, -1], [1, -2], [1, 2], [-1, -2], [-1, 2]]

    calculateMoves(start, dest){
        let visitedSquares = [];

        visitedSquares = this.#initVisitedSquares(visitedSquares)

        visitedSquares[start[0]][start[1]] = null;

        let queue = new Queue();
        queue.enqueue(start); 

        while(!queue.isEmpty()){
            const currentSquare = queue.dequeue();
           
            if (this.#isFinalMove(currentSquare, dest)) {
                return this.#traceMovements(visitedSquares, currentSquare);
            }

            const possibleMoves = this.#getNeighborSquares(currentSquare);

            for (let move of possibleMoves){
                const x = move[0];
                const y = move[1];
                const square = visitedSquares[x][y];
                if ( square === undefined) {
                    queue.enqueue([x,y]);
                    visitedSquares[x][y] = currentSquare;
                }
            }
        }
    }

    #isFinalMove(move, dest){
        if (move[0] === dest[0] && move[1] === dest[1]) return true;
        else return false;
    }

    #traceMovements(visitedSquares, lastMove) {
        let result = [];

        result.push(lastMove);

        let x = lastMove[0];
        let y = lastMove[1];

        let predecessor = visitedSquares[x][y];
        while (predecessor){
            result.push(predecessor);

            x = predecessor[0];
            y = predecessor[1];
            
            predecessor = visitedSquares[x][y];
        }
        return result.reverse();
    }

    

    #initVisitedSquares(visitedSquares){
        for (let i = 0; i <= this.#MAX_BOARD_SIZE; i++){
            for (let j = 0; j <= this.#MAX_BOARD_SIZE; j++){
                visitedSquares[i] = [];
            }
        }
        return visitedSquares;
    }

    #getNeighborSquares(start){
        let result = []; 
        let x = start[0];
        let y = start[1];
        
        for (let move of this.#possibleMoves){
            const dx = move[0];  
            const dy = move[1];

            const newX = dx + x;
            const newY = dy + y;

            if (newX <= this.#MAX_BOARD_SIZE
                && newX >= 0
                && newY <= this.#MAX_BOARD_SIZE
                && newY >= 0){
                    result.push([x+dx, y+dy]);
                } 
        }
        
        return result;
    }
}
