import React, {useState} from 'react';
import './Square.css';


const Square = ({pos, boardState, turnState}) => {
    const [player, setPlayer] = useState('');
    
    return (
    <button className="square"
            onClick = { () => {
                    if (player === '') {
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

