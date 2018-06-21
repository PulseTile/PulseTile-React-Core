import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import moment from 'moment';
import RecordsOfTablePopoverVitals from '../../../form-fields/RecordsOfTable/RecordsOfTablePopoverVitals';

// For Vitals-plugin
// import { valuesLabels, valuesNames, valuesAddons } from '../../../pages/Vitals/forms.config';

Enzyme.configure({ adapter: new Adapter() });

const DATE_FORMAT = 'DD-MMM-YYYY';

const DATE_TO_USE = new Date('2018');
const DATE_TO_USE_TIME = DATE_TO_USE.getTime();
global.Date = jest.fn(() => DATE_TO_USE);
Date.now = jest.fn(() => DATE_TO_USE_TIME);

const testProps = {
  detail: {
    // For Vitals-plugin
    // [valuesNames.RESPIRATION_RATE]: '12.0',
    // [valuesNames.OXYGEN_SUPPLEMENTAL]: 'false',
    // [valuesNames.HEART_RATE]: '45.0',
    // [valuesNames.TEMPERATURE]: '37.0',
    // [valuesNames.LEVEL_OF_CONSCIOUSNESS]: 'Voice',
    // [valuesNames.SYSTOLIC_BP]: '112.0',
    // [valuesNames.DIASTOLIC_BP]: '64.0',
    // [valuesNames.OXYGEN_SATURATION]: '97.0',
    // [valuesNames.NEWS_SCORE]: '4',
    // [valuesNames.AUTHOR]: 'Dr Tony Shannon',
    // [valuesNames.DATE_CREATED]: 1516367377000,
    // [valuesNames.SOURCE]: 'ethercis',
    // [valuesNames.SOURCE_ID]: '27ee5e25-4c32-46d2-b45a-f74149d72030',
  },
};

// For Vitals-plugin
// const DATE_CREATED = moment(testProps.detail[valuesNames.DATE_CREATED]).format(DATE_FORMAT);

describe('Component <RecordsOfTablePopoverVitals />', () => {
  it('should renders with props correctly', () => {

    // For Vitals-plugin
    // const component = shallow(
    //   <RecordsOfTablePopoverVitals
    //     detail={testProps.detail}
    //   />);
    // expect(component.find('label')).toHaveLength(9);
    // expect(component.find('.form-control')).toHaveLength(7);
    // expect(component.find('.vitals-addon')).toHaveLength(6);
    // expect(component.find('Switch')).toHaveLength(5);
    // expect(component.find('label').at(0).text()).toEqual(valuesLabels.RESPIRATION_RATE);
    // expect(component.find('label').at(1).text()).toEqual(valuesLabels.OXYGEN_SATURATION);
    // expect(component.find('label').at(2).text()).toEqual(valuesLabels.OXYGEN_SUPPLEMENTAL);
    // expect(component.find('label').at(3).text()).toEqual(valuesLabels.HEART_RATE);
    // expect(component.find('label').at(4).text()).toEqual(valuesLabels.SYSTOLIC_BP);
    // expect(component.find('label').at(5).text()).toEqual(valuesLabels.DIASTOLIC_BP);
    // expect(component.find('label').at(6).text()).toEqual(valuesLabels.LEVEL_OF_CONSCIOUSNESS);
    // expect(component.find('label').at(7).text()).toEqual(valuesLabels.TEMPERATURE);
    // expect(component.find('label').at(8).text()).toEqual(valuesLabels.NEWS_SCORE);
    // expect(component.find('.form-control').at(0).text()).toEqual(testProps.detail[valuesNames.RESPIRATION_RATE]);
    // expect(component.find('.form-control').at(1).text()).toEqual(testProps.detail[valuesNames.OXYGEN_SATURATION]);
    // expect(component.find('.form-control').at(2).text()).toEqual(testProps.detail[valuesNames.HEART_RATE]);
    // expect(component.find('.form-control').at(3).text()).toEqual(testProps.detail[valuesNames.SYSTOLIC_BP]);
    // expect(component.find('.form-control').at(4).text()).toEqual(testProps.detail[valuesNames.DIASTOLIC_BP]);
    // expect(component.find('.form-control').at(5).text()).toEqual(testProps.detail[valuesNames.TEMPERATURE]);
    // expect(component.find('.form-control').at(6).text()).toEqual(testProps.detail[valuesNames.NEWS_SCORE]);
    // expect(component.find('.vitals-addon').at(0).text()).toEqual(valuesAddons.RESPIRATION_RATE);
    // expect(component.find('.vitals-addon').at(1).text()).toEqual(valuesAddons.OXYGEN_SATURATION);
    // expect(component.find('.vitals-addon').at(2).text()).toEqual(valuesAddons.HEART_RATE);
    // expect(component.find('.vitals-addon').at(3).text()).toEqual(valuesAddons.SYSTOLIC_BP);
    // expect(component.find('.vitals-addon').at(4).text()).toEqual(valuesAddons.DIASTOLIC_BP);
    // expect(component.find('.vitals-addon').at(5).text()).toEqual(valuesAddons.TEMPERATURE);
    // expect(component.find('Switch').at(0).props().value).toEqual(testProps.detail[valuesNames.OXYGEN_SUPPLEMENTAL]);
    // expect(component.find('Switch').at(1).props().value).toEqual('Alert');
    // expect(component.find('Switch').at(2).props().value).toEqual('Voice');
    // expect(component.find('Switch').at(3).props().value).toEqual('Pain');
    // expect(component.find('Switch').at(4).props().value).toEqual('Unresponsive');
    // expect(component).toMatchSnapshot();
    // // Testing lifecycle method
    // component.setProps({ test: 'test' });
    // component.setProps({ detail: {} });

  });

  it('should renders with props correctly with empty detail', () => {
    const component = shallow(
      <RecordsOfTablePopoverVitals />);

    expect(component).toMatchSnapshot();
  });
});

