import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Loading = styled.div`
  position: fixed;
  background: rgba(255, 255, 255, 0.8);
  width: 100vw;
  height: 100vh;
  top: 0;

  &:before {
    content: "";
    display: block;
    border: 1px solid #000;
    animation: ${rotate} 2s linear infinite;
    box-sizing: border-box;
    border-radius: 100%;
    border-left: 0;
    width: 32px;
    height: 32px;
    position: absolute;
    top: 50%;
    left: 50%;
  }
`;

export default function Game({ loading }: { loading: boolean }) {
  return loading ? <Loading /> : null;
}
