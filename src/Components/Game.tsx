import React, { useCallback, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import io from "socket.io-client";
import generateAgents from "../lib/generateAgents";
import generateWords from "../lib/generateWords";
import WordGrid from "./WordGrid";

export default function Game() {
  const location = useLocation();
  const [gameStarted, setGameStarted] = React.useState(false);
  const [myTurn, setMyTurn] = React.useState<boolean>(false);
  const [guesses, _setGuesses] = React.useState<string[]>([]);
  const [playerIndex, setPlayerIndex] = React.useState<number | undefined>();
  const gameHash = location.pathname.replace("/", "");
  const gameID = parseInt(gameHash, 36);

  const [socket, setSocket] = React.useState<any>(null);
  const [words, setWords] = React.useState<string[]>([]);
  const [agents, setAgents] = React.useState<string[][]>([]);

  useEffect(() => {
    const newSocket = socket ? socket : io("ws://localhost:3000");
    if (!socket) {
      setSocket(newSocket);
      setWords(generateWords(25, gameID));
      setAgents(generateAgents());
      newSocket.emit("join", gameHash);
    }
    newSocket.on("startGame", async (socketIndex: number) => {
      console.log({ START: socketIndex });
      setGameStarted(true);
      setMyTurn(socketIndex === 0);
      setPlayerIndex(socketIndex);
    });
    newSocket.on("endTurn", (socketIndex: number) => {
      const newPlayerIndex = 1 - socketIndex;
      setMyTurn(newPlayerIndex === playerIndex);
    });
    newSocket.on("makeGuess", (index: number, answer: string) => {
      const newGuesses = [...guesses];
      newGuesses[index] = answer;
      _setGuesses(newGuesses);
    });
  }, [gameHash, gameID, guesses, playerIndex, socket]);

  const startGame = useCallback(() => {
    if (!socket) return;
    socket.emit("startGame", { gameHash, socketID: socket.id });
  }, [gameHash, socket]);

  const endTurn = useCallback(() => {
    if (!socket) return;
    socket.emit("endTurn", { gameHash, playerIndex });
  }, [gameHash, playerIndex, socket]);

  const endGame = useCallback(() => {
    alert("GAME ENDED BY ASSASSIN");
  }, []);

  const setGuesses = useCallback(
    (index: number, answer: "Bystander" | "Comrade") => {
      socket.emit("makeGuess", { gameHash, index, answer });
    },
    [gameHash, socket]
  );

  return (
    <div>
      <Link to={"/"}>Home</Link>
      <h1>{!myTurn && "NOT"} Your turn</h1>

      {!gameStarted && <button onClick={startGame}>start game</button>}

      {gameStarted && myTurn && <button onClick={endTurn}>End turn</button>}

      {(playerIndex || playerIndex === 0) && (
        <WordGrid
          id={playerIndex}
          agents={agents[playerIndex]}
          endTurn={endTurn}
          endGame={endGame}
          gameStarted={gameStarted}
          guesses={guesses}
          hiddenAgents={agents[1 - playerIndex]}
          myTurn={myTurn}
          setGuesses={setGuesses}
          words={words}
        />
      )}
      {/* <WordGrid
        id={0}
        agents={agents[0]}
        hiddenAgents={agents[1]}
        gameStarted={gameStarted}
        words={words}
      />
      <WordGrid
        id={1}
        agents={agents[1]}
        hiddenAgents={agents[0]}
        gameStarted={gameStarted}
        words={words}
      /> */}
    </div>
  );
}
