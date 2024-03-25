import ChessBoard from "./chessBoard.js";
export default class UI {
  #selectedSquares = [];

  constructor() {
    this.#populateBoard();
    this.#addSquareClickHandler();
  }

  get selectedSquares() {
    return this.#selectedSquares;
  }

  #addToSelectedSquares(x, y) {
    if (this.selectedSquares.length < 2) {
      this.#selectedSquares.push([+x, +y]);
    } else {
      this.#selectedSquares = [this.#selectedSquares[1], [+x, +y]];
    }
  }

  #populateBoard() {
    const board = document.querySelector(".chess__board");
    for (let i = 7; i >= 0; i--) {
      const row = document.createElement("div");
      row.classList.add("chess__board-row");

      for (let j = 0; j < 8; j++) {
        const elem = document.createElement("div");
        elem.classList.add("chess__board-element");
        elem.innerHTML = `<div class="chess__board-element-wrapper" data-x=${i} data-y=${j}></div>`;
        row.appendChild(elem);
      }
      board.appendChild(row);
    }
  }

  #highlightSelectedSquares() {
    const squares = document.querySelectorAll(".chess__board-element-wrapper");
    for (let square of squares) {
      if (square.classList.contains("selected")) {
        square.classList.remove("selected");
      }
    }
    for (let sqaure of this.selectedSquares) {
      const element = document.querySelector(
        `[data-x="${sqaure[0]}"][data-y="${sqaure[1]}"]`
      );
      element.classList.add("selected");
    }
  }
  #addSquareClickHandler() {
    const board = document.querySelector(".chess__board");
    board.addEventListener("click", (e) => {
      this.#addToSelectedSquares(e.target.dataset.x, e.target.dataset.y);
      this.#highlightSelectedSquares();
      this.#highlightKnightPath();
    });
  }
  #calcualteKnightPath() {
    console.log(this.#selectedSquares);
    const board = new ChessBoard();
    const path = board.calculateMoves(
      this.selectedSquares[0],
      this.selectedSquares[1]
    );
    // console.log(path)
    return path;
  }
  #highlightKnightPath() {
    if (this.selectedSquares.length === 2) {
      const path = this.#calcualteKnightPath();
      
      for (let sqaure of path) {
        const element = document.querySelector(
          `[data-x="${sqaure[0]}"][data-y="${sqaure[1]}"]`
        );
        element.classList.add("selected");
      }
    }
  }
}
