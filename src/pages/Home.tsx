import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [gameID, setGameID] = useState("");

  useEffect(() => {
    setGameID((+new Date()).toString(36)); // "iepii89m"
    console.log({ gameID });
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <Link to={"/"}>Home</Link>
      <Link to={`/${gameID}`}>New Game</Link>
    </div>
  );
}
