import React, { useState } from 'react';
import Square from '../Square';
import './Board.css';
import Restart from '../Restart';

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



const Board = ({ turnState, history, setHistory}) => {
    //const board = boardState.board; const setBoard = boardState.setBoard;
    const turn = turnState.turn; const setTurn = turnState.setTurn;
    const status = calculateStatus(history[history.length-1].board);

    const renderSquare = (i) => {
        return (
        <Square pos = {i} 
                //boardState = {{board, setBoard}} 
                turnState = { {turn, setTurn }} 
                status = {status}
                history = {history}
                setHistory = {setHistory}/>  
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
            <div>
                <Restart setHistory = {setHistory} setTurn = {setTurn} />
            </div>
        </div>
    )
}

export default Board;