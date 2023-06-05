import React from 'react';
import Board from '../components/board/Board';
import Scoreboard from '../components/scoreboard/Scoreboard';
import './game.css';
// import Handicap from '../components/handicap/Handicap.jsx';

const Game = () => {
    return (
        <div className="game-container">
        <Board />
        <Scoreboard />
        {/* <Handicap /> */}
        </div>
    );
}

export default Game;
