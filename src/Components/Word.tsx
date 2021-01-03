import { useCallback } from "react";
import styled from "styled-components";
import { Guess } from "./Game";

type Props = {
  agent?: string;
  hiddenAgent?: string;
  children: string;
  endTurn: () => void;
  endGame: () => void;
  gameStarted: boolean;
  guess?: Guess;
  index: number;
  myTurn: boolean;
  playerIndex: number;
  setGuesses: (index: number, answer: "Bystander" | "Comrade") => void;
};

const StyledWord = styled.div<{
  agent?: string;
  gameStarted: boolean;
  guess?: Guess;
  myTurn: boolean;
  playerIndex: number;
}>`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  text-align: center;
  background: ${(props) =>
    props.guess && props.guess.answer === "Comrade" && `green`};
  background: ${(props) =>
    props.guess && props.guess.answer === "Bystander" && `yellow`};
  cursor: ${(props) =>
    props.gameStarted &&
    props.myTurn &&
    (!props.guess ||
      (props.guess.answer === "Bystander" &&
        props.guess.playerIndex !== props.playerIndex))
      ? "pointer"
      : "default"};
`;

const Bystander = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  border-radius: 100%;
  width: 20px;
  height: 20px;
  background: #222;
  color: #fff;
  font-size: 10px;
  font-weight: bold;
  line-height: 1.8;
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
  playerIndex,
  setGuesses,
}: Props) {
  const handleClick = useCallback(() => {
    if (gameStarted && myTurn) {
      if (
        guess &&
        (guess.answer === "Comrade" ||
          (guess.answer === "Bystander" && guess.playerIndex === playerIndex))
      )
        return;
      if (hiddenAgent === "Assassin") {
        endGame();
      } else if (hiddenAgent === "Comrade") {
        setGuesses(index, "Comrade");
      } else {
        setGuesses(index, "Bystander");
        endTurn();
      }
    }
  }, [
    endGame,
    endTurn,
    gameStarted,
    guess,
    hiddenAgent,
    index,
    myTurn,
    playerIndex,
    setGuesses,
  ]);
  return (
    <StyledWord
      agent={agent}
      guess={guess}
      onClick={handleClick}
      gameStarted={gameStarted}
      myTurn={myTurn}
      playerIndex={playerIndex}
    >
      {guess && guess.answer === "Bystander" && (
        <Bystander title={`Guessed by player ${guess.playerIndex + 1}`}>
          {guess.playerIndex + 1}
        </Bystander>
      )}
      {/* {hiddenAgent === "Assassin" && <span>X(</span>}
      {hiddenAgent === "Comrade" && <span>:)</span>} */}
      {children}
    </StyledWord>
  );
}
