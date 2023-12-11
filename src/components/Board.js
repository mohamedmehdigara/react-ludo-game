import React, { useState } from 'react';
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
  cursor: pointer;
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

const CenterCircle = styled(Square)`
  background-color: #ccc;
  border-radius: 50%;
`;

const Path = styled(Square)`
  background-color: #e0e0e0;
`;

const WinningZone = styled(Square)`
  background-color: #ffeb3b;
`;

const Board = ({ players, customColors }) => {
  const [currentPlayer, setCurrentPlayer] = useState(0); // Index of the current player

  const handleCellClick = (row, col) => {
    // Handle cell click logic, e.g., placing a token
    console.log(`Cell clicked: Row ${row}, Column ${col}`);
  };

  const boardLayout = Array(11).fill(null).map((_, row) =>
    Array(11).fill(null).map((_, col) => {
      const isClickable = true; // Customize based on your logic
      const positionColor = customColors && customColors[row][col];
      return (
        <Square
          key={`square-${row}-${col}`}
          color={positionColor}
          onClick={() => isClickable && handleCellClick(row, col)}
        >
          {/* Render board elements */}
        </Square>
      );
    })
  );

  // Place tokens on the board
  players.forEach((player) => {
    player.tokens.forEach((token) => {
      const { position, customToken } = token;
      if (position >= 0) {
        const [row, col] = getPositionCoordinates(position);
        boardLayout[row][col] = (
          <Token key={`token-${token.id}`} color={player.color}>
            {customToken || token.id}
          </Token>
        );
      }
    });
  });

  // Customize the center circle
  boardLayout[5][5] = (
    <CenterCircle
      key="center-circle"
      color={customColors && customColors[5][5]}
    >
      {/* Customize center circle */}
    </CenterCircle>
  );

  // Customize the paths
  for (let i = 1; i <= 4; i++) {
    boardLayout[5][i] = (
      <Path
        key={`path-5-${i}`}
        color={customColors && customColors[5][i]}
      >
        {/* Customize path */}
      </Path>
    );
    boardLayout[5 + i][5] = (
      <Path
        key={`path-${5 + i}-5`}
        color={customColors && customColors[5 + i][5]}
      >
        {/* Customize path */}
      </Path>
    );
  }

  // Customize the winning zones
  // Add more winning zones as needed
  boardLayout[1][1] = (
    <WinningZone
      key="winning-zone-1"
      color={customColors && customColors[1][1]}
    >
      {/* Customize winning zone */}
    </WinningZone>
  );
  boardLayout[9][1] = (
    <WinningZone
      key="winning-zone-2"
      color={customColors && customColors[9][1]}
    >
      {/* Customize winning zone */}
    </WinningZone>
  );
  boardLayout[1][9] = (
    <WinningZone
      key="winning-zone-3"
      color={customColors && customColors[1][9]}
    >
      {/* Customize winning zone */}
    </WinningZone>
  );
  boardLayout[9][9] = (
    <WinningZone
      key="winning-zone-4"
      color={customColors && customColors[9][9]}
    >
      {/* Customize winning zone */}
    </WinningZone>
  );

  return (
    <div>
      <div>
        Current Turn: Player {currentPlayer + 1}
      </div>
      <BoardContainer>{boardLayout.flat()}</BoardContainer>
    </div>
  );
};

const getPositionCoordinates = (position) => {
  const row = position % 11;
  const col = Math.floor(position / 11);
  return [row, col];
};

export default Board;
