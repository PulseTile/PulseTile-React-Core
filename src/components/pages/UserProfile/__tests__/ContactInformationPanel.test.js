import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import ContactInformationPanel from '../panels/ContactInformationPanel';
import { valuesContactFormLabels } from '../forms.config';

Enzyme.configure({ adapter: new Adapter() });

const CONTACT_INFORMATION = 'contactInformation';

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
  openedPanel: CONTACT_INFORMATION,
  expandedPanel: 'all',
  editedPanel: {},
  onShow: () => {},
  onExpand: () => {},
  onEdit: () => {},
  onCancel: () => {},
  isShowControlPanel: true,
  isSaveButton: false,
};

describe('Component <ContactInformationPanel />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <ContactInformationPanel
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
    expect(component.find('ControlPanel').props().title).toEqual('Contact Information');
    expect(component.find('ControlPanel').props().name).toEqual('contactInformation');

    expect(component.find('.control-label').at(0).text()).toEqual(valuesContactFormLabels.ADDRESS);
    expect(component.find('.control-label').at(1).text()).toEqual(valuesContactFormLabels.CITY);
    expect(component.find('.control-label').at(2).text()).toEqual(valuesContactFormLabels.STATE);
    expect(component.find('.control-label').at(3).text()).toEqual(valuesContactFormLabels.POSTAL_CODE);
    expect(component.find('.control-label').at(4).text()).toEqual(valuesContactFormLabels.SELECT_COUNTRY);
    expect(component.find('.control-label').at(5).text()).toEqual(valuesContactFormLabels.PHONE);
    expect(component.find('.control-label').at(6).text()).toEqual(valuesContactFormLabels.EMAIL);

    expect(component.find('.form-control-static').at(0).text()).toEqual('6801 Tellus Street');
    expect(component.find('.form-control-static').at(1).text()).toEqual('Westmorland');
    expect(component.find('.form-control-static').at(2).text()).toEqual('Westmorland');
    expect(component.find('.form-control-static').at(3).text()).toEqual('Box 306');
    expect(component.find('.form-control-static').at(4).text()).toEqual('USA');
    expect(component.find('.form-control-static').at(5).text()).toEqual('07624 647524');
    expect(component.find('.form-control-static').at(6).text()).toEqual(testProps.user.email);


    expect(component).toMatchSnapshot();

    component.setProps({ editedPanel: { contactInformation: true }});
    expect(component.find('ReduxForm')).toHaveLength(1);

  });
});

