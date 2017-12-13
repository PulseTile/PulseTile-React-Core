import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import BasicPatientSearch from '../../src/components/containers/BasicPatientSearch/BasicPatientSearch';

Enzyme.configure({ adapter: new Adapter() });
const context = {
  router: {
    history: {
      test: 'test',
      goBack: () => {},
      push: () => {},
      replace: () => {},
    },
  },
};

describe('Component <BasicPatientSearch />', () => {
  it('should renders correctly shallow', () => {
    const basicPatientSearch = shallow(
      <BasicPatientSearch />, {context}
    );
    expect(basicPatientSearch.state().searchString).toEqual('');
    basicPatientSearch.find('.form-control').simulate('change', {target: {value: 'test'}});
    expect(basicPatientSearch.state().searchString).toEqual('test');
    basicPatientSearch.setContext(context);
    basicPatientSearch.find('.btn-search').at(0).simulate('click', {
      preventDefault: () => {},
    });
    expect(basicPatientSearch).toMatchSnapshot();
    basicPatientSearch.find('.clearAll').simulate('click');
    expect(basicPatientSearch.state().searchString).toEqual('');
    expect(basicPatientSearch).toMatchSnapshot();
  });
});

