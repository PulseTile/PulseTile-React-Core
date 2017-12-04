import React from 'react';
import renderer from 'react-test-renderer';

import Sidebar from '../../src/components/presentational/Sidebar/Sidebar';

it('renders Sidebar', () => {
  const tree = renderer
    .create(
      <Sidebar />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
