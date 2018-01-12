import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import HeaderToolbar from '../../src/components/containers/Header/HeaderToolbar/HeaderToolbar';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const store = mockStore({
  runtime: {},
  router: {
    location: {
      pathname: '/',
      search: '',
      hash: '#/patients/9999999000/procedures',
    },
  },
  isSidebarVisible: true,
  patientsSummaries: {
    '9999999000': {
      transfers: [],
      name: 'Ivor Cox',
      gender: 'Male',
      dateOfBirth: -806976000000,
      id: 9999999000,
      address: '6948 Et St., Halesowen, Worcestershire, VX27 5DV',
      pasNumber: 352541,
      nhsNumber: '9999999000',
      gpName: 'Goff Carolyn D.',
      gpAddress: 'Hamilton Practice, 5544 Ante Street, Hamilton, Lanarkshire, N06 5LP',
      telephone: '(011981) 32362',
    },
  },
});
const match = {
  params: {
    userId: '9999999000',
  },
};

describe('Component <HeaderToolbar />', () => {
  it('should renders correctly', () => {
    const headerToolbar = shallow(
      <HeaderToolbar
        store={store}
        match={match}
      />).dive().dive().dive().dive().dive()
    expect(headerToolbar.find('.patient-info-item').at(0).html()).toEqual('<div class="patient-info-item"><span class="key">D.O.B.</span> 06-Jun-1944</div>');
    expect(headerToolbar.find('.patient-info-item').at(1).html()).toEqual('<div class="patient-info-item"><span class="key">Phone:</span> (011981) 32362</div>');
    expect(headerToolbar.find('.patient-info-item').at(2).html()).toEqual('<div class="patient-info-item"><span class="key">Gender:</span> Male</div>');
    expect(headerToolbar.find('.patient-info-item').at(3).html()).toEqual('<div class="patient-info-item"><span class="key">NHS No.</span> <span>999 999 9000</span></div>');
    expect(headerToolbar.find('.patient-info-item').at(4).html()).toEqual('<div class="patient-info-item significant hidden-xs">Ivor Cox</div>');
    expect(headerToolbar.find('.patient-info-item').at(5).html()).toEqual('<div class="patient-info-item"><span class="key">Doctor:</span> Goff Carolyn D.</div>');
    expect(headerToolbar.find('.patient-info-item').at(6).html()).toEqual('<div class="patient-info-item"><span class="key">Address:</span> Hamilton Practice, 5544 Ante Street, Hamilton, Lanarkshire, N06 5LP</div>');
    expect(headerToolbar).toMatchSnapshot();
  });
});

