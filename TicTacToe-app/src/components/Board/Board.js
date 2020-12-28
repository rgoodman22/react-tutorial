import React from 'react';
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
            return {status: 'Game is incomplete', squares: winner};
        } else {
            return {status: 'Game is a draw', squares: winner};
        }
    } else {
        return {status: 'Winner: ' + board[winner[0]], squares: winner};
    }
}



const Board = ({ turnState, history, setHistory}) => {
    //const board = boardState.board; const setBoard = boardState.setBoard;
    const turn = turnState.turn; const setTurn = turnState.setTurn;
    const totStatus = calculateStatus(history[history.length-1].board);
    const status = totStatus.status;
    const squares = totStatus.squares

    const renderSquare = (i) => {
        const winClass = (squares !== undefined && squares.includes(i) ? "winning" : "");
        return (
        <Square winClass = {winClass}
                pos = {i} 
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