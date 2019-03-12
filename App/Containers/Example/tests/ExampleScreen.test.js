import React from 'react';
import renderer from 'react-test-renderer';

import ExampleScreen from '../ExampleScreen'

test('renders correctly', () => {
  const tree = renderer.create(<ExampleScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});