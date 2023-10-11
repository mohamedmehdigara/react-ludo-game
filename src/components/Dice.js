// Dice.js
import React from 'react';
import styled from 'styled-components';

const DiceContainer = styled.div`
  /* Add your dice styles here */
`;

const Dice = ({ value, rollDice }) => {
  return (
    <DiceContainer onClick={rollDice}>
      {value}
    </DiceContainer>
  );
};

export default Dice;
