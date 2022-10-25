import Board from "./board";
import React from "react";
import {calculateWinner} from "../helper";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(25).fill(null),
                    lastMove: null
                }
            ],
            stepNumber: 0,
            xIsNext: true,
            sortAsc: true
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([
                {
                    squares: squares,
                    lastMove: i
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    handleToggleClick() {
        this.setState(
            {
                sortAsc: !this.state.sortAsc,
            }
        );
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const winnerCells = winner ? winner.line : winner;

        let moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + (Math.floor(step.lastMove / 5) + 1) + ',' + (step.lastMove % 5 + 1) :
                'Go to game start';
            const bold = this.state.stepNumber === move ? 'bold' : '';
            return (
                <li key={move}>
                    <button className={bold} onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        if (this.state.sortAsc === false) {
            moves = moves.reverse();
        }

        let status;
        if (winner) {
            if(winner.status === 1){
                status = "Winner: " + winner.value;
            } else {
                status = "Draw";
            }
        } else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        winnerCells={winnerCells}
                        squares={current.squares}
                        onClick={i => this.handleClick(i)
                        }
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <button onClick={() => this.handleToggleClick()}>Sort {this.state.sortAsc ? "ASC" : "DESC"}</button>

                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game