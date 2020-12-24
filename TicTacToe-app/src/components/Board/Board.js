import React, { useState } from 'react';
import Square from '../Square';
import './Board.css';

const calculateStatus = (board) => {
    const possibleLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    const winner = possibleLines.find(line => board[line[0]] !== '' && 
                                                       board[line[0]] === board[line[1]] && 
                                                       board[line[0]] === board[line[2]]);
    const isFull = board.find(square => square === '');
    if (winner === undefined) {
        if (isFull !== undefined) {
            return 'Game is incomplete';
        } else {
            return 'Game is a draw';
        }
    } else {
        return 'Winner: ' + board[winner[0]];
    }
}



const Board = () => {
    const [board, setBoard] = useState(Array(9).fill(''))
    const [turn, setTurn] = useState('X');
    const status = calculateStatus(board);

    const renderSquare = (i) => {
        return (
        <Square pos = {i} boardState = {{board, setBoard}} turnState = { {turn, setTurn }} status = {status}/>  
    )};
    
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

export default Board;