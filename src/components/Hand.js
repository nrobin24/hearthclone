import React from 'react';
import Card from './Card'

const styles = {
  base: {
    width: 600,
    height: 140,
    display: 'flex',
    justifyContent: 'space-between'
  }
}

export function Hand({hand, actions}) {
  return (
      <div style={styles.base}>
        {hand.map((card, i) => <Card card={card} actions={actions} key={i}/>)}
      </div>
  )
}
