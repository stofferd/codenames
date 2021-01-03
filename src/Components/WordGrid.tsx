import styled from "styled-components";
import Word from "./Word";

const Grid = styled.div`
  display: grid;
  grid: repeat(5, 50px) / repeat(5, 20%);
  border: 2px solid #333;
  margin: 20px;
  padding: 20px;
`;

type Props = {
  id: number;
  agents: string[];
  endTurn: () => void;
  endGame: () => void;
  guesses: string[];
  myTurn: boolean;
  setGuesses: (index: number, answer: "Bystander" | "Comrade") => void;
  hiddenAgents: string[];
  gameStarted: boolean;
  words: string[];
};

export default function WordGrid({
  agents,
  endTurn,
  endGame,
  guesses,
  gameStarted,
  hiddenAgents,
  myTurn,
  setGuesses,
  words,
}: Props) {
  return (
    <Grid>
      {words.map((word: string, index: number) => (
        <Word
          agent={agents[index]}
          endTurn={endTurn}
          endGame={endGame}
          gameStarted={gameStarted}
          guess={guesses[index]}
          hiddenAgent={hiddenAgents[index]}
          index={index}
          key={index}
          myTurn={myTurn}
          setGuesses={setGuesses}
        >
          {word}
        </Word>
      ))}
    </Grid>
  );
}
