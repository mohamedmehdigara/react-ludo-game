// Token.js
import React from 'react';
import styled, { keyframes } from 'styled-components';

const TokenContainer = styled.div`
  /* Add your token styles here */
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  background-color: ${({ backgroundColor }) => backgroundColor || 'transparent'};
  cursor: ${({ isAnimated }) => (isAnimated ? 'not-allowed' : 'pointer')};
  user-select: none;
  animation: ${({ isAnimated }) => (isAnimated ? `${moveAnimation} 0.5s linear` : 'none')};
`;

const moveAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const Token = ({ position, playerColor, isAnimated, onClick }) => {
  return (
    <TokenContainer backgroundColor={playerColor} isAnimated={isAnimated} onClick={isAnimated ? null : onClick}>
      {position}
    </TokenContainer>
  );
};

export default Token;
