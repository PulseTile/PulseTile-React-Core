import React from 'react';
import renderer from 'react-test-renderer';

import Spinner from '../../src/components/ui-elements/Spinner/Spinner';

it('renders spinner with props correctly', () => {
  const tree = renderer
    .create(
      <Spinner
        className="test-spinner"
        testProps="testProps"
        anotherProps="anotherProps"
      />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
