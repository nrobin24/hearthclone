import * as types from '../constants/ActionTypes'

const initialState = {playerStates: []}

export function game(state = initialState, {type, payload}) {
  switch (type) {
    case types.START_GAME_SUCCESS:
      return payload.gameState
    case types.END_TURN_SUCCESS:
      return payload.gameState
    default:
      return state
  }
}
