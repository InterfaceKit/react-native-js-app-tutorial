/* @flow */

import React from 'react';
import { View, StyleSheet, Image, Text, Animated } from 'react-native';
import Animations from '../animations/Animations';

type Props = {
  description: string,
  title: string,
  backgroundColor: string,
  image: Object | number,
  titleStyle: Object | number,
  imageStyle: Object | number,
  descriptionStyle: Object | number,
  animation: Object
};

class Slide extends React.PureComponent<Props> {
  render() {
    const { backgroundColor } = this.props;
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor
          }
        ]}>
        <Animated.Image
          style={[this.props.imageStyle, this.props.animation]}
          source={this.props.image}
        />
        <Animated.Text
          style={[styles.title, this.props.titleStyle, this.props.animation]}>
          {this.props.title}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.description,
            this.props.descriptionStyle,
            this.props.animation
          ]}>
          {this.props.description}
        </Animated.Text>
      </View>
    );
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
});

export default Slide;
