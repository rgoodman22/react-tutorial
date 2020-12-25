import React from 'react';
import './Square.css';


const Square = ({pos, boardState, turnState, status}) => {
    const player = boardState.board[pos];
    
    return (
    <button className="square"
            onClick = { () => {
                if (player !== '' || status === "Game is a draw" || status.substring(0,6) === "Winner") {
                    return
                } else{
                        const newBoard = boardState.board.slice();
                        newBoard[pos] = turnState.turn;
                        boardState.setBoard(newBoard);
                        if (turnState.turn === 'X' ? turnState.setTurn('O') : turnState.setTurn('X'));
                    }
                }
            }>
        { player }
    </button>
)};

export default Square;

