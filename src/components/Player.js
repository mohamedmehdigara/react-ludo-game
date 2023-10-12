import React from 'react';
import styled from 'styled-components';
import Token from './Token';
import Dice from './Dice'; // Import the Dice component

const PlayerContainer = styled.div`
  /* Customize your player container styles here */
  border: ${({ currentPlayer }) => (currentPlayer ? '2px solid yellow' : '2px solid transparent')};
  padding: 20px;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PlayerInfo = styled.div`
  /* Customize player information styles here */
  text-align: center;
  margin-bottom: 10px;
  color: ${({ color }) => color};
`;

const PlayerTokens = styled.div`
  /* Customize player tokens container styles here */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  /* Customize button styles here */
  margin: 5px;
  padding: 10px 20px;
  background-color: ${({ color }) => color};
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
`;

const Player = ({ name, color, tokens, currentPlayer, rollDice, moveToken }) => {
  const remainingTokens = tokens.filter((token) => token.position !== -1);

  return (
    <PlayerContainer currentPlayer={currentPlayer}>
      <PlayerInfo color={color}>
        <h2>{name}</h2>
        <p>Color: {color}</p>
      </PlayerInfo>
      <div style={{ backgroundColor: color }}>
        <PlayerTokens>
          {remainingTokens.map((token) => (
            <Token
              key={token.id}
              position={token.position}
              playerId={token.playerId}
              currentPlayer={currentPlayer}
              onTokenMove={token.onTokenMove}
            />
          ))}
        </PlayerTokens>
      </div>
      <div>Remaining Tokens: {remainingTokens.length}</div>
      <ButtonContainer>
        <Button color={color} onClick={rollDice}>
          Roll Dice
        </Button>
        <Button
          color={color}
          onClick={moveToken}
          disabled={remainingTokens.length === 0}
        >
          Move Token
        </Button>
      </ButtonContainer>
      <Dice
        value={1} // Replace with the actual dice value
        isRolling={false} // Replace with the rolling state
        rollDice={rollDice}
      />
    </PlayerContainer>
  );
};

export default Player;
