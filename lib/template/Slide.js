/* @flow */

import React from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'

type Props = {
  description: string,
  title: string,
  backgroundColor: string,
  image: Object | number,
  titleStyle: Object | number,
  imageStyle: Object | number,
  descriptionStyle: Object | number
}

class Slide extends React.PureComponent<Props> {
  render() {
    const { backgroundColor } = this.props
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <Image
          style={this.props.imageStyle}
          source={this.props.image}
          resizeMode="contain"
        />
        <Text style={[styles.title, this.props.titleStyle]}>
          {this.props.title}
        </Text>
        <Text style={[styles.description, this.props.descriptionStyle]}>
          {this.props.description}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  description: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '300',
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  title: {
    fontSize: 26,
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: '300',
    paddingHorizontal: 16,
    paddingVertical: 12,
    textAlign: 'center'
  }
})

export default Slide
