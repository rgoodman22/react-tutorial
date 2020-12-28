import React from 'react';
import './Square.css';

const posToGrid = (i) => {
    switch(i) {
        case 0:
            return [2,0];
        case 1:
            return [2,1];
        case 2:
            return [2,2];
        case 3:
            return [1,0];
        case 4:
            return [1,1];
        case 5:
            return [1,2];
        case 6:
            return [0,0];
        case 7:
            return [0,1];
        case 8: 
            return [0,2];
    }

}


const Square = ({pos, turnState, history, setHistory, status, winClass}) => {
    const board = history[history.length-1].board
    const player = board[pos];
    
    return (
    <button className={"square " + winClass}
            onClick = { () => {
                if (player !== '' || status === "Game is a draw" || status.substring(0,6) === "Winner") {
                    return
                } else{
                        const newBoard = board.slice();
                        newBoard[pos] = turnState.turn;
                        setHistory(history.concat({board: newBoard, turn: turnState.turn, pos: posToGrid(pos)}));
                        if (turnState.turn === 'X' ? turnState.setTurn('O') : turnState.setTurn('X'));
                    }
                }
            }>
        { player }
    </button>
)};

export default Square;

