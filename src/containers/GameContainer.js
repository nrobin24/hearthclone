import {connect} from 'react-redux'
import {Game} from '../components/Game'
import {bindActionCreators} from 'redux'
import {startGameRequest} from '../actions/remote'


const GameActions = {
  startGameRequest
}

function mapStateToProps({game}) {
  // let players = game.get('players').map((playerId) => {
  //   const ofThisPlayer = belongsToPlayer(playerId)
  //   return {
  //     mana: getMana(game, playerId),
  //     heroName: game.getIn(['heroNames', playerId]),
  //     life: game.getIn(['lives', playerId]),
  //     hand: game.get('cardInstances').filter(ofThisPlayer),
  //     isTurn: game.getIn(['turns', playerId]),
  //     table: game.get('minions').filter(ofThisPlayer),
  //     imageUrl: game.getIn(['imageUrls', playerId]),
  //     playerId
  //   }
  // })
  // return {players}
  console.log('mapStateToProps game', game)
  return game
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(GameActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
