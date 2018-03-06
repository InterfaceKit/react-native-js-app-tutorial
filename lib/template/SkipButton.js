/* @flow */

import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

type Props = {
  onSkip: Function,
  skipTitleButton: string
}

class SkipButton extends React.Component<Props> {
  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onSkip}>
        <View style={styles.button}>
          <Text style={styles.title}>{this.props.skipTitleButton}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 100
  },
  button: {
    alignSelf: 'center',
    paddingHorizontal: 50,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 8
  },
  title: {
    fontWeight: '600'
  }
})

export default SkipButton
