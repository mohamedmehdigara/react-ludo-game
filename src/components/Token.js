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
  cursor: pointer;
  user-select: none;
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

const AnimatedToken = styled(TokenContainer)`
  /* Add token animation styles here */
  animation: ${moveAnimation} 0.5s linear;
`;

const Token = ({ position, playerColor, isAnimated, onClick }) => {
  return (
    <TokenContainer
      backgroundColor={playerColor}
      onClick={isAnimated ? null : onClick}
      style={{ animation: isAnimated ? `${moveAnimation} 0.5s linear` : 'none' }}
    >
      {position}
    </TokenContainer>
  );
};

export default Token;
