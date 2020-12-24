import React, {useState} from 'react';
import './Square.css';


const Square = ({pos, boardState, turnState, status}) => {
    const [player, setPlayer] = useState('');
    
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
                        setPlayer(turnState.turn);
                    }
                }
            }>
        { player }
    </button>
)};

export default Square;

