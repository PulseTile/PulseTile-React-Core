import React from 'react';
import Enzyme, { shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import PatientsLists from '../../../src/components/pages/PatientsLists/PatientsLists';

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
      push: () => {},
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
      <PatientsLists
        store={store}
        match={match}
        location={location}
      />, { context }).dive().dive().dive();

    expect(component).toMatchSnapshot();

    expect(component.find('.page-wrapper')).toHaveLength(1);
    expect(component.find('PatientsList')).toHaveLength(1);
  });
});

