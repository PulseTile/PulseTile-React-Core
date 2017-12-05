import React from 'react';
import renderer from 'react-test-renderer';

import PTPanel from '../../src/components/ui-elements/PTPanel/PTPanel';

describe('Component <PTPanel />', () => {
  it('should renders with props correctly', () => {
    const tree = renderer
      .create(
        <PTPanel
          header={<h3 className="panel-title"><i className="fa fa-bar-chart" /> Test </h3>}
        >
          <div>test children element</div>
        </PTPanel>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});