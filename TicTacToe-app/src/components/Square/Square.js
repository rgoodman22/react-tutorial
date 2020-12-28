import React from 'react';
import './Square.css';


const Square = ({pos, turnState, history, setHistory, status}) => {
    const board = history[history.length-1].board
    const player = board[pos];
    
    return (
    <button className="square"
            onClick = { () => {
                if (player !== '' || status === "Game is a draw" || status.substring(0,6) === "Winner") {
                    return
                } else{
                        const newBoard = board.slice();
                        newBoard[pos] = turnState.turn;
                        setHistory(history.concat({board: newBoard, turn: turnState.turn}));
                        if (turnState.turn === 'X' ? turnState.setTurn('O') : turnState.setTurn('X'));
                    }
                }
            }>
        { player }
    </button>
)};

export default Square;

