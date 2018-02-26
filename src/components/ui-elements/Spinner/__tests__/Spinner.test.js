import React from 'react';
import renderer from 'react-test-renderer';

import Spinner from '../Spinner';

describe('Component <Spinner />', () => {
  it('should renders with props correctly', () => {
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
});
