import React, { useCallback, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import io from "socket.io-client";
import generateAgents from "../lib/generateAgents";
import generateWords from "../lib/generateWords";
import WordGrid from "./WordGrid";

type Props = {};

export default function Game(props: Props) {
  const [gameID, setGameID] = React.useState(0);
  const location = useLocation();
  const [socket, setSocket] = React.useState<any>(null);
  const [words, setWords] = React.useState<string[]>([]);
  const [agents, setAgents] = React.useState<string[][]>([]);

  useEffect(() => {
    setGameID(parseInt(location.pathname.replace("/", ""), 36));
    const newSocket = io("ws://localhost:3000");
    setSocket(newSocket);
    console.log(newSocket);
    newSocket.emit("join", "room1");

    newSocket.on("test2", (arg: string) => {
      console.log(arg);
    });
    newSocket.on("clients", (arg: any) => {
      console.log(arg);
    });
    setWords(generateWords(25, gameID));
    setAgents(generateAgents());
  }, []);
  console.log({ words });
  const testEvent = useCallback(() => {
    if (!socket) return;
    socket.emit("testes", "hey there");
  }, [socket]);

  return (
    <div>
      <Link to={"/"}>Home</Link>
      <h1>GAME!!!</h1>
      <button onClick={testEvent}>test event</button>
      <WordGrid id={0} agents={agents[0]} words={words} />
      <WordGrid id={1} agents={agents[1]} words={words} />
    </div>
  );
}
