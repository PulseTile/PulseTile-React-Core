import React from 'react';
import Enzyme, { shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import PatientsFullDetailsSearch from '../../../src/components/pages/PatientsFullDetailsSearch/PatientsFullDetailsSearch';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const store = mockStore();
const match = {
	params: {},
};
const location = {
	pathname: '/patients',
		search: '?ageRange=61-80',
};
const context = {
  router: {
    history: {
      replace: () => {},
      location: {
        pathname: '/patients',
        search: '?ageRange=61-80',
      },
    },
    route: {
      match: {
        params: {},
      },
    },
  },
};

describe('Component <PatientsLists />', () => {
  it('should renders correctly', () => {
    const component = shallow(
      <PatientsFullDetailsSearch
        store={store}
        match={match}
        location={location}
      />, { context }).dive().dive().dive();

    expect(component).toMatchSnapshot();

    expect(component.find('.page-wrapper')).toHaveLength(1);
    expect(component.find('PatientsList')).toHaveLength(1);
  });
});

