import React from 'react';
import Enzyme, { shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import SystemDashboard from '../../../src/components/pages/SystemDashboard/SystemDashboard';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const store = mockStore();
const history = {
  push: () => {},
  replace: () => {},
  location: {
    pathname: '/',
  },
};
const context = {
  router: {
    history: history,
    route: {
      match: {
        params: {},
      },
    },
  },
};

describe('Component <SystemDashboard />', () => {
  it('should renders correctly', () => {
    const component = shallow(
      <SystemDashboard
        store={store}
        history={history}
      />, {context}).dive().dive();

    expect(component).toMatchSnapshot();

    expect(component.find('.page-wrapper')).toHaveLength(1);
    expect(component.find('PTPanel')).toHaveLength(2);
    expect(component.find('PatientsChart')).toHaveLength(2);

    component.instance().handleBarClick('ageRange')('19-30');
    component.instance().redirectTo('/patients?ageRange=61-80');
  });
});

