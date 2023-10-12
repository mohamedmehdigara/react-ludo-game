import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const DiceContainer = styled.div`
  /* Customize your dice container styles here */
  width: 100px;
  height: 100px;
  background-color: #fff;
  border: 2px solid #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  user-select: none;

  /* Apply the rolling animation if the dice is rolling */
  ${({ isRolling }) =>
    isRolling &&
    css`
      animation: ${rollAnimation} 1s linear infinite;
    `}
`;

const rollAnimation = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(90deg); }
  50% { transform: rotate(180deg); }
  75% { transform: rotate(270deg); }
  100% { transform: rotate(360deg); }
`;

const RollingDice = styled(DiceContainer)`
  /* Additional styles for the rolling dice */
  background: linear-gradient(to bottom, #fff, #ddd);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  transform-origin: center center;
  border-color: transparent;
`;

const Dice = ({ value, isRolling, rollDice }) => {
  const handleClick = () => {
    if (!isRolling) {
      // Prevent rolling while the dice is already rolling
      rollDice();
    }
  };

  return (
    <DiceContainer onClick={handleClick} isRolling={isRolling}>
      {isRolling ? (
        <RollingDice>{value}</RollingDice>
      ) : (
        value
      )}
    </DiceContainer>
  );
};

export default Dice;
