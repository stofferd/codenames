import styled from "styled-components";

type Props = {
  agent?: string;
  children: string;
};

const StyledWord = styled.div<{ agent?: string }>`
  border: 1px solid #000;
  text-align: center;
  background: ${(props) => props.agent && props.agent === "Comrade" && `green`};
  background: ${(props) => props.agent && props.agent === "Assassin" && `red`};
`;

export default function Word({ agent, children }: Props) {
  return <StyledWord agent={agent}>{children}</StyledWord>;
}
