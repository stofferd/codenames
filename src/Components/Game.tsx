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
      console.log();
      setGameStarted(true);
      setMyTurn(socketIndex === 0);
    });

    newSocket.emit("join", gameHash);

    // newSocket.on("connection", (connectionARg: string) => {
    //   console.log("CONNECTED");
    //   console.log({ connectionARg });
    // });
    // newSocket.on("test2", (arg: string) => {
    //   console.log(arg);
    // });
    // newSocket.on("clients", (clients: any) => {
    //   console.log({ clients });
    // });
    // newSocket.on("socketID", (connCount: any) => console.log({ connCount }));
    newSocket.on("connectionCount", (connCount: any) =>
      console.log({ connCount })
    );

    setWords(generateWords(25, gameID));
    setAgents(generateAgents());

    // talk to backend to see how many connections there are
    (async () => {
      // await newSocket.emit("getSocketID", true);
      await newSocket.emit("getConnectionCount", true);
    })();
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
      <WordGrid id={0} agents={agents[0]} words={words} />
      <WordGrid id={1} agents={agents[1]} words={words} />
    </div>
  );
}
