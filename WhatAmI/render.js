import React from 'react-native'
const {
  StyleSheet,
  View,
  TouchableHighlight,
  ScrollView,
} = React
import {
  Root, VBox, HBox, Text, Image, TextInput, Button,
}  from './Custom'
import KeyboardHandler from './KeyboardHandler'


export default function() {
  return <KeyboardHandler ref='kh' style={rootStyle}>
    <VBox>
      <Text>What am I?</Text>

      <Image source={require('./images/civet.jpg')} />

      <HBox>
        <TextInput
          ref='answer'
          placeholder='Enter your answer here'
          value={this.state.answer}
          enablesReturnKeyAutomatically={true}
          returnKeyType='go'
          clearButtonMode='while-editing'
          onChange={this.onAnswerChanged}
          onSubmitEditing={this.onSubmitAnswer}
          onFocus={() => this.refs.kh.inputFocused(this, 'answer')}
        />
        <Button text="Submit" onPress={this.onSubmitAnswer} />
      </HBox>

      <HBox>
        <Button text="Hint 1" onPress={this.onHintPress.bind(this, 'I love coffee')} />
        <Button text="Hint 2" onPress={this.onHintPress.bind(this, 'I can be used to make coffee')} />
        <Button text="Hint 3" onPress={this.onHintPress.bind(this, 'The most expensive coffee in the world comes out of my butt')} />
      </HBox>
    </VBox>
  </KeyboardHandler>
}

var rootStyle = {marginTop: 20, padding: 10}
