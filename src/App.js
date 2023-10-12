// App.js
import React, { useState } from 'react';
import styled from 'styled-components';
import Player from './components/Player';
import Dice from './components/Dice'; // Import Dice component
import Board from './components/Board'; // Import Board component

const AppContainer = styled.div`
  /* Add your app styles here */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App = () => {
  const [diceValue, setDiceValue] = useState(1);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const players = [
    {
      name: 'Player 1',
      color: 'red',
      tokens: [
        { id: 1, position: 0, playerId: 0 },
        { id: 2, position: 0, playerId: 0 },
      ],
    },
    {
      name: 'Player 2',
      color: 'blue',
      tokens: [
        { id: 3, position: 0, playerId: 1 },
        { id: 4, position: 0, playerId: 1 },
      ],
    },
  ];

  const rollDice = () => {
    const newValue = Math.floor(Math.random() * 6) + 1;
    setDiceValue(newValue);

    // Implement token movement logic and game rules here
    // Update token positions and check for win conditions

    // Switch to the next player's turn
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextPlayerIndex);
  };

  const moveToken = () => {
    // Implement token movement logic based on the dice roll
  };

  return (
    <AppContainer>
      <h1>Ludo Game</h1>
      <div>
        <Dice value={diceValue} rollDice={rollDice} />
      </div>
      <div style={{ display: 'flex' }}>
        {players.map((player, index) => (
          <Player
            key={index}
            name={player.name}
            color={player.color}
            tokens={player.tokens}
            currentPlayer={index === currentPlayerIndex}
            rollDice={rollDice}
            moveToken={moveToken}
          />
        ))}
      </div>
      <Board players={players} /> {/* Render the game board with player positions */}
    </AppContainer>
  );
};

export default App;
