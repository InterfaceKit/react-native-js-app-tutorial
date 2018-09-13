import 'react-native';
import React from 'react';
import { IntroSlider, Slide } from '../index';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <IntroSlider
      onSkip={() => {
        return 'onSkip';
      }}
      showSkipButton={true}
      skipTitleButton="SKIP"
      skipLastTitleButton="NEXT"
      tintStatusBar={true}
      animationType={'Parallax'}>
      <Slide
        image={{
          uri:
            'https://images.pexels.com/photos/259600/pexels-photo-259600.jpeg?cs=srgb&dl=architecture-facade-house-259600.jpg&fm=jpg'
        }}
        title="Welcome"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel mollis risus. Nam dignissim porttitor suscipit."
        backgroundColor="#FEBE29"
      />
      <Slide
        image={{
          uri:
            'https://images.pexels.com/photos/259600/pexels-photo-259600.jpeg?cs=srgb&dl=architecture-facade-house-259600.jpg&fm=jpg'
        }}
        title="Welcome 2"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel mollis risus. Nam dignissim porttitor suscipit."
        backgroundColor="#CD5C5C"
      />
      <Slide
        image={{
          uri:
            'https://images.pexels.com/photos/259600/pexels-photo-259600.jpeg?cs=srgb&dl=architecture-facade-house-259600.jpg&fm=jpg'
        }}
        title="Welcome 3"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel mollis risus. Nam dignissim porttitor suscipit."
        backgroundColor="#6495ED"
      />
    </IntroSlider>
  );
  expect(tree).toMatchSnapshot();
});
