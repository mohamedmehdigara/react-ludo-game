import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import PropTypes from 'prop-types';

const DiceContainer = styled.div`
  /* Customize your dice container styles here */
  width: 100px;
  height: 100px;
  background-color: ${({ backgroundColor }) => backgroundColor || '#fff'};
  border: 2px solid ${({ borderColor }) => borderColor || '#333'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: ${({ isRolling }) => (isRolling ? 'not-allowed' : 'pointer')};
  user-select: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  /* Apply the rolling animation if the dice is rolling */
  ${({ isRolling }) =>
    isRolling &&
    css`
      animation: ${rollAnimation} 1s linear infinite;
    `}
`;

DiceContainer.propTypes = {
  isRolling: PropTypes.bool,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  // ... other propTypes
};

const rollAnimation = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(90deg); }
  50% { transform: rotate(180deg); }
  75% { transform: rotate(270deg); }
  100% { transform: rotate(360deg); }
`;

const DiceFace = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DiceFaces = [
  // You can create realistic dice face components or use images
  // Example for a six-sided die:
  <DiceFace key="1">1</DiceFace>,
  <DiceFace key="2">2</DiceFace>,
  <DiceFace key="3">3</DiceFace>,
  <DiceFace key="4">4</DiceFace>,
  <DiceFace key="5">5</DiceFace>,
  <DiceFace key="6">6</DiceFace>,
];

const Dice = ({ rollValue, isRolling, rollDice, backgroundColor, borderColor }) => {
  // Use state to control the displayed face and simulate rolling animation
  const [displayedFace, setDisplayedFace] = useState(1);

  useEffect(() => {
    if (isRolling) {
      // Simulate rolling by changing the displayed face
      const rollInterval = setInterval(() => {
        // Generate a random face value for simulation
        const randomFace = Math.floor(Math.random() * 6) + 1;
        setDisplayedFace(randomFace);
      }, 100);

      // Stop rolling simulation after 1 second
      setTimeout(() => {
        clearInterval(rollInterval);
        setDisplayedFace(rollValue);
        rollDice();
      }, 1000);
    }
  }, [isRolling, rollValue, rollDice]);

  const handleClick = () => {
    if (!isRolling) {
      rollDice();
    }
  };

  return (
    <DiceContainer
      onClick={handleClick}
      isRolling={isRolling}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
    >
      {DiceFaces.map((face, index) => (
        <DiceFace
          key={index}
          style={{ display: displayedFace === index + 1 ? 'block' : 'none' }}
          aria-label={`Dice face ${index + 1}`}
        >
          {face}
        </DiceFace>
      ))}
    </DiceContainer>
  );
};

Dice.propTypes = {
  rollValue: PropTypes.number,
  isRolling: PropTypes.bool,
  rollDice: PropTypes.func,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  // ... other propTypes
};

export default Dice;
