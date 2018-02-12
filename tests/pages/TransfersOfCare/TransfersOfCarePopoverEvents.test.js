import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import moment from 'moment';

import TransfersOfCarePopoverEvents from '../../../src/components/pages/TransfersOfCare/transfers-of-care-components/TransfersOfCarePopoverEvents';
import { valuesLabels, valuesNames } from '../../../src/components/pages/Events/forms.config';

Enzyme.configure({ adapter: new Adapter() });

const DATE_FORMAT = 'DD-MMM-YYYY';

const DATE_TO_USE = new Date('2018');
global.Date = jest.fn(() => DATE_TO_USE);

const testProps = {
  detail: {
    [valuesNames.NAME]: '- Procedure',
    [valuesNames.TYPE]: 'Admission',
    [valuesNames.DESCRIPTION]: '- Procedure',
    [valuesNames.DATE_TIME]: 1517845805981,
    [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
    [valuesNames.DATE_CREATED]: 1517845806000,
    [valuesNames.LOCATION]: 'test',
    [valuesNames.SOURCE]: 'ethercis',
    [valuesNames.SOURCE_ID]: '773c2b67-9a88-4bfd-9f0d-04e78dc5721e',
  },
};

const DATE_CREATED = moment(testProps.detail[valuesNames.DATE_CREATED]).format(DATE_FORMAT);

describe('Component <TransfersOfCarePopoverEvents />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(
      <TransfersOfCarePopoverEvents
        detail={testProps.detail}
      />);

    expect(component.find('.control-label')).toHaveLength(5);
    expect(component.find('.form-control-static')).toHaveLength(5);

    expect(component.find('.control-label').at(0).text()).toEqual(valuesLabels.NAME);
    expect(component.find('.control-label').at(1).text()).toEqual(valuesLabels.TYPE);
    expect(component.find('.control-label').at(2).text()).toEqual(valuesLabels.DESCRIPTION);
    expect(component.find('.control-label').at(3).text()).toEqual(valuesLabels.LOCATION);
    expect(component.find('.control-label').at(4).text()).toEqual(valuesLabels.EVENT_DATE);

    expect(component.find('.form-control-static').at(0).text()).toEqual(testProps.detail[valuesNames.NAME]);
    expect(component.find('.form-control-static').at(1).text()).toEqual(testProps.detail[valuesNames.TYPE]);
    expect(component.find('.form-control-static').at(2).text()).toEqual(testProps.detail[valuesNames.DESCRIPTION]);
    expect(component.find('.form-control-static').at(3).text()).toEqual(testProps.detail[valuesNames.LOCATION]);
    expect(component.find('.form-control-static').at(4).text()).toEqual(DATE_CREATED);

    expect(component).toMatchSnapshot();

    component.setProps({ detail: {} })
  });

  it('should renders with props correctly with empty detail', () => {
    const component = shallow(
      <TransfersOfCarePopoverEvents />);

    expect(component).toMatchSnapshot();
  });
});

