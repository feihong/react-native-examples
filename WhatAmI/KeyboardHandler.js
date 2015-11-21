/*
Source: http://stackoverflow.com/a/33585501

*/

import React, {ScrollView, View, DeviceEventEmitter} from 'react-native'
const update = React.addons.update


export default class KeyboardHandler extends React.Component {
  constructor(props) {
    DeviceEventEmitter.addListener('keyboardDidShow', (frames) => {
      if (!frames.endCoordinates) return;
      this.setState({keyboardSpace: frames.endCoordinates.height})
    })
    DeviceEventEmitter.addListener('keyboardWillHide', (frames) => {
      this.setState({keyboardSpace: 0})
    })

    let newProps = update(props, {
      $merge: {
        automaticallyAdjustContentInsets: true,
        scrollEventThrottle: 200,
      }
    })
    super(newProps)
    this.state = {keyboardSpace: 0}

    this.render = this.render.bind(this)
    this.inputFocused = this.inputFocused.bind(this)
  }

  render() {
    return (
      <ScrollView ref='scrollView' {...this.props}>
        {this.props.children}
        <View style={{height: this.state.keyboardSpace}}></View>
      </ScrollView>
    )
  }

  inputFocused(component, refName) {
    let callback = () => {
      let scrollResponder = this.refs.scrollView.getScrollResponder()
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        React.findNodeHandle(component.refs[refName]),
        this.props.offset, //additionalOffset
        true
      )
    }
    setTimeout(callback, 50)
  }
}
KeyboardHandler.propTypes = {offset: React.PropTypes.number}
KeyboardHandler.defaultProps = {offset: 40}
