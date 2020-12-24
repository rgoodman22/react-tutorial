import React from 'react';
import Board from './components/Board';
import './App.css';

const App = () => {
    return (
        <div className="game">
            <div className="game-board">
                <Board />
            </div>
            <div className="game-info">
                <div>{}</div>
                <ol></ol>
            </div>
        </div>
    )
}

export default App;
     
