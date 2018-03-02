import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import FeedsPanel from '../panels/FeedsPanel';

Enzyme.configure({ adapter: new Adapter() });

const FEEDS = 'feeds';

const testProps = {
  openedPanel: FEEDS,
  editedPanel: {},
  onShow: () => {},
  onExpand: () => {},
  onEdit: () => {},
  onCancel: () => {},
  isShowControlPanel: false,
  isSaveButton: false,
};

describe('Component <FeedsPanel />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <FeedsPanel
        openedPanel={testProps.openedPanel}
        editedPanel={testProps.editedPanel}
        onShow={testProps.onShow}
        onExpand={testProps.onExpand}
        onEdit={testProps.onEdit}
        onCancel={testProps.onCancel}
        isShowControlPanel={testProps.isShowControlPanel}
        isSaveButton={testProps.isSaveButton}
      />
    );

    expect(component.find('ControlPanel')).toHaveLength(1);
    expect(component.find('ControlPanel').props().title).toEqual('Feeds');
    expect(component.find('ControlPanel').props().name).toEqual('feeds');

    expect(component).toMatchSnapshot();

  });
});

