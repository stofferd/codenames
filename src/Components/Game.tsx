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
  const [playerIndex, setPlayerIndex] = React.useState<number | undefined>();
  const gameHash = location.pathname.replace("/", "");
  const gameID = parseInt(gameHash, 36);

  const [socket, setSocket] = React.useState<any>(null);
  const [words, setWords] = React.useState<string[]>([]);
  const [agents, setAgents] = React.useState<string[][]>([]);

  useEffect(() => {
    // setGameID(gameID);
    const newSocket = io("ws://localhost:3000");
    console.log({ newSocket });
    newSocket.emit("newPlayer", { socketID: newSocket.id, gameID });
    setSocket(newSocket);

    newSocket.on("newPlayerID", (newPlayerID: any) =>
      console.log({ newPlayerID })
    );

    newSocket.on("startGame", async (socketIndex: number) => {
      setGameStarted(true);
      setMyTurn(socketIndex === 0);
      setPlayerIndex(socketIndex);
    });

    newSocket.emit("join", gameHash);

    setWords(generateWords(25, gameID));
    setAgents(generateAgents());
  }, []);
  const startGame = useCallback(() => {
    if (!socket) return;
    socket.emit("startGame", { gameHash, socketID: socket.id });
  }, [gameHash, socket]);

  return (
    <div>
      <Link to={"/"}>Home</Link>
      <h1>{!myTurn && "NOT"} Your turn</h1>

      {!gameStarted && <button onClick={startGame}>start game</button>}
      {(playerIndex || playerIndex === 0) && (
        <WordGrid
          id={playerIndex}
          agents={agents[playerIndex]}
          gameStarted={gameStarted}
          words={words}
        />
      )}
      <WordGrid
        id={0}
        agents={agents[0]}
        gameStarted={gameStarted}
        words={words}
      />
      <WordGrid
        id={1}
        agents={agents[1]}
        gameStarted={gameStarted}
        words={words}
      />
    </div>
  );
}
