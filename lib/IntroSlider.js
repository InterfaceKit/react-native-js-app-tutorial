/* @flow */

import React from 'react'
import {
  View,
  StyleSheet,
  ViewPagerAndroid,
  Platform,
  ScrollView,
  Animated,
  StatusBar,
  Dimensions
} from 'react-native'
import SkipButton from './template/SkipButton'

import type { Element } from 'react'

type Props = {
  children: any,
  page: number,
  onSkip: Function,
  activeDotStyle?: number | Object,
  inactiveDotStyle?: number | Object,
  skipTitleButton?: string,
  skipLastTitleButton?: string,
  skipButton?: Element<*>
}
type State = {
  parallaxAnimation: Animated.Value,
  page: number,
  width: number,
  height: number
}

const SCREEN_WIDTH = Dimensions.get('window').width
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

class IntroSlider extends React.Component<Props, State> {
  viewPager: ViewPagerAndroid
  scrollView: ScrollView

  static defaultProps = {
    page: 0
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      parallaxAnimation: new Animated.Value(0),
      page: props.page,
      width: 0,
      height: 0
    }
  }

  componentWillMount() {
    const position: number = this.state.page
    if (this.isAndroidStatusBar() && this.props.tintStatusBar) {
      StatusBar.setBackgroundColor(
        this.shadeStatusBar(
          this.props.children[position].props.backgroundColor,
          -0.3
        ),
        true
      )
    }
  }

  renderDots = (): Element<*> => {
    const { activeDotStyle, inactiveDotStyle } = this.props
    let dotsArray: Array<*> = []

    for (let index = 0; index < this.props.children.length; index++) {
      const isSelected: boolean = this.state.page === index
      dotsArray.push(
        <View
          key={index}
          style={[styles.dot, isSelected ? activeDotStyle : inactiveDotStyle]}
        />
      )
    }
    return <View style={styles.dotsContainer}>{dotsArray}</View>
  }

  /**
   * Set the page dimensions
   * @param e
   */
  _setDimensions = (e: Object) => {
    this.setState({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height
    })
  }

  getInterpolate = (index: number) => {
    return this.state.parallaxAnimation.interpolate({
      inputRange: [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH
      ],
      outputRange: index === 0 ? [0, 0, 150] : [-300, 0, 150]
    })
  }

  /**
   * Render each child view in the ViewPager
   * @returns {*}
   */
  renderChildren = (): Array<Element<*>> => {
    return this.props.children.map((child: Object, index: number) => {
      return (
        <View
          key={index}
          style={{
            width: this.state.width,
            height: this.state.height
          }}>
          {child}
        </View>
      )
    })
  }

  /**
   * Handles page change event
   * @param e
   */
  onPageSelected = (e: Object): ?Function => {
    if (Platform.OS === 'android') {
      return this.handleBottomStepper(e.nativeEvent.position)
    }

    // Calculate current index
    const index = e.nativeEvent.contentOffset.x / this.state.width

    // Only call the function if the index is an integer
    if (index === parseInt(index, 10)) {
      if (index < 0 || index >= React.Children.count(this.props.children)) {
        return undefined
      }
      this.handleBottomStepper(index)
    }
  }

  /**
   * Handles bottom stepper buttons behaviour
   * @param position
   */
  handleBottomStepper = (position: number) => {
    if (this.isAndroidStatusBar() && this.props.tintStatusBar) {
      StatusBar.setBackgroundColor(
        this.shadeStatusBar(
          this.props.children[position].props.backgroundColor,
          -0.3
        ),
        false
      )
    }
    this.setState({ page: position })
  }

  shadeStatusBar = (color: string, percent: number): string => {
    const first = parseInt(color.slice(1), 16),
      black = first & 0x0000ff,
      green = (first >> 8) & 0x00ff,
      percentage = percent < 0 ? percent * -1 : percent,
      red = first >> 16,
      theme = percent < 0 ? 0 : 255

    return (
      '#' +
      (
        0x1000000 +
        (Math.round((theme - red) * percentage) + red) * 0x10000 +
        (Math.round((theme - green) * percentage) + green) * 0x100 +
        (Math.round((theme - black) * percentage) + black)
      )
        .toString(16)
        .slice(1)
    )
  }

  isAndroidStatusBar = (): boolean => {
    return this.props.children.length > 0 && Platform.OS === 'android'
  }

  renderSkipButton = (): ?Element<*> => {
    if (this.props.showSkipButton && !this.props.skipButton) {
      return (
        <SkipButton
          onSkip={this.props.onSkip}
          skipTitleButton={
            this.props.children.length - 1 === this.state.page
              ? this.props.skipLastTitleButton
              : this.props.skipTitleButton
          }
        />
      )
    }
    return this.props.skipButton
  }

  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' ? (
          <AnimatedScrollView
            ref={(ref: any) => {
              this.scrollView = ref
            }}
            style={styles.container}
            horizontal={true}
            pagingEnabled={true}
            removeClippedSubviews={true}
            directionalLockEnabled={true}
            scrollEventThrottle={120}
            bounces={false}
            scrollsToTop={false}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            onScroll={(event: Object) => {
              this.onPageSelected(event) &&
                Animated.event(
                  [
                    {
                      nativeEvent: {
                        contentOffset: { x: this.state.parallaxAnimation }
                      }
                    }
                  ],
                  {
                    useNativeDriver: true
                  }
                )
            }}
            onLayout={this._setDimensions}>
            {this.renderChildren()}
          </AnimatedScrollView>
        ) : (
          <ViewPagerAndroid
            ref={(ref: any) => {
              this.viewPager = ref
            }}
            style={styles.container}
            onLayout={this._setDimensions}
            onPageSelected={(event: Object) => {
              this.onPageSelected(event) &&
                Animated.event(
                  [
                    {
                      nativeEvent: {
                        contentOffset: { x: this.state.parallaxAnimation }
                      }
                    }
                  ],
                  {
                    useNativeDriver: true
                  }
                )
            }}>
            {this.renderChildren()}
          </ViewPagerAndroid>
        )}
        {this.renderDots()}
        {this.renderSkipButton()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  dotsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    bottom: 75
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    marginHorizontal: 5
  }
})

export default IntroSlider
