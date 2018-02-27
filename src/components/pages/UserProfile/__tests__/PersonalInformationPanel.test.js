import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import moment from 'moment';

import PersonalInformationPanel from '../panels/PersonalInformationPanel';
import { valuesPersonalFormLabels } from '../forms.config';

Enzyme.configure({ adapter: new Adapter() });

const PERSONAL_INFORMATION = 'personalInformation';

const DATE_TO_USE = new Date('2018');
const DATE_TO_USE_TIME = DATE_TO_USE.getTime();
global.Date = jest.fn(() => DATE_TO_USE);
Date.now = jest.fn(() => DATE_TO_USE_TIME);

const CONVERT_CURRENT_DATE = moment(DATE_TO_USE).format('DD-MMM-YYYY');

const testProps = {
  user: {
    sub: '28AD8576-1948-4C84-8B5E-55FB7EE027CE',
    given_name: 'Bob',
    family_name: 'Smith',
    email: 'bob.smith@gmail.com',
    tenant: null,
    role: 'IDCR',
    roles: [
      'IDCR',
    ],
  },
  openedPanel: PERSONAL_INFORMATION,
  expandedPanel: 'all',
  editedPanel: {},
  onShow: () => {},
  onExpand: () => {},
  onEdit: () => {},
  onCancel: () => {},
  isShowControlPanel: true,
  isSaveButton: false,
};

describe('Component <PersonalInformationPanel />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <PersonalInformationPanel
        user={testProps.user}
        openedPanel={testProps.openedPanel}
        expandedPanel={testProps.expandedPanel}
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
    expect(component.find('ControlPanel').props().title).toEqual('Personal Information');
    expect(component.find('ControlPanel').props().name).toEqual('personalInformation');

    expect(component.find('.control-label').at(0).text()).toEqual(valuesPersonalFormLabels.FIRST_NAME);
    expect(component.find('.control-label').at(1).text()).toEqual(valuesPersonalFormLabels.LAST_NAME);
    expect(component.find('.control-label').at(2).text()).toEqual(valuesPersonalFormLabels.NHS_NUMBER);
    expect(component.find('.control-label').at(3).text()).toEqual(valuesPersonalFormLabels.DATE_OF_BIRTH);
    expect(component.find('.control-label').at(4).text()).toEqual(valuesPersonalFormLabels.SELECT_GENDER);
    expect(component.find('.control-label').at(5).text()).toEqual(valuesPersonalFormLabels.DOCTOR);

    expect(component.find('.form-control-static').at(0).text()).toEqual(testProps.user.given_name);
    expect(component.find('.form-control-static').at(1).text()).toEqual(testProps.user.family_name);
    expect(component.find('.form-control-static').at(2).text()).toEqual('');
    expect(component.find('.form-control-static').at(3).text()).toEqual(CONVERT_CURRENT_DATE);
    expect(component.find('.form-control-static').at(4).text()).toEqual('Female');
    expect(component.find('.form-control-static').at(5).text()).toEqual('Dr Emma Huston');

    component.setProps({ user: { role: 'PHR', nhsNumber: '99999999' } });
    expect(component.find('.form-control-static').at(2).text()).toEqual('99999999');

    expect(component).toMatchSnapshot();

    component.setProps({ editedPanel: { personalInformation: true }});
    expect(component.find('ReduxForm')).toHaveLength(1);

  });
});

