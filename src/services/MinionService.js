import {cardDefinitions} from '../constants/cardDefinitions'

export function createMinion(cardDefinitionId, playerId) {
  const {attack, health, name} = cardDefinitions[cardDefinitionId]
  const minionInstanceId = 'mid_' + _.random(100000, 999999)
  return {[minionInstanceId]: {attack, health, name, minionInstanceId, awake: false, playerId, damage: 0}}
}
