// Board.js
import React from 'react';
import styled from 'styled-components';

const BoardContainer = styled.div`
  /* Add your board styles here */
  display: grid;
  grid-template-columns: repeat(11, 40px);
  grid-template-rows: repeat(11, 40px);
  gap: 2px;
  border: 2px solid #333;
  width: 440px;
  height: 440px;
`;

const Square = styled.div`
  /* Add your square styles here */
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
`;

const Path = styled(Square)`
  /* Add path styles here */
  background-color: #e0e0e0;
`;

const SafeZone = styled(Square)`
  /* Add safe zone styles here */
  background-color: #90ee90;
`;

const Token = styled.div`
  /* Add token styles here */
  width: 80%;
  height: 80%;
  border-radius: 50%;
  background-color: ${({ color }) => color || '#000'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
`;

const Board = ({ players }) => {
  // Create the board layout
  const boardLayout = Array(11)
    .fill(null)
    .map((_, row) =>
      Array(11)
        .fill(null)
        .map((_, col) => {
          // Customize square rendering here (paths, safe zones, etc.)
          return (
            <Square key={`square-${row}-${col}`}>
              {/* Render board elements */}
            </Square>
          );
        })
    );

  // Add game-specific paths and safe zones
  for (let i = 1; i < 10; i++) {
    boardLayout[i][0] = <Path key={`path-${i}-0`} />;
    boardLayout[0][i] = <Path key={`path-0-${i}`} />;
    boardLayout[10][i] = <Path key={`path-10-${i}`} />;
    boardLayout[i][10] = <Path key={`path-${i}-10`} />;
  }

  for (let i = 4; i <= 7; i++) {
    boardLayout[5][i] = <SafeZone key={`safe-zone-5-${i}`} />;
    boardLayout[6][i] = <SafeZone key={`safe-zone-6-${i}`} />;
    boardLayout[i][5] = <SafeZone key={`safe-zone-${i}-5`} />;
    boardLayout[i][6] = <SafeZone key={`safe-zone-${i}-6`} />;
  }

  // Place player tokens on the board based on their positions
  players.forEach((player) => {
    player.tokens.forEach((token) => {
      const { position } = token;
      if (position >= 0) {
        const [row, col] = getPositionCoordinates(position);
        boardLayout[row][col] = (
          <Token key={`token-${token.id}`} color={player.color}>
            {token.id}
          </Token>
        );
      }
    });
  });

  return <BoardContainer>{boardLayout.flat()}</BoardContainer>;
};

// Helper function to get row and column coordinates from the position
const getPositionCoordinates = (position) => {
  // Implement the logic to convert position to row and column
  const row = position % 11;
  const col = Math.floor(position / 11);
  return [row, col];
};

export default Board;
