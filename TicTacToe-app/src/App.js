import React, {useState} from 'react';
import './App.css'



const Board = () => {
    const [board, setBoard] = useState(Array(9).fill(1))
    const [turn, setTurn] = useState('X');

    const renderSquare = (i) => (
        <Square pos = {i} boardState = {{board, setBoard}} turnState = { {turn, setTurn }} />
    );
    
    return (
        <div>
            <div className="status">{}</div>
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
     
