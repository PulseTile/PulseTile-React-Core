import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import PatientAccessDisclaimerModal from '../../src/components/containers/PatientsList/PatientAccessDisclaimerModal';

Enzyme.configure({ adapter: new Adapter() });

const history = {
  push: () => {},
};

describe('Component <PatientAccessDisclaimerModal />', () => {
  it('should renders mount correctly', () => {
    const patientAccessDisclaimerModal = mount(
      <PatientAccessDisclaimerModal
        history={history}
      />
    );
    expect(patientAccessDisclaimerModal).toMatchSnapshot();
  });
  it('should renders shallow correctly', () => {
    const patientAccessDisclaimerModal = shallow(
      <PatientAccessDisclaimerModal
        history={history}
      />
    );
    patientAccessDisclaimerModal.find('.btn-success').simulate('click');
    expect(patientAccessDisclaimerModal).toMatchSnapshot();
  });
});

