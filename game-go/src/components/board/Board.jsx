import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateBoard, updateScores } from "../../store/reducers/boardSlice";
import Sketch from "react-p5";
import './Board.css';


// Board component
const Board = () => {
  const rows = 19; // Number of rows in the board
  const cols = 19; // Number of columns in the board
  const cellSize = 30; // Size of each cell in pixels
  const [player, setPlayer] = useState(true); // Current player Turn Black : White
  const board = useSelector((state) => state.board.board); // Current Board Status
  const whiteScore = useSelector((state) => state.board.scores.white); // Current White Score
  const blackScore = useSelector((state) => state.board.scores.black); // Current Black Score
  const dispatch = useDispatch(); // Init the Redux dispatch call
  let [turn, setTurn] = useState(-1); // Turn count indicator

  const setup = (p5, parent) => {
    try {
      p5.createCanvas(cols * cellSize, rows * cellSize).parent(parent);
    } catch (error) {
      console.error("Error in setup:", error);
    }
  };

  const draw = (p5) => {
    try {
      const limits = 0.5 * cellSize;

      p5.background("rgb(164,116,73)");

      for (let i = 0; i < rows; i++) {
        const rope = i * cellSize + limits;

        p5.strokeWeight(2);
        p5.line(0 + limits, rope, p5.width - limits, rope);
        p5.line(rope, 0 + limits, rope, p5.height - limits);
      }

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const x = j * cellSize; // Calculate the x-coordinate
          const y = i * cellSize; // Calculate the y-coordinate

          const square = board[i][j];

          if (square) {
            p5.strokeWeight(0);
            p5.fill(square === 1 ? 255 : 0);
            p5.circle(x + cellSize / 2, y + cellSize / 2, cellSize * 0.8);
          }
        }
      }

        // Draw scores
        p5.fill(255);
        p5.textSize(20);
        p5.text(`Black Score: ${whiteScore}`, 10, p5.height - 30);
        p5.text(`White Score: ${blackScore}`, 10, p5.height - 10);

    } catch (error) {
      console.error("Error in draw:", error);
    }
  };

  const updateScoresAndBoard = (capturedPieces) => {
    capturedPieces.forEach(({ x, y }) => {
      dispatch(updateBoard({ x, y, value: 0 })); // Remove captured pieces by setting their value to 0
    });
  
    // Calculate scores based on the number of pieces of each color on the board
    const blackCount = board.reduce(
      (count, row) => count + row.filter((piece) => piece === 2).length,
      0
    );
    const whiteCount = board.reduce(
      (count, row) => count + row.filter((piece) => piece === 1).length,
      0
    );
  
    // Update the scores in the state
    dispatch(updateScores({ black: blackCount, white: whiteCount }));
  };
  

  const mouseClicked = (p5) => {
    try {
      if (turn <=0) {
        turn++;
        return null;
      }
      const canvasX = p5.mouseX;
      const canvasY = p5.mouseY;

      // Check if the click is within the canvas boundaries
      if (canvasX >= 0 && canvasX < p5.width && canvasY >= 0 && canvasY < p5.height) {
        setTurn(turn++);

        const col = Math.floor(canvasX / cellSize);
        const row = Math.floor(canvasY / cellSize);

        if (player) {
          console.log("New Black Position: X=" + col + " Y=" + row);
        } else {
          console.log("New White Position: X=" + col + " Y=" + row);
        }

        const color = player ? 2 : 1;

        dispatch(updateBoard({ row, col, value: color }));
        setPlayer(!player);

        const capturedPieces = checkSurroundedPieces(board, col, row, color);
        capturedPieces.forEach(({ x, y }) => {
          dispatch(updateBoard({ x, y, value: 0 })); // Remove captured pieces by setting their value to 0
        });
        updateScoresAndBoard(capturedPieces);
      } else {
        console.log("Click outside the canvas boundaries");
      }
    } catch (error) {
      console.error("Error in mouseClicked:", error);
    }
  };

  const checkSurroundedPieces = (board, col, row, targetColor) => {
    try {
      console.log("checkSurroundedPieces: board=", board, " position:", col, ",", row, " Target Colour:", targetColor);
      const capturedPieces = [];

      const checkSurroundedNeighbors = (x, y) => {
        console.log("checkSurroundedNeighbors called: X=", x, " Y=", y);
        const neighbors = [
          { dx: 1, dy: 0 },
          { dx: -1, dy: 0 },
          { dx: 0, dy: 1 },
          { dx: 0, dy: -1 },
        ];

        let surrounded = true;

        const checkNeighbors = (nx, ny) => {
          console.log("checkNeighbors called: nx=", nx, " ny=", ny);
          if (
            nx >= 0 &&
            nx < cols &&
            ny >= 0 &&
            ny < rows &&
            board[ny][nx] !== targetColor
          ) {
            const capturedPiece = { x: nx, y: ny };
            if (!capturedPieces.some((piece) => piece.x === nx && piece.y === ny)) {
              capturedPieces.push(capturedPiece);
              console.log(capturedPieces);
              checkSurroundedNeighbors(nx, ny);
            }
          }
        };

        for (const neighbor of neighbors) {
          console.log(neighbor);
          const nx = x + neighbor.dx;
          const ny = y + neighbor.dy;

          if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
            if (board[ny][nx] === 0) {
              surrounded = false;
              break;
            } else if (board[ny][nx] !== targetColor) {
              checkNeighbors(nx, ny);
            }
          }
        }
        return surrounded;
      };

      checkSurroundedNeighbors(col, row);
      return capturedPieces;
    } catch (error) {
      console.error("Error in checkSurroundedPieces:", error);
      return [];
    }
  };

  return (
    <div className="total-container">
      <div className="board-wrapper">
          <Sketch setup={setup} draw={draw} mouseClicked={mouseClicked} />
      </div>
    </div>
  );
};

export default Board;
