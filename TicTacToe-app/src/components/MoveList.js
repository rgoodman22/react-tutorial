import React from 'react';

const MoveList = ({history, setHistory, setTurn}) => {
    const string = "str";
    const moves = history.slice(1).map((element, index)=> {
        return (
            <li>
                <button onClick = { () => {
                    const newHistory = history.slice(0, index+1);
                    setHistory(newHistory);
                    if (newHistory.length-1 === 0) {
                        setTurn('X');
                    } else if (newHistory[newHistory.length-1].turn === 'X' ? setTurn('O') : setTurn('X')); 
                    ;
                }}>
                    {index === history.length-2 ? <b>{string}</b> : string}
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