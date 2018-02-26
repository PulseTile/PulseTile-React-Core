import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import PatientAccessDisclaimerModal from '../PatientAccessDisclaimerModal';

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
    expect(patientAccessDisclaimerModal.find('ConfirmationModal')).toHaveLength(1);
    expect(patientAccessDisclaimerModal).toMatchSnapshot();
  });
});

