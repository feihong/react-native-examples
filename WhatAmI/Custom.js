import React from 'react-native';
const cloneWithProps = React.addons.cloneWithProps;


class Root extends React.ScrollView {
  render() {
    let style = {marginTop: 20, padding: 10};
    return <React.ScrollView
      {...this.props}
      style={[this.props.style, style]}>
      {this.props.children}
    </React.ScrollView>;
  }
}

class VBox extends React.View {
  render() {
    return renderBox(false, this.props);
  }
}

class HBox extends React.View {
  render() {
    return renderBox(true, this.props);
  }
}

function renderChildren(isHorizontal, children) {
  let result = [];
  let count = React.Children.count(children);
  React.Children.forEach(children, (child, index) => {
    if (index < count - 1) {
      let marginStyle = isHorizontal ? {marginRight: 10} : {marginBottom: 10};
      let clone = React.cloneElement(child, {style: marginStyle});
      result.push(clone);
    } else {
      result.push(child);
    }
  });
  return result;
}

function renderBox(isHorizontal, props) {
  let style = {flexDirection: isHorizontal ? 'row' : 'column'};
  return <React.View {...props} style={[props.style, style]}>
    {renderChildren(isHorizontal, props.children)}
  </React.View>;
}


class Text extends React.Text {
  render() {
    return <React.Text {...this.props} style={[{fontSize: 20}, this.props.style]}>
      {this.props.children}
    </React.Text>;
  }
}

class Image extends React.Image {
  render() {
    return <React.Image {...this.props} style={[styles.image, this.props.style]} />;
  }
}


class TextInput extends React.TextInput {
  render() {
    return <React.TextInput
      {...this.props}
      style={[styles.textinput, this.props.style]} />;
  }
}

class Button extends React.Component {
  render() {
      return <React.TouchableHighlight {...this.props} style={[styles.button, this.props.style]}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </React.TouchableHighlight>;
  }
}
Button.propTypes = {
  text: React.PropTypes.string.isRequired,
};

var styles = React.StyleSheet.create({
  image: {
    borderWidth: 1,
    borderColor: 'gray',
  },
  textinput: {
    height: 36,
    padding: 5,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 3,
    flex: 1,
  },
  button: {
    height: 36,
    paddingLeft: 7,
    paddingRight: 7,
    borderRadius: 5,
    backgroundColor: 'steelblue',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'linen',
  }
});

module.exports = {
  Root: Root,
  VBox: VBox,
  HBox: HBox,
  Text: Text,
  Image: Image,
  TextInput: TextInput,
  Button: Button,
  // scrollComponentIntoView: scrollComponentIntoView,
};
