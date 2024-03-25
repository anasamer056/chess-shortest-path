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
  #renderTextPath(path){
    const textPath = this.#convertNumbersToLetters(path);
    const textElement = document.querySelector(".text-path");
    textElement.textContent = textPath;
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
  #convertNumbersToLetters(path) {
    const map = {
      1: "A",
      2: "B",
      3: "C",
      4: "D",
      5: "E",
      6: "F",
      7: "G",
      8: "H",
    };

    const arr = path.map((square)=>` ${square[0]+1}${map[square[1]+1]} `);
    return arr.join(" => ");
  }
  #highlightKnightPath() {
    if (this.selectedSquares.length === 2) {
      const squares = document.querySelectorAll(
        ".chess__board-element-wrapper"
      );
      for (let square of squares) {
        if (square.classList.contains("path")) {
          square.classList.remove("path");
        }
      }

      const path = this.#calcualteKnightPath();

      for (let i = 1; i < path.length - 1; i++) {
        const square = path[i];
        const element = document.querySelector(
          `[data-x="${square[0]}"][data-y="${square[1]}"]`
        );
        element.classList.add("path");
      }
      this.#renderTextPath(path);
    }
  }
}
