import React from 'react';
import './Restart.css';

const Restart = ({setHistory, setTurn}) => {
    return (
        <button className="restart" onClick={ ()=> {
            setHistory([{board: Array(9).fill(''), turn: 'X'}]);
            setTurn('X');}
        }>
        Play again
        </button>
    )  
} 

export default Restart;