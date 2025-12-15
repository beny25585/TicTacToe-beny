import { useEffect, useState } from "react";
import Board from "./Board";

export default function Game() {
  const [squares, setSquares] = useState<(string | null)[]>(
    Array(9).fill(null)
  );
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(false);
  const [time, setTime] = useState(10);
  const PLAYER1 = "X";
  const PLAYER2 = "O";
  let NEXT_PLAYER = isXNext ? PLAYER1 : PLAYER2;
  let CURRENT_PLAYER = isXNext ? PLAYER2 : PLAYER1;

  //check for winner
  const calculateWinner = (squares: (string | null)[]) => {
    if (!squares) return;

    if (squares[0] && squares[0] === squares[1] && squares[0] === squares[2]) {
      setWinner(true);
      return;
    }
    if (squares[3] && squares[3] === squares[4] && squares[3] === squares[5]) {
      setWinner(true);
      return;
    }
    if (squares[6] && squares[6] === squares[7] && squares[6] === squares[8]) {
      setWinner(true);
      return;
    }
    if (squares[0] && squares[0] === squares[3] && squares[0] === squares[6]) {
      setWinner(true);
      return;
    }
    if (squares[1] && squares[1] === squares[4] && squares[1] === squares[7]) {
      setWinner(true);
      return;
    }
    if (squares[2] && squares[2] === squares[5] && squares[2] === squares[8]) {
      setWinner(true);
      return;
    }
    if (squares[0] && squares[0] === squares[4] && squares[0] === squares[8]) {
      setWinner(true);
      return;
    }
    if (squares[2] && squares[2] === squares[4] && squares[2] === squares[6]) {
      setWinner(true);
      return;
    }

    return;
  };

  //bord is full
  const isBoardFull = (squares: (string | null)[]) => {
    if (winner) return;
    return squares.every((square) => square !== null);
  };

  //PlayAgain function
  const PlayAgain = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setTime(10);
    setWinner(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (winner) return;
      setTime((time) => {
        if (time === 0) {
          console.log("Timer:", time);
          setIsXNext(!isXNext);
          return 10;
        }
        return time - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isXNext]);

  function handleSquareClick(index: number) {
    console.log("Square clicked:", index);
    if (winner) {
      return;
    }

    if (squares[index]) {
      return;
    }
    //end turn
    squares[index] = NEXT_PLAYER;
    calculateWinner(squares);
    setSquares([...squares]);
    setIsXNext(!isXNext);
    setTime(10);
  }

  return (
    <div className="game-container">
      <h1>Tic Tac Toe</h1>
      <Board squares={squares} onSquareClick={handleSquareClick} />
      <p>Next Player: {NEXT_PLAYER}</p>
      <p>{time}</p>
      {winner && (
        <div>
          <p>the winner is: {CURRENT_PLAYER}</p>
          <button onClick={PlayAgain}>restart</button>
        </div>
      )}
      {isBoardFull(squares) && (
        <div>
          <p>It's a draw!</p>
          <button onClick={PlayAgain}>Play Again</button>
        </div>
      )}
    </div>
  );
}
