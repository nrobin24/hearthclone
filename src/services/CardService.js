import _ from 'lodash'
import {cardDefinitions} from '../constants/cardDefinitions'
import {fromJS} from 'immutable'

export function getCardInstance(playerId) {
  const cardInstanceId = 'cid_' + _.random(100000, 999999)
  const cardDefinitionId = _.sample(cardDefinitions).cardDefinitionId
  return fromJS({
    [cardInstanceId]: {
      cardInstanceId,
      cardDefinitionId,
      playerId
    }
  })
}
