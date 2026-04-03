import React, { useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// --- CONSTANTS ---
const TOTAL_STEPS = 15;
const START_ROLL = 6;

// --- ZUSTAND STORE WITH PERSISTENCE ---
const useGameStore = create(
  persist(
    (set, get) => ({
      status: 'START', // START, PLAYING, WON
      winner: null,
      diceValue: 1,
      currentPlayerIndex: 0,
      gameLog: "Welcome! Press Start to play.",
      players: [
        { id: 0, name: 'Red Team', color: '#e94560', tokens: [{ id: 'r1', pos: 0 }, { id: 'r2', pos: 0 }] },
        { id: 1, name: 'Blue Team', color: '#00d2ff', tokens: [{ id: 'b1', pos: 0 }, { id: 'b2', pos: 0 }] },
      ],

      startGame: () => set({ status: 'PLAYING', gameLog: "Player 1's turn to roll!" }),

      resetGame: () => set({
        status: 'START',
        winner: null,
        diceValue: 1,
        currentPlayerIndex: 0,
        gameLog: "Game Reset.",
        players: [
          { id: 0, name: 'Red Team', color: '#e94560', tokens: [{ id: 'r1', pos: 0 }, { id: 'r2', pos: 0 }] },
          { id: 1, name: 'Blue Team', color: '#00d2ff', tokens: [{ id: 'b1', pos: 0 }, { id: 'b2', pos: 0 }] },
        ],
      }),

      rollDice: () => {
        if (get().status !== 'PLAYING') return;
        const val = Math.floor(Math.random() * 6) + 1;
        set({ diceValue: val, gameLog: `Rolled a ${val}!` });

        // Check if player has ANY valid move. If not, auto-skip.
        const player = get().players[get().currentPlayerIndex];
        const canMove = player.tokens.some(t => 
          (t.pos === 0 && val === START_ROLL) || (t.pos > 0 && t.pos + val <= TOTAL_STEPS)
        );

        if (!canMove) {
          setTimeout(() => {
            set(state => ({ 
              gameLog: "No valid moves! Skipping turn...",
              currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length 
            }));
          }, 1000);
        }
      },

      moveToken: (playerId, tokenId) => {
        const { diceValue, currentPlayerIndex, players, status } = get();
        if (status !== 'PLAYING' || playerId !== currentPlayerIndex) return;

        const newPlayers = JSON.parse(JSON.stringify(players));
        const player = newPlayers[playerId];
        const token = player.tokens.find(t => t.id === tokenId);

        // 1. Move out of base
        if (token.pos === 0) {
          if (diceValue === START_ROLL) {
            token.pos = 1;
          } else return;
        } 
        // 2. Advance token
        else if (token.pos + diceValue <= TOTAL_STEPS) {
          token.pos += diceValue;
        } else return;

        // 3. Collision Logic
        newPlayers.forEach((p, pIdx) => {
          if (pIdx !== playerId) {
            p.tokens.forEach(t => {
              if (t.pos === token.pos && token.pos !== 0) {
                t.pos = 0;
                set({ gameLog: `BOOM! ${player.name} sent ${p.name} home!` });
              }
            });
          }
        });

        // 4. Win Condition for Player
        const allFinished = player.tokens.every(t => t.pos === TOTAL_STEPS);
        if (allFinished) {
          set({ status: 'WON', winner: player.name });
          return;
        }

        // 5. Turn Management (Roll 6 gets another turn)
        if (diceValue !== 6) {
          set({
            players: newPlayers,
            currentPlayerIndex: (currentPlayerIndex + 1) % players.length,
            diceValue: 1
          });
        } else {
          set({ players: newPlayers, gameLog: "Lucky 6! Roll again!" });
        }
      }
    }),
    { name: 'ludo-storage' }
  )
);

// --- STYLED COMPONENTS ---
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #1a1a2e;
  color: white;
  min-height: 100vh;
  padding: 40px 20px;
  font-family: 'Poppins', sans-serif;
`;

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 rgba(233, 69, 96, 0.4); }
  50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(233, 69, 96, 0.6); }
  100% { transform: scale(1); box-shadow: 0 0 0 rgba(233, 69, 96, 0.4); }
`;

const Button = styled.button`
  background: #e94560;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
  margin: 10px;
  transition: 0.3s;
  &:hover { background: #ff5e78; }
`;

const DiceUI = styled.div`
  width: 80px;
  height: 80px;
  background: white;
  color: #1a1a2e;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 900;
  border-radius: 12px;
  margin: 20px 0;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0,0,0,0.5);
  animation: ${props => props.active ? css`${pulse} 1.5s infinite` : 'none'};
`;

const Board = styled.div`
  display: flex;
  gap: 15px;
  padding: 20px;
  background: #16213e;
  border-radius: 20px;
  box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
`;

const Track = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 50px);
  grid-gap: 8px;
`;

const Cell = styled.div`
  width: 50px;
  height: 50px;
  background: ${props => props.finish ? '#0f3460' : '#1a1a2e'};
  border: 2px solid ${props => props.finish ? '#e94560' : '#0f3460'};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Token = styled.div`
  width: 32px;
  height: 32px;
  background: ${props => props.color};
  border: 3px solid white;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  z-index: 5;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  pointer-events: ${props => props.canClick ? 'auto' : 'none'};
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  &:hover { transform: scale(1.2) translateY(-5px); }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(26, 26, 46, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

// --- APP COMPONENT ---
export default function App() {
  const store = useGameStore();

  const getTokensAt = (step) => {
    let results = [];
    store.players.forEach(p => {
      p.tokens.forEach(t => {
        if (t.pos === step) results.push({ ...t, color: p.color, pIdx: p.id });
      });
    });
    return results;
  };

  return (
    <AppContainer>
      {store.status === 'START' && (
        <Overlay>
          <h1>LUDO TURBO</h1>
          <Button onClick={store.startGame}>START NEW GAME</Button>
        </Overlay>
      )}

      {store.status === 'WON' && (
        <Overlay>
          <h1 style={{color: '#e94560'}}>🏆 {store.winner} WINS!</h1>
          <Button onClick={store.resetGame}>PLAY AGAIN</Button>
        </Overlay>
      )}

      <h1>LUDO TURBO</h1>
      <div style={{color: store.players[store.currentPlayerIndex].color, fontWeight: 'bold'}}>
        {store.players[store.currentPlayerIndex].name.toUpperCase()}'S TURN
      </div>

      <DiceUI active={store.status === 'PLAYING'} onClick={store.rollDice}>
        {store.diceValue}
      </DiceUI>

      <p style={{fontStyle: 'italic', color: '#888'}}>{store.gameLog}</p>

      <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
        {/* PLAYER 1 BASE */}
        <Base color={store.players[0].color}>
          {store.players[0].tokens.filter(t => t.pos === 0).map(t => (
            <Token 
              key={t.id} 
              color={store.players[0].color} 
              canClick={store.currentPlayerIndex === 0}
              onClick={() => store.moveToken(0, t.id)}
            >BASE</Token>
          ))}
        </Base>

        <Board>
          <Track>
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <Cell key={i} finish={i + 1 === TOTAL_STEPS}>
                <span style={{fontSize: '10px', color: '#333'}}>{i + 1}</span>
                {getTokensAt(i + 1).map((t, idx) => (
                  <Token 
                    key={t.id} 
                    color={t.color} 
                    canClick={t.pIdx === store.currentPlayerIndex}
                    style={{ left: `${idx * 4}px`, top: `${idx * 4}px` }}
                    onClick={() => store.moveToken(t.pIdx, t.id)}
                  >
                    T
                  </Token>
                ))}
              </Cell>
            ))}
          </Track>
        </Board>

        {/* PLAYER 2 BASE */}
        <Base color={store.players[1].color}>
          {store.players[1].tokens.filter(t => t.pos === 0).map(t => (
            <Token 
              key={t.id} 
              color={store.players[1].color} 
              canClick={store.currentPlayerIndex === 1}
              onClick={() => store.moveToken(1, t.id)}
            >BASE</Token>
          ))}
        </Base>
      </div>

      <Button style={{marginTop: '30px', opacity: 0.5}} onClick={store.resetGame}>Quit Game</Button>
    </AppContainer>
  );
}

const Base = styled.div`
  width: 100px;
  height: 100px;
  border: 2px dashed ${props => props.color};
  border-radius: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  position: relative;
`;