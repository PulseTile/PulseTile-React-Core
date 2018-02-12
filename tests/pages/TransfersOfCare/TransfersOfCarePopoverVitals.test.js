import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import moment from 'moment';

import TransfersOfCarePopoverVitals from '../../../src/components/pages/TransfersOfCare/transfers-of-care-components/TransfersOfCarePopoverVitals';
import { valuesLabels, valuesNames } from '../../../src/components/pages/Vitals/forms.config';

Enzyme.configure({ adapter: new Adapter() });

const DATE_FORMAT = 'DD-MMM-YYYY';

const DATE_TO_USE = new Date('2018');
const DATE_TO_USE_TIME = DATE_TO_USE.getTime();
global.Date = jest.fn(() => DATE_TO_USE);
Date.now = jest.fn(() => DATE_TO_USE_TIME);

const testProps = {
  detail: {
    [valuesNames.RESPIRATION_RATE]: '12.0',
    [valuesNames.OXYGEN_SUPPLEMENTAL]: 'false',
    [valuesNames.HEART_RATE]: '45.0',
    [valuesNames.TEMPERATURE]: '37.0',
    [valuesNames.LEVEL_OF_CONSCIOUSNESS]: 'Voice',
    [valuesNames.SYSTOLIC_BP]: '112.0',
    [valuesNames.DIASTOLIC_BP]: '64.0',
    [valuesNames.OXYGEN_SATURATION]: '97.0',
    [valuesNames.NEWS_SCORE]: 4,
    [valuesNames.AUTHOR]: 'Dr Tony Shannon',
    [valuesNames.DATE_CREATED]: 1516367377000,
    [valuesNames.SOURCE]: 'ethercis',
    [valuesNames.SOURCE_ID]: '27ee5e25-4c32-46d2-b45a-f74149d72030',
  },
};

const DATE_CREATED = moment(testProps.detail[valuesNames.DATE_CREATED]).format(DATE_FORMAT);

describe('Component <TransfersOfCarePopoverVitals />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(
      <TransfersOfCarePopoverVitals
        detail={testProps.detail}
      />);
    //
    // expect(component.find('.control-label')).toHaveLength(6);
    // expect(component.find('.form-control-static')).toHaveLength(6);
    //
    // expect(component.find('.control-label').at(0).text()).toEqual(valuesLabels.FROM);
    // expect(component.find('.control-label').at(1).text()).toEqual(valuesLabels.TO);
    // expect(component.find('.control-label').at(2).text()).toEqual(valuesLabels.DATE);
    // expect(component.find('.control-label').at(3).text()).toEqual(valuesLabels.REASON);
    // expect(component.find('.control-label').at(4).text()).toEqual(valuesLabels.SUMMARY);
    // expect(component.find('.control-label').at(5).text()).toEqual(valuesLabels.STATE_DATE);
    //
    // expect(component.find('.form-control-static').at(0).text()).toEqual(testProps.detail[valuesNames.FROM]);
    // expect(component.find('.form-control-static').at(1).text()).toEqual(testProps.detail[valuesNames.TO]);
    // expect(component.find('.form-control-static').at(2).text()).toEqual(DATE);
    // expect(component.find('.form-control-static').at(3).text()).toEqual(testProps.detail[valuesNames.REASON]);
    // expect(component.find('.form-control-static').at(4).text()).toEqual(testProps.detail[valuesNames.SUMMARY]);
    // expect(component.find('.form-control-static').at(5).text()).toEqual(STATE_DATE);


    expect(component).toMatchSnapshot();

  });

  // it('should renders with props correctly with empty detail', () => {
  //   const component = shallow(
  //     <TransfersOfCarePopoverVitals />);
  //
  //   expect(component).toMatchSnapshot();
  // });
});

