import React from 'react';
import renderer from 'react-test-renderer';

import NotificationContent from '../../src/components/presentational/temprorary/NotificationContent';

describe('Component <NotificationContent />', () => {
  it('should renders correctly', () => {
    const tree = renderer
      .create(
        <NotificationContent />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
