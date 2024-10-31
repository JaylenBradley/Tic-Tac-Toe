import { useState } from "react";

const Board = () => {
  const [xisNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [firstXIndex, setFirstXIndex] = useState(null);
  const [status, setStatus] = useState('Next player: X');
  const [moveCount, setMoveCount] = useState(0);

  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    const goodChoices = [0, 2, 6, 8];

    if (xisNext) {
      if (moveCount === 0) {
        if (goodChoices.includes(i)) {
          setStatus('Good choice!');
          nextSquares[i] = 'X';
          setFirstXIndex(i);
        } else {
          setStatus('Not a good choice!');
          return;
        }
      } else if (moveCount === 2) {

        if (squares[4] === 'O') {
          // O is in the center, X must place in a straight diagonal from its first X
          const diagonalChoices = {
            0: [8],
            2: [6],
            6: [2],
            8: [0]
          };

          if (diagonalChoices[firstXIndex].includes(i)) {
            setStatus('Good choice!');
            nextSquares[i] = 'X';
          } else {
            setStatus('Not a good choice!');
            return;
          }
        } else {
          // O is not in the center, X must place in a corner with a blank space between it and its first X
          const validSecondMoves = {
            0: [2, 6],
            2: [0, 8],
            6: [0, 8],
            8: [2, 6]
          };

          if (validSecondMoves[firstXIndex].includes(i) && squares[(firstXIndex + i) / 2] !== 'O') {
            setStatus('Good choice!');
            nextSquares[i] = 'X';
          } else {
            setStatus('Not a good choice!');
            return;
          }
        }
      } else {
        nextSquares[i] = 'X';
      }
    } else {
      nextSquares[i] = 'O';
    }

    setSquares(nextSquares);
    setXIsNext(!xisNext);
    setMoveCount(moveCount + 1);

    const winner = calculateWinner(nextSquares);
    if (winner) {
      setStatus(`Winner: ${winner}`);
    } else {
      setStatus(`Next player: ${xisNext ? 'O' : 'X'}`);
    }
  };

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square val={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square val={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square val={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square val={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square val={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square val={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square val={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square val={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square val={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
};

const Square = ({val, onSquareClick}) => {

  return (
        <button className="square" onClick={onSquareClick}>
          {val}
        </button>
  )
}

const calculateWinner = (squares) => {
  const lines = [
    [0,1,2], // horizontal
    [3,4,5],
    [6,7,8],
    [0,3,6], // vertical
    [1,4,7],
    [2,5,8],
    [0,4,8], // diagonal
    [2,4,6]
  ];

  for(let i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Board;