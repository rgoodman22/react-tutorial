import React, {useState} from 'react';
import Board from './components/Board';
import './App.css';
import MoveList from './components/MoveList';

const App = () => {
    //const [board, setBoard] = useState(Array(9).fill(''))
    const [turn, setTurn] = useState('X');
    const [history, setHistory] = useState([{board: Array(9).fill(''), turn: turn, pos: undefined}]);
    return (
        <div className="game">
            <div className="game-board">
                <Board //boardState = {{board, setBoard}} 
                       turnState = { {turn, setTurn }}
                       history = {history}
                       setHistory = {setHistory}/>
            </div>
            <div className="game-info">
                <div>List of past moves</div>
                <MoveList history = {history} setHistory = {setHistory} setTurn = {setTurn}/>
            </div>
        </div>
    )
}

export default App;
     
