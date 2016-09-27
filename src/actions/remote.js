const config = require('json!../../config.json')

import * as types from '../constants/ActionTypes'
import 'whatwg-fetch'


export function startGameSuccess(payload) {
  return {type: types.START_GAME_SUCCESS, payload}
}

export function startGameError(payload) {
  return {type: types.START_GAME_ERROR, payload}
}

export function endTurnSuccess(payload) {
  return {type: types.END_TURN_SUCCESS, payload}
}

export function endTurnError(payload) {
  return {type: types.END_TURN_ERROR, payload}
}

export function endTurnRequest(gameState) {
  const url = config.serverBaseUrl + '/endTurn'
  const params = {
    body: gameState
  }
	return (dispatch) => {
    fetch(url, params)
      .then(res => res.json())
      .then((gameState) => {
        dispatch(endTurnSuccess({gameState}))
      })
      .catch((e) => {
        dispatch(endTurnError(e))
      })
	};
}

export function startGameRequest() {
  const url = config.serverBaseUrl + '/startGame'
	return (dispatch) => {
    fetch(url)
      .then(res => res.json())
      .then((gameState) => {
        dispatch(startGameSuccess({gameState}))
      })
      .catch((e) => {
        dispatch(startGameError(e))
      })
	};
}
