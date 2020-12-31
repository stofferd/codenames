import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";

type Props = {};
export default function Game(props: Props) {
  useEffect(() => {
    const socket = io("ws://localhost:3000");
    console.log({ socket });
  }, []);

  return (
    <div>
      <Link to={"/"}>Home</Link>
      <h1>GAME!!!</h1>
    </div>
  );
}
