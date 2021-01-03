import React, { useCallback, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import io from "socket.io-client";
import styled from "styled-components";
import generateAgents from "../lib/generateAgents";
import generateWords from "../lib/generateWords";
import GuideGrid from "./GuideGrid";
import Spinner from "./Spinner";
import WordGrid from "./WordGrid";

const Header = styled.div`
  height: 180px;
`;

export type Guess = {
  answer: string;
  playerIndex: number;
};

export default function Game() {
  const location = useLocation();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [gameStarted, setGameStarted] = React.useState<boolean>(false);
  const [myTurn, setMyTurn] = React.useState<boolean>(false);
  const [guesses, _setGuesses] = React.useState<Guess[]>([]);
  const [playerIndex, setPlayerIndex] = React.useState<number | undefined>();
  const gameHash = location.pathname.replace("/", "");
  const gameID = parseInt(gameHash, 36);

  const [socket, setSocket] = React.useState<any>(null);
  const [words, setWords] = React.useState<string[]>([]);
  const [agents, setAgents] = React.useState<string[][]>([]);

  useEffect(() => {
    const newSocket = socket
      ? socket
      : io(
          process.env.NODE_ENV === "production"
            ? "wss://codenames-backend-node.herokuapp.com"
            : "ws://localhost:3000"
        );
    if (!socket) {
      setSocket(newSocket);
      setWords(generateWords(25, gameID));
      setAgents(generateAgents());
      newSocket.emit("join", gameHash);
    }
    newSocket.on("startGame", async (socketIndex: number) => {
      setGameStarted(true);
      setMyTurn(socketIndex === 0);
      setPlayerIndex(socketIndex);
    });
    newSocket.on("endTurn", (socketIndex: number) => {
      const newPlayerIndex = 1 - socketIndex;
      setMyTurn(newPlayerIndex === playerIndex);
    });
    newSocket.on(
      "makeGuess",
      (playerIndex: number, index: number, answer: string) => {
        setLoading(false);
        const newGuesses = [...guesses];
        newGuesses[index] = { answer, playerIndex };
        _setGuesses(newGuesses);
      }
    );
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
      setLoading(true);
      socket.emit("makeGuess", { gameHash, playerIndex, index, answer });
    },
    [gameHash, playerIndex, socket]
  );

  if (playerIndex && playerIndex > 1)
    return (
      <div>
        Too many players. <Link to={"/"}>Home</Link>
      </div>
    );
  return (
    <div>
      <Header>
        <Link to={"/"}>Home</Link>
        {gameStarted && <h1>{!myTurn && "NOT"} Your turn</h1>}
        {(playerIndex || playerIndex === 0) && (
          <div>You are player {playerIndex + 1}</div>
        )}
        {!gameStarted && <button onClick={startGame}>start game</button>}

        {gameStarted && myTurn && <button onClick={endTurn}>End turn</button>}
      </Header>
      {(playerIndex || playerIndex === 0) && (
        <>
          <Spinner loading={loading} />
          <WordGrid
            id={playerIndex}
            agents={agents[playerIndex]}
            endTurn={endTurn}
            endGame={endGame}
            gameStarted={gameStarted}
            guesses={guesses}
            hiddenAgents={agents[1 - playerIndex]}
            myTurn={myTurn}
            playerIndex={playerIndex}
            setGuesses={setGuesses}
            words={words}
          />
          <GuideGrid agents={agents[playerIndex]} words={words} />
        </>
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
