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
  gameStarted: boolean;
  words: string[];
};

export default function WordGrid({ agents, gameStarted, words }: Props) {
  return (
    <Grid>
      {words.map((word: string, index: number) => (
        <Word agent={agents[index]} gameStarted={gameStarted} key={index}>
          {word}
        </Word>
      ))}
    </Grid>
  );
}
