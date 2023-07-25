import styled from 'styled-components';
import { useEffect, useState } from 'react';
import useInterval from '../Custom/UseInterval';

const Cell = ({ number, setNumber, isOut }) => {
  const allTime = 2000;
  const [time, setTime] = useState(allTime);
  const [isRoundDone, setIsRoundDone] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [failCount, setFailCount] = useState(0);
  const [pressKey, setPressKey] = useState('');
  const [isHover, setIsHover] = useState(false);
  const [correctArray, setCorrectArray] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);

  const randomNumber = () => {
    return Math.floor(Math.random() * 16);
  };
  const getRandomAlphabet = () => {
    const korean = 'ㅁㅠㅊㅇㄷㄹㅎㅗㅑㅓㅏㅣㅡㅜㅐㅔㅂㄱㄴㅅㅕㅍㅈㅌㅛㅋ';
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
    const randomIndex = Math.floor(Math.random() * alphabets.length);
    return [alphabets[randomIndex], korean[randomIndex]];
  };
  useInterval(() => {
    if (number < 20) setNumber(number + 1);
    if (!isCorrect && failCount + correctCount < number) {
      setFailCount((prev) => prev + 1);
    }
  }, number < 20 && time);

  useEffect(() => {
    const arr = [];
    arr.push(randomNumber());
    arr.push(getRandomAlphabet());
    console.log(arr);
    setCorrectArray(arr);
    setTime((prev) => prev - 1000);
    setIsCorrect(false);
    setIsRoundDone(false);
    if (number >= 20) {
      setTimeout(() => {
        setIsRoundDone(true);
        setIsGameOver(true);
        setIsCorrect(false);
      }, 2200);
    }
  }, [number]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isRoundDone && !isGameOver) {
        if (isHover) {
          const key = event.key.toUpperCase();
          if (correctArray[1].includes(key)) {
            setPressKey(key);
            setIsHover(false);
            setIsCorrect(true);
            setCorrectCount((prev) => prev + 1);
            setIsRoundDone(true);
          } else {
            setFailCount((prev) => prev + 1);
            setIsRoundDone(true);
          }
        } else if (!isHover && !isOut) {
          setFailCount((prev) => prev + 1);
          setIsRoundDone(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isHover, isRoundDone, isOut]);

  const Hover = (i) => {
    if (correctArray[0] === i) {
      setIsHover(true);
    }
  };

  const mouseLeave = () => {
    setIsHover(false);
  };

  const rendering = () => {
    const result = [];
    for (let i = 0; i < 16; i += 1) {
      result.push(
        <CellDiv
          key={`${i}`}
          className={correctArray[0] === i ? 'correct' : ''}
          onMouseEnter={() => Hover(i)}
          onMouseLeave={mouseLeave}
          time={time}
        >
          {!isGameOver && correctArray[0] === i && correctArray[1][0]}
        </CellDiv>
      );
    }
    return result;
  };
  return (
    <>
      <FailCountDiv>실패 횟수 {failCount}</FailCountDiv>
      <FailCountDiv>정답 횟수 {correctCount}</FailCountDiv>
      <TableRowDiv $size={4}>
        {rendering()}
        {isRoundDone && !isGameOver && (
          <ResultDiv $isCorrect={isCorrect}>{isCorrect ? 'O' : 'X'}</ResultDiv>
        )}
        {isGameOver && <GameClearDiv>Game Clear!</GameClearDiv>}
      </TableRowDiv>
    </>
  );
};

const FailCountDiv = styled.div`
  font-weight: bold;
  text-align: end;
  font-size: 15px;
`;

const TableRowDiv = styled.div`
  width: ${(props) => props.$size * 110}px;
  margin: 5px;
  overflow: auto;
`;

const GameClearDiv = styled.div`
  font-weight: bold;
  /* background-color: white; */
  width: 100%;
  line-height: 440px;
  height: 440px;
  text-align: center;
  font-size: 4rem;
  position: absolute;
`;

const ResultDiv = styled.div`
  font-weight: bold;
  /* background-color: white; */
  width: 100%;
  line-height: 440px;
  height: 440px;
  text-align: center;
  font-size: 9rem;
  ${(props) =>
    props.$iscorrect
      ? 'color: rgb(101,212,110); '
      : 'color: rgb(235, 80, 58); animation: vibration 0.1s infinite;'}
  position: absolute;

  @keyframes vibration {
    from {
      transform: rotate(1deg);
    }
    to {
      transform: rotate(-1deg);
    }
  }
`;

const CellDiv = styled.div`
  background-color: rgb(111, 163, 231);
  border-radius: 10px;
  color: rgb(111, 163, 231);
  font-weight: bold;
  line-height: 100px;
  font-size: 4rem;
  margin: 5px;
  width: 100px;
  height: 100px;
  text-align: center;
  float: left;
  cursor: pointer;

  &.correct {
    color: white;
    ${(props) => `transition: color ${props.time} ease-in-out`};
  }

  &:hover {
    background-color: rgba(4, 28, 58, 0.75);
  }
`;

export default Cell;
