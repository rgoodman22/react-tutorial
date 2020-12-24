import React, { useState } from 'react';
import Square from '../Square';
import './Board.css';

const Board = () => {
    const [board, setBoard] = useState(Array(9).fill(1))
    const [turn, setTurn] = useState('X');
    const [winner, setWinner] = useState('Game is unfished');
    const status = "Next Player: " + turn;

    const renderSquare = (i) => (
        <Square pos = {i} boardState = {{board, setBoard}} turnState = { {turn, setTurn }} />
    );
    
    return (
        <div>
            <div className="status">{status}</div>
            <div className="winner">{winner}</div>
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

export default Board;