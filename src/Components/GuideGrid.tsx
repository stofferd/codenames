import styled from "styled-components";

type Props = {
  agents: string[];
  words: string[];
};

const Grid = styled.div`
  display: grid;
  grid: repeat(5, 30px) / repeat(5, 20%);
  border: 2px solid #333;
  margin: 20px;
  padding: 20px;
  max-width: 300px;
`;

const Guide = styled.div<{
  agent?: string;
}>`
  border: 1px solid #000;
  background: ${(props) => props.agent && props.agent === "Comrade" && `green`};
  background: ${(props) => props.agent && props.agent === "Assassin" && `red`};
`;

export default function GuideGrid({ agents, words }: Props) {
  return (
    <Grid>
      {words.map((word: string, index: number) => (
        <Guide agent={agents[index]} key={index} />
      ))}
    </Grid>
  );
}
