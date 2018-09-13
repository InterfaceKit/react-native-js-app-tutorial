/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Platform,
  ScrollView,
  Animated,
  StatusBar,
  Dimensions
} from 'react-native';
import SkipButton from './template/SkipButton';
import Animations from './animations/Animations';
import { ifIphoneX } from 'react-native-iphone-x-helper';

import type { Element } from 'react';
import type { AnimationTypes } from './animations/Animations';

const SCREEN_WIDTH = Dimensions.get('window').width;

type Props = {
  children: any,
  page: number,
  onSkip: Function,
  activeDotStyle?: number | Object,
  inactiveDotStyle?: number | Object,
  skipTitleButton?: string,
  skipLastTitleButton?: string,
  skipButton?: Element<*>,
  customAnimation?: Object,
  animationType:
    | 'Parallax'
    | 'Pager'
    | 'ZoomOut'
    | 'FadeIn'
    | 'TranslateY'
    | 'RotateX'
    | 'RotateY'
    | 'Flip',
  showSkipButton?: boolean,
  tintStatusBar?: boolean
};
type State = {
  xOffset: Animated.Value,
  page: number
};

class IntroSlider extends React.PureComponent<Props, State> {
  scrollView: ScrollView;

  static defaultProps = {
    page: 0,
    animationType: 'Parallax',
    showSkipButton: true,
    tintStatusBar: true
  };

  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    page: PropTypes.number.isRequired,
    onSkip: PropTypes.func,
    activeDotStyle: PropTypes.object,
    inactiveDotStyle: PropTypes.object,
    skipTitleButton: PropTypes.string,
    skipLastTitleButton: PropTypes.string,
    skipButton: PropTypes.element,
    customAnimation: PropTypes.object,
    animationType: PropTypes.string,
    showSkipButton: PropTypes.bool,
    tintStatusBar: PropTypes.bool
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      xOffset: new Animated.Value(0),
      page: props.page
    };
  }

  componentWillMount() {
    const position: number = this.state.page;
    if (this.isAndroidStatusBar() && this.props.tintStatusBar) {
      StatusBar.setBackgroundColor(
        this.shadeStatusBar(
          this.props.children[position].props.backgroundColor,
          -0.3
        ),
        true
      );
    }
  }

  renderDots = (): Element<*> => {
    const { activeDotStyle, inactiveDotStyle } = this.props;
    let dotsArray: Array<*> = [];

    for (let index = 0; index < this.props.children.length; index++) {
      const isSelected: boolean = this.state.page === index;
      dotsArray.push(
        <View
          key={index}
          style={StyleSheet.flatten([
            styles.dot,
            isSelected
              ? {
                  ...styles.active,
                  ...activeDotStyle
                }
              : inactiveDotStyle
          ])}
        />
      );
    }
    return <View style={styles.dotsContainer}>{dotsArray}</View>;
  };

  _getAnimation = (index: number, animationType: string): ?Function => {
    if (!Animations[animationType]) {
      return;
    }
    return Animations[animationType](index, this.state.xOffset);
  };

  /**
   * Render each child view in the ViewPager
   * @returns {*}
   */
  renderChildren = (): Array<Element<*>> => {
    const animation = this.props.customAnimation;
    return this.props.children.map((child: Object, index: number) => {
      return (
        <View
          key={index}
          style={{
            width: SCREEN_WIDTH
          }}>
          {React.cloneElement(child, {
            animation:
              animation || this._getAnimation(index, this.props.animationType)
          })}
        </View>
      );
    });
  };

  /**
   * Handles page change event
   * @param e
   */
  onPageSelected = (e: Object) => {
    // Calculate current index
    const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    if (index < 0 || index >= React.Children.count(this.props.children)) {
      return;
    }
    this.handleBottomStepper(index);
  };

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
      );
    }
    this.setState({ page: position });
  };

  shadeStatusBar = (color: string, percent: number): string => {
    const first = parseInt(color.slice(1), 16),
      black = first & 0x0000ff,
      green = (first >> 8) & 0x00ff,
      percentage = percent < 0 ? percent * -1 : percent,
      red = first >> 16,
      theme = percent < 0 ? 0 : 255;

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
    );
  };

  isAndroidStatusBar = (): boolean => {
    return this.props.children.length > 0 && Platform.OS === 'android';
  };

  renderSkipButton = (): ?Element<*> => {
    const isLastPage: boolean =
      this.props.children.length - 1 === this.state.page;
    if (this.props.showSkipButton && !this.props.skipButton) {
      return (
        <SkipButton
          onSkip={this.props.onSkip}
          skipTitleButton={
            isLastPage
              ? this.props.skipLastTitleButton
              : this.props.skipTitleButton
          }
        />
      );
    }
    return this.props.skipButton;
  };

  render() {
    return (
      <View style={styles.container}>
        <Animated.ScrollView
          ref={(ref: any) => {
            this.scrollView = ref;
          }}
          style={styles.container}
          horizontal={true}
          pagingEnabled={true}
          removeClippedSubviews={true}
          directionalLockEnabled={true}
          scrollEventThrottle={10}
          bounces={false}
          scrollsToTop={false}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.state.xOffset
                  }
                }
              }
            ],
            {
              useNativeDriver: true,
              listener: (event: Object) => {
                return this.onPageSelected(event);
              }
            }
          )}>
          {this.renderChildren()}
        </Animated.ScrollView>
        <View style={styles.bottom}>
          {this.renderSkipButton()}
          {this.renderDots()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden'
  },
  bottom: {
    bottom: 30,
    ...ifIphoneX({
      bottom: 40
    }),
    alignItems: 'center'
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    left: 0
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    marginHorizontal: 5
  },
  active: {
    backgroundColor: 'white'
  }
});

export default IntroSlider;
