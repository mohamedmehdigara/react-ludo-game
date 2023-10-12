// Player.js
import React from 'react';
import styled from 'styled-components';
import Token from './Token';

const PlayerContainer = styled.div`
  /* Add your player container styles here */
  border: ${({ currentPlayer }) => (currentPlayer ? '2px solid yellow' : '2px solid transparent')};
  padding: 20px;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PlayerInfo = styled.div`
  /* Add player information styles here */
  text-align: center;
  margin-bottom: 10px;
`;

const PlayerTokens = styled.div`
  /* Add player tokens container styles here */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Button = styled.button`
  /* Add button styles here */
  margin: 5px;
  padding: 10px 20px;
  background-color: #007bff;
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
      <PlayerInfo>
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
      {currentPlayer && (
        <div>
          <Button onClick={rollDice}>Roll Dice</Button>
          <Button onClick={moveToken}>Move Token</Button>
        </div>
      )}
    </PlayerContainer>
  );
};

export default Player;
