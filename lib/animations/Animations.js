/* @flow */

import React from 'react'
import { Dimensions, Animated } from 'react-native'

export type AnimationTypes = {
  Pager: string,
  ZoomOut: string,
  Pager: string,
  ZoomOut: string,
  FadeIn: string,
  TranslateY: string,
  RotateX: string,
  RotateY: string,
  Flip: string
}

export const Animations: AnimationTypes = Object.freeze({
  Pager: 'Pager',
  ZoomOut: 'ZoomOut',
  FadeIn: 'FadeIn',
  TranslateY: 'TranslateY',
  RotateX: 'RotateX',
  RotateY: 'RotateY',
  Flip: 'Flip'
})

const pager = (index: number, xOffset: Animated.Value): Object => {
  const SCREEN_WIDTH = Dimensions.get('window').width

  return {
    transform: [
      { perspective: 1000 },
      {
        translateX: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: [
            Math.abs(SCREEN_WIDTH * 1 - SCREEN_WIDTH),
            0,
            Math.abs(SCREEN_WIDTH * 2 - SCREEN_WIDTH)
          ],
          extrapolate: 'clamp'
        })
      }
    ]
  }
}

const zoomOut = (index: number, xOffset: Animated.Value): Object => {
  const SCREEN_WIDTH = Dimensions.get('window').width

  return {
    transform: [
      { perspective: 1000 },
      {
        translateX: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: [
            Math.abs(SCREEN_WIDTH * 1 - SCREEN_WIDTH),
            0,
            Math.abs(SCREEN_WIDTH * 2 - SCREEN_WIDTH)
          ],
          extrapolate: 'clamp'
        })
      },
      {
        scale: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: [0.5, 1, 0.5]
        })
      }
    ]
  }
}

const fadeIn = (index: number, xOffset: Animated.Value): Object => {
  const SCREEN_WIDTH = Dimensions.get('window').width

  return {
    transform: [
      { perspective: 1000 },
      {
        translateX: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: [
            Math.abs(SCREEN_WIDTH * 1 - SCREEN_WIDTH),
            0,
            Math.abs(SCREEN_WIDTH * 2 - SCREEN_WIDTH)
          ],
          extrapolate: 'clamp'
        })
      },
      {
        scale: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: [0.5, 1, 0.5]
        })
      },
      {
        translateY: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: [0, 0, 350],
          extrapolate: 'clamp'
        })
      }
    ]
  }
}

const translateY = (index: number, xOffset: Animated.Value): Object => {
  const SCREEN_WIDTH = Dimensions.get('window').width

  return {
    transform: [
      { perspective: 1000 },
      {
        translateY: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: [250, 0, 500],
          extrapolate: 'clamp'
        })
      }
    ]
  }
}

const rotateX = (index: number, xOffset: Animated.Value): Object => {
  const SCREEN_WIDTH = Dimensions.get('window').width

  return {
    transform: [
      { perspective: 1000 },
      {
        rotateX: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: ['0deg', '0deg', '360deg']
        })
      }
    ]
  }
}

const rotateY = (index: number, xOffset: Animated.Value): Object => {
  const SCREEN_WIDTH = Dimensions.get('window').width

  return {
    transform: [
      { perspective: 1000 },
      {
        rotateY: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: ['-45deg', '0deg', '45deg']
        })
      }
    ]
  }
}

const flip = (index: number, xOffset: Animated.Value): Object => {
  const SCREEN_WIDTH = Dimensions.get('window').width

  return {
    transform: [
      { perspective: 1000 },
      {
        translateX: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: [
            Math.abs(SCREEN_WIDTH * 1 - SCREEN_WIDTH),
            0,
            Math.abs(SCREEN_WIDTH * 2 - SCREEN_WIDTH)
          ],
          extrapolate: 'clamp'
        })
      },
      {
        rotateY: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: ['-20deg', '0deg', '145deg']
        })
      }
    ]
  }
}

export default {
  [Animations.Pager]: pager,
  [Animations.ZoomOut]: zoomOut,
  [Animations.TranslateY]: translateY,
  [Animations.RotateX]: rotateX,
  [Animations.RotateY]: rotateY,
  [Animations.Flip]: flip
}
