import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Vitals from '../../../../sections/fragments/blocks/Vitals/Vitals';
import VitalsPopover from '../../../../sections/fragments/blocks/Vitals/VitalsPopover';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <Vitals />', () => {
  it('should renders Vitals with props correctly', () => {
    const component = shallow(<Vitals />);
    expect(component).toMatchSnapshot();
  });
});

const heartRateLabels = [
    { place: 1, text: '≤ 40' },
    { place: 3, text: '41-50' },
    { place: 4, text: '51-90' },
    { place: 5, text: '91-110' },
    { place: 6, text: '111-130' },
    { place: 7, text: '≥ 131' },
];

describe('Component <VitalsPopover />', () => {
  it('should renders VitalsPopover with props correctly', () => {
    const component = shallow(<VitalsPopover
      title='Heart Rate'
      popoverLabels={heartRateLabels}
      vitalStatusesType='success'
      detailValue='45'
      vitalsAddon='bpm'
      id='heartRate'
    />);
    component.instance().togglePopover();
    expect(component).toMatchSnapshot();
  });
});
