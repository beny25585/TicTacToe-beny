import { useEffect, useState } from "react";
import Board from "./Board";

const WINNING_LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//check for winner
function calculateWinner(squares: (string | null)[]): string | null {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
const resetTime = 10;
const PLAYER_X = "X";
const PLAYER_O = "O";

export default function Game() {
  const [squares, setSquares] = useState<(string | null)[]>(
    Array(9).fill(null)
  );

  const [isXNext, setIsXNext] = useState(true);
  const [time, setTime] = useState(resetTime);

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every((square) => square !== null);
  const nextPlayer = isXNext ? PLAYER_X : PLAYER_O;
  const gameOver = Boolean(winner) || isDraw;

  //resetGame  function
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setTime(resetTime);
  };

  useEffect(() => {
    if (gameOver) return;

    const timerId = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [gameOver]);

  useEffect(() => {
    if (gameOver) return;

    if (time < 0) return;

    if (time === 0) {
      setIsXNext((turn) => !turn);
      setTime(10);
    }
  }, [time, gameOver]);

  function handleSquareClick(index: number) {
    if (gameOver || squares[index]) {
      return;
    }

    const currentPlayer = isXNext ? PLAYER_X : PLAYER_O;

    setSquares((oldSquares) => {
      const newSquares = [...oldSquares];
      newSquares[index] = currentPlayer;
      return newSquares;
    });

    //end turn
    setIsXNext((prevIsXNext) => !prevIsXNext);
    setTime(resetTime);
  }

  return (
    <div className="game-container">
      <h1>Tic Tac Toe</h1>
      <Board squares={squares} onSquareClick={handleSquareClick} />
      <p>Next Player: {nextPlayer}</p>
      <p>Time left:{time}</p>
      {winner && (
        <div>
          <p>the winner is: {winner}</p>
          <button onClick={resetGame}>restart</button>
        </div>
      )}
      {isDraw && (
        <div>
          <p>It's a draw!</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
}
