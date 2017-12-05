import React from 'react';
import renderer from 'react-test-renderer';

import Footer from '../../src/components/presentational/Footer/Footer';

describe('Component <Footer />', () => {
  it('should renders with props correctly', () => {
    const tree = renderer
      .create(
        <Footer />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
