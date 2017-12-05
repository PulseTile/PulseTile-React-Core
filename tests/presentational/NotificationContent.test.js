import React from 'react';
import renderer from 'react-test-renderer';

import NotificationContent from '../../src/components/presentational/temprorary/NotificationContent';

it('renders static component NotificationContent correctly', () => {
  const tree = renderer
    .create(
      <NotificationContent />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});