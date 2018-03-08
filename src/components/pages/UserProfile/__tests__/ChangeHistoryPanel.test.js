import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import moment from 'moment';

import ChangeHistoryPanel from '../panels/ChangeHistoryPanel';

Enzyme.configure({ adapter: new Adapter() });

const CHANGE_HISTORY = 'changeHistory';
const DATE_TO_USE = new Date('2018');
const DATE_TO_USE_TIME = DATE_TO_USE.getTime();
global.Date = jest.fn(() => DATE_TO_USE);
Date.now = jest.fn(() => DATE_TO_USE_TIME);

const CONVERT_CURRENT_DATE_WITH_TIME = moment(DATE_TO_USE).format('YYYY-MM-DD HH:mm');

const testProps = {
  openedPanel: CHANGE_HISTORY,
  editedPanel: {},
  onShow: () => {},
  onExpand: () => {},
  onEdit: () => {},
  onCancel: () => {},
  isShowControlPanel: false,
  isSaveButton: false,
};

describe('Component <ChangeHistoryPanel />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <ChangeHistoryPanel
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
    expect(component.find('ControlPanel').props().title).toEqual('Change History');
    expect(component.find('ControlPanel').props().name).toEqual('changeHistory');

    expect(component.find('.control-label').at(0).text()).toEqual('Change #1 Date');
    expect(component.find('.control-label').at(1).text()).toEqual('Changes');
    expect(component.find('.control-label').at(2).text()).toEqual('Change #2 Date');
    expect(component.find('.control-label').at(3).text()).toEqual('Changes');

    expect(component.find('.form-control-static').at(0).text()).toEqual(CONVERT_CURRENT_DATE_WITH_TIME);
    expect(component.find('.form-control-static').at(2).text()).toEqual(CONVERT_CURRENT_DATE_WITH_TIME);


    expect(component).toMatchSnapshot();

  });
});

