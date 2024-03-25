# Knight's Shortest Path Chessboard App

This is a simple application that calculates the shortest path a knight can take between two squares on a chessboard. It implements a graph and traverses it using the breadth-first search (BFS) algorithm. Additionally, a simple user interface (UI) has been built to visualize the process.

## Usage

1. Head to the deployed app on [GitHub Pages](https://anasamer056.github.io/chess-shortest-path/)
2. Upon opening the application, you'll see an 8x8 chessboard.
3. Click on any two squares to select the start and destination squares.
4. The application will highlight the selected squares and display the shortest path that the knight can take to reach the destination square.
5. The path will be displayed both visually on the board and as text below the board.

## Code Structure

The application consists of two main components:

### Logic (ChessBoard)

The logic for calculating the shortest path is implemented in the `ChessBoard` class. It utilizes a graph representation of the chessboard and performs a BFS traversal to find the shortest path between two given squares.

### User Interface (UI)

The UI component is responsible for rendering the chessboard and handling user interactions. It highlights selected squares, calculates the knight's shortest path using the `ChessBoard` logic, and visualizes the path on the board.

## Technologies Used

- Vanilla JavaScript
- HTML
- CSS

## Credits

The chessboard used in the user interface for this project was adapted from a CodePen project created by [jhasuev](https://codepen.io/jhasuev/pen/pdByoK). Modifications were made to suit the requirements of this application.
