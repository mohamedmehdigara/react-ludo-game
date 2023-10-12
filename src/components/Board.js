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
`;

const Board = ({ players }) => {
  // You can create the board layout here with different squares, paths, and safe zones.

  // Example: Create an 11x11 grid
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

  // Place player tokens on the board based on their positions

  // Example: Place tokens for each player
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
  // Example: For a basic 11x11 board
  return [position % 11, Math.floor(position / 11)];
};

export default Board;
