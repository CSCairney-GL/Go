import React from 'react';
import './scoreboard.css';
import TurnIndicator from './TurnIndicator';

const Scoreboard = () => {
    return (
        <div className="scoreboard-container">
            <TurnIndicator/>
        </div>
    );
}

export default Scoreboard;
