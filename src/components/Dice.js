// Dice.js
import React from 'react';
import styled, { keyframes } from 'styled-components';

const DiceContainer = styled.div`
  /* Add your dice container styles here */
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
`;

const rollAnimation = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(90deg); }
  50% { transform: rotate(180deg); }
  75% { transform: rotate(270deg); }
  100% { transform: rotate(360deg); }
`;

const RollingDice = styled(DiceContainer)`
  animation: ${rollAnimation} 1s linear infinite;
`;

const Dice = ({ value, isRolling, rollDice }) => {
  return (
    <DiceContainer onClick={rollDice} style={{ animationPlayState: isRolling ? 'running' : 'paused' }}>
      {value}
    </DiceContainer>
  );
};

export default Dice;
