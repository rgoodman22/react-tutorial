import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Square = (props) => {
    const regStyle = {
        backgroundColor: "#F5B7B1"
      };
    const winStyle = {
        backgroundColor: "#58D68D"
    };
    return (
        <button className="square" 
        onClick={props.onClick}>
            {props.value}
        </button>
    );

    
}

class Board extends React.Component {

    //we’ll pass down a function from the Board to the Square, 
    //and we’ll have Square call that function when a square is clicked. 
    renderSquare(i) {
        return (<Square 
                value = {this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                
            />
        );
    }

    render() {
        let loopRows=[];
        for (var i = 0; i< 9; i+=3) {
            let row = []
                for (var j = 0; j<3; j++){
                    row.push(this.renderSquare(i+j));
                }
            row = <div className="board-row">{row}</div>;
            loopRows.push(row);
            }
        return (
            <div>
                {loopRows}
            </div>
        )
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            positions: new Array(9).fill(null),
            toggle: false,
        };
    }   

    handleClick(i) {
        let that = this.state;
        const history = that.history.slice(0,
                                                 that.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const indexToPos =                 
        [
            '[1,1]','[2,1]','[3,1]',
            '[1,2]','[2,2]','[3,2]',
            '[1,3]','[2,3]','[3,3]'
        ];

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = that.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([{squares : squares,
            }]),
            stepNumber: history.length,
            xIsNext: !that.xIsNext,
            positions: that.positions.slice(0,that.stepNumber).concat(indexToPos[i], that.positions.slice(that.stepNumber,8)),
            i: i,
        });

    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    toggle() {
        this.setState({
            toggle: !this.state.toggle,
        });
    }


    render() {

        let that = this.state;
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const results = calculateWinner(current.squares);

        const moves = history.map((step,move) => {
            const desc = move ?
                'Go to move at position: ' + that.positions[move-1]:
                'Go to game start';
            return(
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>
                        {that.stepNumber === move ? <b>{desc}</b> : desc}
                    </button>
                </li>
            );
        });

        let status;
        if (results) {
            const winner = results[0];
            const line = results[1];
            status = "Winner: " + winner;
        } else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }
        
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares ={current.squares}
                        onClick={i=> this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>
                        {that.toggle ? moves.reverse(): moves}
                    </ol>
                </div>
                <div className="toggle">
                    <div>
                        <button onClick={()=>this.toggle()}>
                            {that.toggle ? "Reversed" : "Sequential"}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const[a,b,c] = lines[i];
        if (squares[a] && 
            squares[a] === squares[b] &&
            squares[a] === squares[c]) {
                return [squares[a],lines[i]];
            }
    }
    return null;
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);