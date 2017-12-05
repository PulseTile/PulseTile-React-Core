import React from 'react';
import renderer from 'react-test-renderer';

import PTButton from '../../src/components/ui-elements/PTButton/PTButton';

it('renders simple button correctly', () => {
  const tree = renderer
    .create(
      <PTButton
        className="test-button"
        testProps="testProps"
      >test button</PTButton>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders button with children element correctly', () => {
  const anotherProps = 'anotherProps'
  const tree = renderer
    .create(
      <PTButton
        className="test-button"
        testProps="testProps"
        anotherProps={anotherProps}
      >
        <i className="btn-icon fa fa-angle-left"></i>
        <span className="btn-text">test text</span>
      </PTButton>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});