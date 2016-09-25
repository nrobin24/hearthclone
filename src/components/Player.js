import React from 'react'
import {PLAYER_2_ID} from '../constants/GameParams'
import {Hand} from './Hand'
import {Table} from './Table'
import {Hero} from './Hero'
// import cashRollImage from '../../assets/images/cash-roll.jpg'
var cashRollImage = require("file!../../assets/images/cash-roll.jpg");

const styles = {
  base: {
    width: 600,
    height: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  rotated: {
    transform: 'rotate(180deg)'
  },
  player: {
    upper: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 4
    },
    lower: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  },
  manaBar: {
    display: 'flex',
    alignItems: 'center'
  },
  manaCrystal: {
    container: {
      width: 20,
      height: 20
    },
    bodyCharged: {
      width: 20,
      height: 20,
      opacity: 1
    },
    bodySpent: {
      width: 20,
      height: 20,
      opacity: 0.3
    }
  }
}
function getStyle(player) {
  return Object.assign(
    {},
    styles.base,
    player.playerId === PLAYER_2_ID && styles.rotated
  )
}


const cashRollStyle = {
  width: 30,
  height: 30
}

function ManaCrystal({spent}) {
  return (
    <div style={styles.manaCrystal.container}>
      <img style={spent ? styles.manaCrystal.bodySpent : styles.manaCrystal.bodyCharged} src={cashRollImage}/>
    </div>
  )
}

function ManaBar({total, spent}) {
  const manaCrystals = _.range(total)
    .map(i => <ManaCrystal spent={i >= total - spent}/>)

  return (
    <div style={styles.manaBar}>
      {manaCrystals}
    </div>
  )
}


export function Player({player, actions}) {
  const {isTurn, playerId, life, heroName, mana, hand, table, imageUrl} = player
  return (
    <div style={getStyle(player)}>
      <div style={styles.player.upper}>
        <Hero name={heroName} life={life} actions={actions} playerId={playerId} isTurn={isTurn} imageUrl={imageUrl}/>
        <ManaBar total={mana.total} spent={mana.spent} />
      </div>
      <div style={styles.player.lower}>
        <Hand hand={hand} actions={actions}/>
        <Table table={table} playerId={playerId} actions={actions}/>
      </div>
    </div>
  )
}
