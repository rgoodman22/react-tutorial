import React, {useState} from 'react';
import './App.css'

const Square = (pos, play) => {
    const [position, setPosition] = useState(pos);
    const [player, setPlayer] = useState('');
    return (
    <button className="square">
        { player }
    </button>
)};

const Board = () => {
    const renderSquare = (i) => (
        <Square position = {i}/>
    );
    const status = 'Next player: X';
    
    return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    )

}

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
     
