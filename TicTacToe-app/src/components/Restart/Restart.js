import React from 'react';
import './Restart.css';

const Restart = ({setBoard, setTurn}) => {
    return (
        <button className="restart" onClick={ ()=> {
            setBoard(Array(9).fill(''));
            setTurn('X');}
        }>
        Play again
        </button>
    )  
} 

export default Restart;