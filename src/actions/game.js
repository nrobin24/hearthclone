import * as types from '../constants/ActionTypes'

export function clickCard({cardInstanceId}) {
  return {type: types.CLICK_CARD, payload: {cardInstanceId}}
}

export function endTurn() {
  return {type: types.END_TURN}
}

export function clickTable({playerId}) {
  return {type: types.CLICK_TABLE, payload: {playerId}}
}

export function clickMinion({minionInstanceId}) {
  return {type: types.CLICK_MINION, payload: {minionInstanceId}}
}

export function startGame() {
  return {type: types.START_GAME}
}

export function clickHero({playerId}) {
  return {type: types.CLICK_HERO, payload: {playerId}}
}
