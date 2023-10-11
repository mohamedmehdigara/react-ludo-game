// Token.js
import React from 'react';
import styled from 'styled-components';

const TokenContainer = styled.div`
  /* Add your token styles here */
`;

const Token = ({ position, playerColor }) => {
  return <TokenContainer style={{ backgroundColor: playerColor }}>{position}</TokenContainer>;
};

export default Token;
