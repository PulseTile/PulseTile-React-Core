import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import MainLogo from '../../src/components/presentational/MainLogo/MainLogo';

Enzyme.configure({ adapter: new Adapter() });

const patientsInfo = {
  'browserTitle': 'PulseTile',
  'logoB64': 'testLogo',
  'themeColor': 'green',
  'title': 'PulseTile',
};

describe('Component <MainLogo />', () => {
  it('should renders when the role of doctor', () => {
    const userAccount = { 'role': 'IDCR' };

    const component = shallow(
      <MainLogo
        patientsInfo={patientsInfo}
        userAccount={userAccount}
      />);

    expect(component.find('Link')).toHaveLength(1);
    expect(component.find('Link').props().to).toEqual('/');
    expect(component.find('img').props().className).toEqual('img logo-img ');

    expect(component).toMatchSnapshot();

    component.setProps({ logo: 'test' });
    expect(component.find('img').at(0).props().src).toEqual('test');
    expect(component.find('img').at(1).props().className).toEqual('img logo-img hidden');

    expect(component).toMatchSnapshot();
  });

  it('should renders when the role of the patient', () => {
    const userAccount = { 'role': 'PHR', 'nhsNumber': '9999999000' };
    const component = shallow(
      <MainLogo
        patientsInfo={patientsInfo}
        userAccount={userAccount}
      />);

    expect(component.find('Link')).toHaveLength(1);
    expect(component.find('Link').props().to).toEqual('/patients/9999999000/patients-summary');
    expect(component.find('img').props().className).toEqual('img logo-img ');

    expect(component).toMatchSnapshot();

    component.setProps({ logo: 'test' });
    expect(component.find('img').at(0).props().src).toEqual('test');
    expect(component.find('img').at(1).props().className).toEqual('img logo-img hidden');

    expect(component).toMatchSnapshot();
  });

  it('should renders without role', () => {
    const userAccount = { 'role': '', 'nhsNumber': '9999999000' };
    const component = shallow(
      <MainLogo
        patientsInfo={patientsInfo}
        userAccount={userAccount}
      />);

    expect(component.find('Link')).toHaveLength(0);
    expect(component.find('img')).toHaveLength(0);

    expect(component).toMatchSnapshot();
  });
});
