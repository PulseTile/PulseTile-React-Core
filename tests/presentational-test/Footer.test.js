import React from 'react';
import renderer from 'react-test-renderer';

import Footer from '../../src/components/presentational/Footer/Footer';

it('renders footer with props correctly', () => {
  const tree = renderer
    .create(
      <Footer />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
