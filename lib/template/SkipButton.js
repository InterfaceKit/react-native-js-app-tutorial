/* @flow */

import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';

type Props = {
  onSkip: Function,
  skipTitleButton?: string,
  underlayColor?: string
};

class SkipButton extends React.PureComponent<Props> {
  static defaultProps = {
    underlayColor: '#F5F5F5'
  };

  render() {
    return (
      <TouchableHighlight
        style={styles.container}
        onPress={this.props.onSkip}
        underlayColor={this.props.underlayColor}>
        <Text style={styles.title}>{this.props.skipTitleButton}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 42,
    backgroundColor: 'white',
    borderRadius: 18
  },
  title: {
    fontWeight: '600',
    fontSize: 16
  }
});

export default SkipButton;
