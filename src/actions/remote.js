const config = require('json!../../config.json')

import * as types from '../constants/ActionTypes'
import 'whatwg-fetch'


export function startGameSuccess(payload) {
  return {type: types.START_GAME_SUCCESS, payload}
}

export function startGameError(payload) {
  return {type: types.START_GAME_ERROR, payload}
}

export function startGameRequest() {
  const url = config.serverBaseUrl + '/startGame'
  console.log('heyyy')
	return (dispatch) => {
    fetch(url)
      .then((res) => {
        dispatch(startGameSuccess(res))
      })
      .catch((e) => {
        dispatch(startGameError(e))
      })
	};
}
