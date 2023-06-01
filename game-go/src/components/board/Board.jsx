import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateBoard } from "../../store/store";
import Sketch from "react-p5";
import './Board.css';

const Board = () => {
  const rows = 19; // Number of rows in the board
  const cols = 19; // Number of columns in the board
  const cellSize = 30; // Size of each cell in pixels
  const [player, setPlayer] = useState(true); // Current player Turn Black : White
  const board = useSelector((state) => state.board);
  const dispatch = useDispatch();

  const setup = (p5, parent) => {
    p5.createCanvas(cols * cellSize, rows * cellSize).parent(parent);
  };

  const draw = (p5) => {
    p5.background("rgb(164,116,73)");

    for (let i = 0; i < rows; i++) {
      const limits = 0.5 * cellSize;
      const rope = i * cellSize + limits;

      p5.strokeWeight(2);
      p5.line(0 + limits, rope, p5.width - limits, rope);
      p5.line(rope, 0 + limits, rope, p5.height - limits);
    }

    // ... drawing logic

    // Iterate through the rows
    for (let i = 0; i < rows; i++) {
      // Iterate through the columns
      for (let j = 0; j < cols; j++) {
        const x = j * cellSize; // Calculate the x-coordinate
        const y = i * cellSize; // Calculate the y-coordinate

        let square = board[i][j];

        if (square) {
          p5.strokeWeight(0);
          p5.fill(square === 1 ? 255 : 0);
          p5.circle(x + cellSize / 2, y + cellSize / 2, cellSize * 0.8);
        }
      }
    }
  };

  const mouseClicked = (p5) => {
    const col = Math.floor(p5.mouseX / cellSize);
    const row = Math.floor(p5.mouseY / cellSize);

    // Create a copy of the board array to update the state immutably
    
    let updatedBoard = [...board];
    if (player) {
      updatedBoard[row][col] = 1; // Update the clicked cell to 1
      setPlayer(!player);

      // Check for surrounded pieces and remove them
      const capturedPieces = checkSurroundedPieces(updatedBoard, col, row, 1);
      capturedPieces.forEach(({ x, y }) => {
        updatedBoard[y][x] = 0; // Remove captured pieces by setting their value to 0
      });
    } else {
      updatedBoard[row][col] = 2; // Update the clicked cell to 2
      setPlayer(!player);

      // Check for surrounded pieces and remove them
      const capturedPieces = checkSurroundedPieces(updatedBoard, col, row, 2);
      capturedPieces.forEach(({ x, y }) => {
        updatedBoard[y][x] = 0; // Remove captured pieces by setting their value to 0
      });
  }
    // Update the state with the new board array
    dispatch(updateBoard(updatedBoard));
  };

  const checkSurroundedPieces = (board, col, row, targetColor) => {
    const capturedPieces = [];

    const checkNeighbors = (x, y) => {
      if (x >= 0 && x < cols && y >= 0 && y < rows && board[y][x] !== targetColor && board[y][x] !== 0) {
        const capturedPiece = { x, y };
        if (!capturedPieces.some((piece) => piece.x === x && piece.y === y)) {
          capturedPieces.push(capturedPiece);
          checkSurroundedNeighbors(x, y);
        }
      }
    };

    const checkSurroundedNeighbors = (x, y) => {
      checkNeighbors(x + 1, y);
      checkNeighbors(x - 1, y);
      checkNeighbors(x, y + 1);
      checkNeighbors(x, y - 1);
    };

    checkSurroundedNeighbors(col, row);
    return capturedPieces;
  };

  return (
    <div className="board-wrapper">
      <Sketch setup={setup} draw={draw} mouseClicked={mouseClicked} />
    </div>
  
  );
};

export default Board;
