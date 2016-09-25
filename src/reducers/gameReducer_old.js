import {fromJS, List, Repeat, Map, Set, is} from 'immutable'
import {PLAYER_1_ID, PLAYER_2_ID} from '../constants/GameParams'
import {START_GAME, CLICK_CARD, CLICK_TABLE, END_TURN, CLICK_MINION, CLICK_HERO} from '../constants/ActionTypes'
import {getCardInstance} from '../services/CardService'
import {createMinion} from '../services/MinionService'
import {cardDefinitions} from '../constants/cardDefinitions'

var mannieImage = require("file!../../assets/images/mannie-crop.jpg");

var birdmanImage = require("file!../../assets/images/birdman-crop.jpg");

function removeDead(minions) {
  return minions.filter(minion => minion.get('health') > minion.get('damage'))
}

function isSelected(item) {
  return item.get('isSelected')
}

function deselectAll(collection) {
  return collection.map(item => item.set('isSelected', false))
}

function setSelection(id) {
  return function(collection) {
    return collection.map(item =>  item.set('isSelected', item.includes(id)))
  }
}

function getSelection(collection) {
  return collection.find(item => item.get('isSelected'))
}

function belongsToPlayer(playerId) {
  return function(v, k) {
    return v.get('playerId') == playerId
  }
}

const initialState = fromJS({
  imageUrls: {
    [PLAYER_1_ID]: mannieImage,
    [PLAYER_2_ID]: birdmanImage
  },
  heroNames: {
    [PLAYER_1_ID]: "Mannie Fresh",
    [PLAYER_2_ID]: "Birdman"
  },
  manaTotals: {
    [PLAYER_1_ID]: 1,
    [PLAYER_2_ID]: 1
  },
  manaSpents: {
    [PLAYER_1_ID]: 0,
    [PLAYER_2_ID]: 0
  },
  cardInstances: {},
  players: [PLAYER_1_ID, PLAYER_2_ID],
  lives: {
    [PLAYER_1_ID]: 30,
    [PLAYER_2_ID]: 30
  },
  turns: {
    [PLAYER_1_ID]: true,
    [PLAYER_2_ID]: false
  },
  minions: {}
})
let selectedMinionId, minionInstanceId, card, selectedCardId, cardDefinitionId, remainaingManaIfPlayed;

const players = initialState.get('players')

export function game(state = initialState, {type, payload}) {

  const currentPlayer = state.get('turns')
    .reduce((result, isTurn, player) => {
      return isTurn ? player : result
    }, null)
  const nextPlayer = state.get('turns')
    .reduce((result, isTurn, player) => {
      return !isTurn ? player : result
    }, null)
  const belongsToCurrentPlayer = belongsToPlayer(currentPlayer)
  const belongsToNextPlayer = belongsToPlayer(nextPlayer)
  const selectedMinion = state.get('minions').filter(isSelected).first()

  switch (type) {

    case START_GAME:
      return initialState
        .set('cardInstances', players
          .map(playerId => Repeat(0, 5).map(() => getCardInstance(playerId)))
          .flatten(1)
          .reduce((result, card) => result.merge(card), Map())
        )

    case CLICK_CARD:
      const isOwnCard = belongsToCurrentPlayer(state.getIn(['cardInstances', payload.cardInstanceId]))
      if (!isOwnCard) return state
      const setSelectionToCard = setSelection(payload.cardInstanceId)
      return state
        .update('cardInstances', setSelectionToCard)
        .update('minions', deselectAll)

    case CLICK_TABLE:
      const selectedCard = state.get('cardInstances').filter(isSelected).first()
      // check that a card is selected
      if (!selectedCard) return state
      const isOwnTable = is(payload.playerId, currentPlayer)
      const cardDefinition = cardDefinitions[selectedCard.get('cardDefinitionId')]
      const isMinion = is(cardDefinition.type, "minion")
      const cardCost = cardDefinition.cost
      const manaSpent = state.getIn(['manaSpents', payload.playerId])
      const manaTotal = state.getIn(['manaTotals', payload.playerId])
      const remainaingManaIfPlayed = manaTotal - manaSpent - cardCost
      // check that selected card is a minion and can be afforded
      if (!isMinion || remainaingManaIfPlayed < 0 || !isOwnTable) return state
      const newMinion = createMinion(selectedCard.get('cardDefinitionId'), payload.playerId)
      return state
        .mergeIn(['minions'], fromJS(newMinion))
        .deleteIn(['cardInstances', selectedCard.get('cardInstanceId')])
        .updateIn(['manaSpents', payload.playerId], manaSpent => manaSpent + cardCost)

    case END_TURN:
      const isEndOfRound = nextPlayer == state.get('players').first()
      return state
        // Set the turn to nextPlayer's turn
        .update('turns', turns => turns.map(turn => !turn))

        // Set the spent Mana to 0 and +1 to total Mana for everyone
        .update('manaTotals', manaTotals => {
          return isEndOfRound ? manaTotals.map(manaTotal => manaTotal + 1) : manaTotals
        })
        .update('manaSpents', manaSpents => {
          return isEndOfRound ? manaSpents.map(manaSpent => 0) : manaSpents
        })

        // Deselect Everything
        .update('cardInstances', deselectAll)
        .update('minions', deselectAll)

        // Deal the next player a card
        .mergeIn(['cardInstances'], getCardInstance(nextPlayer))

        // Wake up the next player's minions
        .update('minions', minions => minions.map(minion => {
          if (!belongsToNextPlayer(minion)) return minion
          return minion.set('awake', true)
        }))

    case CLICK_MINION:
      const clickedMinion = state.getIn(['minions', payload.minionInstanceId])
      const isOwnMinion = belongsToCurrentPlayer(clickedMinion)
      // check whether a minion should attack or be selected
      if (!isOwnMinion && selectedMinion && selectedMinion.get('awake'))
        // attack minion
        return state
          .updateIn(['minions', payload.minionInstanceId, 'damage'], d => d += selectedMinion.get('attack'))
          .updateIn(['minions', selectedMinion.get('minionInstanceId'), 'damage'], d => d += clickedMinion.get('attack'))
          .setIn(['minions', selectedMinion.get('minionInstanceId'), 'awake'], false)
          .update('minions', deselectAll)
          .update('minions', removeDead)
      else if (isOwnMinion)
        // select minion
        return state
          .update('minions', setSelection(payload.minionInstanceId))
          .update('cardInstances', deselectAll)
      else return state

    case CLICK_HERO:
      if (!selectedMinion || !selectedMinion.get('awake')) return state
      return state
        .updateIn(['lives', payload.playerId], life => life - selectedMinion.get('attack'))
        .update('minions', deselectAll)
        .update('cardInstances', deselectAll)
        .setIn(['minions', selectedMinion.get('minionInstanceId'), 'awake'], false)

    default:
      return state
  }
}
