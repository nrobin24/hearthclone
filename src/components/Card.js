import React from 'react'
import {cardDefinitions} from '../constants/cardDefinitions'
import Radium from 'radium'
import S from '../Styles'

var cashRoll = require("file!../../assets/images/cash-roll.jpg")

const cardContainerStyle = {
  width: 60,
  height: 80,
  border: '1px solid black',
  borderRadius: '10%',
  padding: 4
}


const selectedStyle = {
  border: '3px solid blue'
}

const costBubbleStyle = {
  borderRadius: 500,
  backgroundColor: 'green',
  height: 14,
  width: 14,
  color: 'white'
}

const imageStyle = {
  width: 30,
  height: 40
}



var Header = ({name, cost}) =>
  <div style={S.flexBetween}>

    <div style={[S.flexCentered]}>
      <img src={cashRoll} style={S.dimsTiny}/>
      {cost}
    </div>
    <div style={S.text.center}>
      {name}
    </div>
  </div>

var Footer = ({attack, health}) =>
  <div style={S.flexBetween}>
    {attack}
    {health}
  </div>

var Body = ({imageSource}) =>
  <div style={S.flexCentered}>
    <img style={imageStyle} src={imageSource} />
  </div>


var Card = ({card, actions}) => {
  let cardDefinition = _.find(cardDefinitions, {cardDefinitionId: card.get('cardDefinitionId')})
  let handleClickCard = () => actions.clickCard({cardInstanceId: card.get('cardInstanceId')})
  let imageSource = require("file!../../assets/images/cards/" + cardDefinition.filename)
  return (
    <div style={[
        S.flexColumn,
        S.flexBetween,
        cardContainerStyle,
        S.text.small,
        card.get('isSelected') && selectedStyle
      ]} onClick={handleClickCard}>
      <Header name={cardDefinition.name} cost={cardDefinition.cost}/>
      <Body imageSource={imageSource}/>
      <Footer attack={cardDefinition.attack} health={cardDefinition.health} />
    </ div>
  )
}

Header = Radium(Header)
Footer = Radium(Footer)
Body = Radium(Body)
export default Radium(Card)
