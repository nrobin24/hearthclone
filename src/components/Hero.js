import React from 'react'

var styles = {
  inner: {
    left: {
      display: 'flex',
      alignItems: 'center'
    },
    right: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  },
  base: {
    backgroundColor: 'navy',
    color: 'white',
    padding: 2,
    borderRadius: 10,
    marginRight: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    image: {
      width: 30,
      height: 35
    },
    name: {
      fontSize: 12,
      marginBottom: 2
    },
    life: {
      fontSize: 10,
      color: 'lime'
    },
    selected: {
      border: '2px solid lime'
    }
  }
}

export function Hero({name, actions, playerId, life, isTurn, imageUrl}) {
  function handleClick(e) {
    actions.clickHero({playerId})
  }
  const baseStyle = Object.assign({}, styles.base, isTurn ? styles.base.selected : {})
  const className = isTurn ? 'hvr-ripple-out' : ''
  return (
    <div onClick={handleClick} style={baseStyle} className={className}>
      <div style={styles.inner.left}>
        <img style={styles.base.image} src={imageUrl}/>
      </div>
      <div style={styles.inner.right}>
        <div style={styles.base.name}>
          {name}
        </div>
        <div style={styles.base.life}>
          {life}
        </div>
      </div>
    </div>
  )
}
