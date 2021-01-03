import { useCallback } from "react";
import styled from "styled-components";

type Props = {
  agent?: string;
  children: string;
  gameStarted: boolean;
};

const StyledWord = styled.div<{ agent?: string; gameStarted: boolean }>`
  border: 1px solid #000;
  text-align: center;
  background: ${(props) => props.agent && props.agent === "Comrade" && `green`};
  background: ${(props) => props.agent && props.agent === "Assassin" && `red`};
  cursor: ${(props) => (props.gameStarted ? "pointer" : "default")};
`;

export default function Word({ agent, children, gameStarted }: Props) {
  const handleClick = useCallback(() => {
    if (gameStarted) {
      // make a guess
    }
  }, [gameStarted]);
  return (
    <StyledWord agent={agent} onClick={handleClick} gameStarted={gameStarted}>
      {children}
    </StyledWord>
  );
}
