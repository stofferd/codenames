import { useCallback } from "react";
import styled from "styled-components";

type Props = {
  agent?: string;
  hiddenAgent?: string;
  children: string;
  endTurn: () => void;
  endGame: () => void;
  gameStarted: boolean;
  guess?: string;
  index: number;
  myTurn: boolean;
  setGuesses: (index: number, answer: "Bystander" | "Comrade") => void;
};

const StyledWord = styled.div<{
  agent?: string;
  gameStarted: boolean;
  myTurn: boolean;
}>`
  border: 1px solid #000;
  text-align: center;
  background: ${(props) => props.agent && props.agent === "Comrade" && `green`};
  background: ${(props) => props.agent && props.agent === "Assassin" && `red`};
  cursor: ${(props) =>
    props.gameStarted && props.myTurn ? "pointer" : "default"};
`;

export default function Word({
  agent,
  children,
  endTurn,
  endGame,
  gameStarted,
  guess,
  hiddenAgent,
  index,
  myTurn,
  setGuesses,
}: Props) {
  const handleClick = useCallback(() => {
    if (gameStarted && myTurn) {
      // make a guess
      if (hiddenAgent === "Assassin") {
        endGame();
      } else if (hiddenAgent === "Comrade") {
        setGuesses(index, "Comrade");
      } else {
        setGuesses(index, "Bystander");
        endTurn();
      }
    }
  }, [endGame, endTurn, gameStarted, hiddenAgent, index, myTurn, setGuesses]);
  return (
    <StyledWord
      agent={agent}
      onClick={handleClick}
      gameStarted={gameStarted}
      myTurn={myTurn}
    >
      {guess && <span>{guess}</span>}
      {hiddenAgent === "Assassin" && <span>X(</span>}
      {hiddenAgent === "Comrade" && <span>:)</span>}
      {children}
    </StyledWord>
  );
}
