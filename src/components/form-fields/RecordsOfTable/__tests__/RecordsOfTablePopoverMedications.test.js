import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import moment from 'moment';

import RecordsOfTablePopoverMedications from '../../../form-fields/RecordsOfTable/RecordsOfTablePopoverMedications';
import { valuesLabels, valuesNames } from '../../../pages/Medications/forms.config';

Enzyme.configure({ adapter: new Adapter() });

const DATE_FORMAT = 'DD-MMM-YYYY';

const DATE_TO_USE = new Date('2018');
global.Date = jest.fn(() => DATE_TO_USE);

const testProps = {
  detail: {
    [valuesNames.NAME]: 'test medication 11.01',
    [valuesNames.DOSE_AMOUNT]: 'Dose Amount',
    [valuesNames.DOSE_DIRECTIONS]: 'Dose Direction',
    [valuesNames.DOSE_TIMING]: 'Dose Amount',
    [valuesNames.START_DATE]: 1515719699000,
  },
};

const START_DATE = moment(testProps.detail[valuesNames.START_DATE]).format(DATE_FORMAT);

describe('Component <RecordsOfTablePopoverMedications />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(
      <RecordsOfTablePopoverMedications
        detail={testProps.detail}
      />);

    expect(component.find('.control-label')).toHaveLength(5);
    expect(component.find('.form-control-static')).toHaveLength(5);

    expect(component.find('.control-label').at(0).text()).toEqual(valuesLabels.NAME);
    expect(component.find('.control-label').at(1).text()).toEqual(valuesLabels.DOSE_AMOUNT);
    expect(component.find('.control-label').at(2).text()).toEqual(valuesLabels.DOSE_TIMING);
    expect(component.find('.control-label').at(3).text()).toEqual(valuesLabels.DOSE_DIRECTIONS);
    expect(component.find('.control-label').at(4).text()).toEqual(valuesLabels.START_DATE);

    expect(component.find('.form-control-static').at(0).text()).toEqual(testProps.detail[valuesNames.NAME]);
    expect(component.find('.form-control-static').at(1).text()).toEqual(testProps.detail[valuesNames.DOSE_AMOUNT]);
    expect(component.find('.form-control-static').at(2).text()).toEqual(testProps.detail[valuesNames.DOSE_TIMING]);
    expect(component.find('.form-control-static').at(3).text()).toEqual(testProps.detail[valuesNames.DOSE_DIRECTIONS]);
    expect(component.find('.form-control-static').at(4).text()).toEqual(START_DATE);

    expect(component).toMatchSnapshot();

    component.setProps({ detail: {} })
  });

  it('should renders with props correctly with empty detail', () => {
    const component = shallow(
      <RecordsOfTablePopoverMedications />);

    expect(component).toMatchSnapshot();
  });
});

