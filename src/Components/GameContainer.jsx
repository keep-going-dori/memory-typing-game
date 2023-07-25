import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Cell from './Cell';

const GameContainer = () => {
  const [number, setNumber] = useState(1);
  const [isOut, setIsOut] = useState(false);

  const onMouseLeave = () => {
    setIsOut(true);
  };

  const onMouseEnter = () => {
    setIsOut(false);
  };
  return (
    <>
      <LevelDiv>{number}/20</LevelDiv>
      <GameContainerDiv onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <Cell number={number} setNumber={setNumber} isOut={isOut} />
      </GameContainerDiv>
    </>
  );
};

const LevelDiv = styled.div`
  font-weight: bold;
  text-align: end;
  font-size: 20px;
`;

const GameContainerDiv = styled.div`
  text-align: center;
  position: relative;
`;

export default GameContainer;
