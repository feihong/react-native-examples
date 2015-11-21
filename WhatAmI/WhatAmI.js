import React from 'react-native';
const { AlertIOS } = React
import render from './render'


export default class WhatAmI extends React.Component {
  constructor(props) {
    super(props)
    this.state = {answer: ''}

    // Make the render() function a method of this class.
    this.render = render.bind(this)

    // Bind some methods.
    this.onAnswerChanged = this.onAnswerChanged.bind(this)
    this.onSubmitAnswer = this.onSubmitAnswer.bind(this)
  }

  inputFocused(refName) {
    this.refs.kh.inputFocused(this, refName)
  }

  onAnswerChanged(event) {
    this.setState({answer: event.nativeEvent.text});
  }

  onSubmitAnswer() {
    let answer = this.state.answer.trim().toLowerCase()
    if (!answer) {
      return
    }

    switch (this.state.answer) {
      case 'asian palm civet':
        _alert('Congratulations', 'You are awesome!')
        break
      case 'civet':
        _alert('On the right track', 'Yes, but what kind of civet?')
        break
      case 'mammal':
        _alert('Incorrect', 'Yes, but what kind of mammal?')
        break
      case 'animal':
        _alert('Incorrect', 'OK, please be more specific')
        break
      default:
        _alert('Incorrect', "That's not right, but please try again")
    }
  }

  onHintPress(hintIndex) {
    _alert('Hint', hints[hintIndex])
  }
}

var hints = [
  'I love coffee',
  'I can be used to make coffee',
  'The most expensive coffee in the world comes out of my butt',
]

function _alert(title, message) {
  AlertIOS.alert(title, message)
}
