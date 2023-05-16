import React from "react";
import { useSelector, useDispatch } from "react-redux";

const game = useSelector((state) => state.game);
const dispatch = useDispatch();
dispatch({ type: "SOME_ACTION_TYPE", payload: "some payload" });

const Board = () => {
  const renderBoardCells = () => {
    const cells = [];

    // Loop to generate rows
    for (let row = 0; row < boardSize; row++) {
      // Loop to generate columns
      for (let col = 0; col < boardSize; col++) {
        cells.push(
          <div key={`${row}-${col}`} className='board-cell'>
            {/* Cell content */}
          </div>
        );
      }
    }
    return cells;
  };

  return <div className='board'>{renderBoardCells()}</div>;
};

export default Board;
