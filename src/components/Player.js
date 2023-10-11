// Player.js
import React from 'react';
import styled from 'styled-components';
import Token from './Token';

const PlayerContainer = styled.div`
  /* Add your player styles here */
  border: ${({ currentPlayer }) => (currentPlayer ? '2px solid yellow' : '2px solid transparent')};
  padding: 10px;
`;

const Player = ({ name, color, tokens, currentPlayer, rollDice, moveToken }) => {
  const remainingTokens = tokens.filter((token) => token.position !== -1);

  return (
    <PlayerContainer currentPlayer={currentPlayer}>
      <h2>{name}</h2>
      <div style={{ backgroundColor: color }}>
        {remainingTokens.map((token) => (
          <Token
            key={token.id}
            position={token.position}
            playerId={token.playerId}
            currentPlayer={currentPlayer}
            onTokenMove={token.onTokenMove}
          />
        ))}
      </div>
      <div>Remaining Tokens: {remainingTokens.length}</div>
      {currentPlayer && (
        <div>
          <button onClick={rollDice}>Roll Dice</button>
          <button onClick={moveToken}>Move Token</button>
        </div>
      )}
    </PlayerContainer>
  );
};

export default Player;
