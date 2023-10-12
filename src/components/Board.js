import React from 'react';
import styled from 'styled-components';

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(11, 40px);
  grid-template-rows: repeat(11, 40px);
  gap: 2px;
  border: 2px solid #333;
  width: 440px;
  height: 440px;
`;

const Square = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ color }) => color || '#fff'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
`;

const Token = styled.div`
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

const Board = ({ players, customColors }) => {
  const boardLayout = Array(11)
    .fill(null)
    .map((_, row) =>
      Array(11)
        .fill(null)
        .map((_, col) => (
          <Square
            key={`square-${row}-${col}`}
            color={customColors && customColors[row][col]}
          >
            {/* Render board elements */}
          </Square>
        ))
    );

  // Place tokens on the board
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

  // Customize the center circle
  boardLayout[5][5] = (
    <Square
      key="center-circle"
      color={customColors && customColors[5][5]}
    >
      {/* Customize center circle */}
    </Square>
  );

  // Customize the paths
  for (let i = 1; i <= 4; i++) {
    boardLayout[5][i] = (
      <Square
        key={`path-5-${i}`}
        color={customColors && customColors[5][i]}
      >
        {/* Customize path */}
      </Square>
    );
    boardLayout[5 + i][5] = (
      <Square
        key={`path-${5 + i}-5`}
        color={customColors && customColors[5 + i][5]}
      >
        {/* Customize path */}
      </Square>
    );
  }

  // Customize the winning zones
  // Add more winning zones as needed
  boardLayout[1][1] = (
    <Square
      key="winning-zone-1"
      color={customColors && customColors[1][1]}
    >
      {/* Customize winning zone */}
    </Square>
  );
  boardLayout[9][1] = (
    <Square
      key="winning-zone-2"
      color={customColors && customColors[9][1]}
    >
      {/* Customize winning zone */}
    </Square>
  );
  boardLayout[1][9] = (
    <Square
      key="winning-zone-3"
      color={customColors && customColors[1][9]}
    >
      {/* Customize winning zone */}
    </Square>
  );
  boardLayout[9][9] = (
    <Square
      key="winning-zone-4"
      color={customColors && customColors[9][9]}
    >
      {/* Customize winning zone */}
    </Square>
  );

  return <BoardContainer>{boardLayout.flat()}</BoardContainer>;
};

const getPositionCoordinates = (position) => {
  const row = position % 11;
  const col = Math.floor(position / 11);
  return [row, col];
};

export default Board;
