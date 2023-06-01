import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateBoard } from "../../store/reducers/boardSlice";
import Sketch from "react-p5";
import './Board.css';
import Scoreboard from "../scoreboard/Scoreboard";

const Board = () => {
  const rows = 19; // Number of rows in the board
  const cols = 19; // Number of columns in the board
  const cellSize = 30; // Size of each cell in pixels
  const [player, setPlayer] = useState(true); // Current player Turn Black : White
  const board = useSelector((state) => state.board);
  const dispatch = useDispatch();
  let [turn, setTurn] = useState(-1);

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
    setTurn(turn++);
    if (turn<=0) {
        setTurn(turn++)
        return;
    }

    const col = Math.floor(p5.mouseX / cellSize);
    const row = Math.floor(p5.mouseY / cellSize);
    if (!player) {
      console.log("New Black Position: X=" + col + " Y=" + row);
    } else {
      console.log("New White Position: X=" + col + " Y=" + row);
    }

    // Create a copy of the board array to update the state immutably
    // let updatedBoard = [...board];
    if (player) {
      dispatch(updateBoard({ row, col, value: 1 })); // Update the clicked cell to 1
      setPlayer(!player);

      // Check for surrounded pieces and remove them
      const capturedPieces = checkSurroundedPieces(board, col, row, 1);
      capturedPieces.forEach(({ x, y }) => {
        dispatch(updateBoard({ row, col, value: 0 })); // Remove captured pieces by setting their value to 0
      });
    } else {
      dispatch(updateBoard({ row, col, value: 2 })); // Update the clicked cell to 2
      setPlayer(!player);

      // Check for surrounded pieces and remove them
      const capturedPieces = checkSurroundedPieces(board, col, row, 2);
      capturedPieces.forEach(({ x, y }) => {
        dispatch(updateBoard({ row, col, value: 0 })); // Remove captured pieces by setting their value to 0
      });
  }
  };

  const checkSurroundedPieces = (board, col, row, targetColor) => {
    const capturedPieces = [];
  
    const checkSurroundedNeighbors = (x, y) => {
      const neighbors = [
        { dx: 1, dy: 0 },
        { dx: -1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 },
      ];
  
      let surrounded = true;
  
      const checkNeighbors = (nx, ny) => {
        if (
          nx >= 0 &&
          nx < cols &&
          ny >= 0 &&
          ny < rows &&
          board[ny][nx] !== targetColor &&
          board[ny][nx] !== 0
        ) {
          const capturedPiece = { x: nx, y: ny };
          if (!capturedPieces.some((piece) => piece.x === nx && piece.y === ny)) {
            capturedPieces.push(capturedPiece);
            checkSurroundedNeighbors(nx, ny);
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
          } else if (board[ny][nx] !== targetColor) {
            checkNeighbors(nx, ny);
          }
        }
      }
      return surrounded;
    };
  
    checkSurroundedNeighbors(col, row);
    return capturedPieces;
  };
  
  

  return (
    <>
    <div className="board-wrapper">
      <Sketch setup={setup} draw={draw} mouseClicked={mouseClicked} />
    </div>
    <Scoreboard />
    </>
  );
};

export default Board;
