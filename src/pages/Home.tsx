import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [gameID, setGameID] = useState(0);

  useEffect(() => {
    setGameID(+new Date());
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <Link to={"/"}>Home</Link>
      <Link to={{ pathname: `/${gameID.toString(36)}` }}>New Game</Link>
    </div>
  );
}
