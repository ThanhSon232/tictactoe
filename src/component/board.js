import React from "react";

function Square(props) {
    return (
        <button className={props.extraClass} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        let extraClassName = 'square';
        if (this.props.winnerCells && this.props.winnerCells.indexOf(i) > -1 )
            extraClassName = 'square win';


        return (
            <Square
                value={this.props.squares[i]}
                extraClass = {extraClassName}
                onClick={() => this.props.onClick(i)
            }
            />
        );
    }

    render() {
        let row = [];
        let k = 0;
        for(let i = 0 ; i < 5 ; i++){
            let col = [];
            for(let j = 0 ; j < 5 ; j ++){
                col.push(this.renderSquare(5*i+j))
                k++;
            }
            row.push(<div key={k} className="board-row">{col}</div>);
        }
        return (
            <div>
                {row}
            </div>
        );
    }
}

export default Board