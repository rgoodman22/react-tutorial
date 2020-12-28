import React from 'react';

const MoveList = ({history, setHistory, setTurn}) => {
    const moves = history.slice(1).map((element, index)=> {
        const label = element.turn + ": " + element.pos;
        return (
            <li key = {index}>
                <button onClick = { () => {
                    const newHistory = history.slice(0, index+1);
                    setHistory(newHistory);
                    if (newHistory.length-1 === 0) {
                        setTurn('X');
                    } else if (newHistory[newHistory.length-1].turn === 'X' ? setTurn('O') : setTurn('X')); 
                    ;
                }}>
                    {index === history.length-2 ? <b>{label}</b> : label}
                </button>
            </li>
            );
        });

    return (
        <ol>
            {moves}
        </ol>
    );
}

export default MoveList;