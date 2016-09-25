import React from 'react';

const styles = {
  table: {
    border: '3px solid tan',
    height: 80,
    width: 540,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'relative',
    borderRadius: 10
  },
  tableSurface: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1
  },
  minion: {
    fontSize: 12,
    width: 42,
    height: 62,
    backgroundColor: 'purple',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'stretch',
    textAlign: 'center',
    zIndex: 2,
    padding: 4,
    color: 'white',
    selected: {
      border: '3px solid green'
    },
    upper: {
      flexBasis: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    lower: {
      flexBasis: '50%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end'
    }
  }
}

function Minion({minion, actions}) {
  const {minionInstanceId, isSelected, name, attack, health, awake, damage} = minion.toJS()
  function getStyle() {
    return Object.assign({}, styles.minion, isSelected ? styles.minion.selected : null)
  }
  function handleClickMinion(e) {
    e.preventDefault()
    e.stopPropagation()
    actions.clickMinion({minionInstanceId})
  }
  const sleepBubble = <div style={styles.minion.sleepBubble}>
      zZzZ
    </div>
  return (
    <div style={getStyle()} onClick={handleClickMinion}>
      {!awake && sleepBubble}
      <div style={styles.minion.upper}>
        {name}
      </div>
      <div style={styles.minion.lower}>
        <div style={styles.minion.attackText}>
          {attack}
        </div>
        <div style={styles.minion.healthText}>
          {health - damage}
        </div>
      </div>
    </div>
  );
}

export function Table({table, playerId, actions}) {
  let handleClickTable = () => actions.clickTable({playerId})
  return (
    <div style={styles.table} onClick={handleClickTable}>
      <div style={styles.tableSurface}></div>
      {table.map((minion, i) => <Minion minion={minion} actions={actions} key={i}/>)}
    </div>
  );
}
