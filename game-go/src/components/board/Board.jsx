import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBoard, updateScores } from "../../store/reducers/boardSlice";
import Sketch from "react-p5";
import "./Board.css";

// Board component
const Board = () => {
  const rows = 19; // Number of rows in the board
  const cols = 19; // Number of columns in the board
  const cellSize = 30; // Size of each cell in pixels
  const [player, setPlayer] = useState(true); // Current player Turn Black : White
  const board = useSelector((state) => state.board.board); // Current Board Status
  const dispatch = useDispatch(); // Init the Redux dispatch call
  const [turn, setTurn] = useState(-1); // Turn count indicator
  const [capturedPieces, setCapturedPieces] = useState([]); // Captured pieces

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

      // Remove captured pieces from the display
      capturedPieces.forEach(({ x, y }) => {
        const xPos = x * cellSize;
        const yPos = y * cellSize;

        p5.strokeWeight(0);
        p5.fill("rgb(164,116,73)");
        p5.rect(xPos, yPos, cellSize, cellSize);
      });
    } catch (error) {
      console.error("Error in draw:", error);
    }
  };

  const updateScoresAndBoard = () => {
    capturedPieces.forEach(({ x, y }) => {
      dispatch(updateBoard({ x, y, value: 0 })); // Remove captured pieces by setting their value to 0
    });
  
    // Calculate scores based on the number of pieces of each color on the board
    const blackCount = board.reduce(
      (count, row) => count + row.filter((piece) => piece === (player ? 2 : 1)).length,
      0
    );
    const whiteCount = board.reduce(
      (count, row) => count + row.filter((piece) => piece === (player ? 1 : 2)).length,
      0
    );
  
    // Update the scores in the state
    dispatch(updateScores({ black: blackCount, white: whiteCount }));
  };
  
  const checkSurroundedPieces = (col, row, targetColor) => {
    const neighbors = [
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 },
    ];

    const capturedPieces = [];

    const checkSurroundedNeighbors = (x, y, color) => {
      let surrounded = true;

      const checkNeighbors = (nx, ny) => {
        if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
          const neighborColor = board[ny][nx];

          if (neighborColor === color) {
            const capturedPiece = { x: nx, y: ny };
            if (!capturedPieces.some((piece) => piece.x === nx && piece.y === ny)) {
              capturedPieces.push(capturedPiece);
              checkSurroundedNeighbors(nx, ny, color);
            }
          } else if (neighborColor === 0) {
            surrounded = false;
          }
        }
      };

      for (const neighbor of neighbors) {
        const nx = x + neighbor.dx;
        const ny = y + neighbor.dy;

        if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
          if (board[ny][nx] === 0) {
            surrounded = false;
            break;
          } else if (board[ny][nx] !== color) {
            checkNeighbors(nx, ny);
          }
        }
      }
      return surrounded;
    };

    const color = board[row][col];

    if (color === 0) {
      return capturedPieces;
    }

    const surrounded = checkSurroundedNeighbors(col, row, color);

    if (surrounded) {
      capturedPieces.push({ x: col, y: row });
    }

    return capturedPieces;
  };

  const mouseClicked = (p5) => {
    try {
      if (turn < 0) {
        setTurn(turn + 1);
        return null;
      }
  
      const canvasX = p5.mouseX;
      const canvasY = p5.mouseY;
  
      // Check if the click is within the canvas boundaries
      if (canvasX >= 0 && canvasX < p5.width && canvasY >= 0 && canvasY < p5.height) {
        const col = Math.floor(canvasX / cellSize);
        const row = Math.floor(canvasY / cellSize);
  
        if (player) {
          console.log("New Black Position: X=" + col + " Y=" + row);
        } else {
          console.log("New White Position: X=" + col + " Y=" + row);
        }
  
        const color = player ? 2 : 1;
  
        dispatch(updateBoard({ row, col, value: color }));
  
        const capturedPieces = checkSurroundedPieces(col, row, color);
        setCapturedPieces(capturedPieces);
        updateScoresAndBoard();
  
        setPlayer(!player);
        setTurn(turn + 1);
  
        // Redraw the canvas
        p5.redraw();
      } else {
        console.log("Click outside the canvas boundaries");
      }
    } catch (error) {
      console.error("Error in mouseClicked:", error);
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
