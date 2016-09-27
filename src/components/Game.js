import React from 'react';
import {Player} from './Player'

const styles = {
  playerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContet: 'center',
    alignItems: 'center',
    width: 600,
    height: 600
  },
  bottomBar: {
    width: 600,
    height: 50
  },
  game: {
    fontFamily: 'sans-serif'
  }
}

export function Game({playerStates, actions}) {
  console.log('woo game here', playerStates)
  return (
    <div style={styles.game}>
      <div style={styles.playerContainer}>
        {playerStates.map((player, i) => <Player player={player} actions={actions} key={i}/>)}
      </div>
      <div style={styles.bottomBar}>
        <button onClick={actions.startGameRequest}>Start Game</button>
        <button onClick={actions.endTurn}>End Turn</button>
      </div>
    </div>
  )
}
