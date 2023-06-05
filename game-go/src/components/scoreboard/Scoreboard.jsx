import React from "react";
import "./scoreboard.css";
// import TurnIndicator from "./TurnIndicator";
import { useSelector } from "react-redux";

const Scoreboard = () => {
  const whiteScore = useSelector((state) => state.board.scores.white); // Current White Score
  const blackScore = useSelector((state) => state.board.scores.black); // Current Black Score

  return (
    <div className='scoreboard-container'>
        <div className='scoreboard'>
            <div className='scoreboard-title'>
                <h1>Scoreboard</h1>
            </div>
            <div className='scoreboard-scores'>
                <h2>Black Score: {blackScore}</h2>
                <h2>White Score: {whiteScore}</h2>
            </div>
        </div>
        {/* <TurnIndicator /> */}
    </div>
  );
};

export default Scoreboard;
