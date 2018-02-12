import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import moment from 'moment';

import TransfersOfCarePopoverReferrals from '../../../src/components/pages/TransfersOfCare/transfers-of-care-components/TransfersOfCarePopoverReferrals';
import { valuesLabels, valuesNames } from '../../../src/components/pages/Referrals/forms.config';

Enzyme.configure({ adapter: new Adapter() });

const DATE_FORMAT = 'DD-MMM-YYYY';

const DATE_TO_USE = new Date('2018');
global.Date = jest.fn(() => DATE_TO_USE);

const testProps = {
  detail: {
    referralType: 'Referral To',
    [valuesNames.REASON]: 'test1rrrrrrrrrrrr',
    [valuesNames.SUMMARY]: 'test1rrrrrrrrrrrrr',
    [valuesNames.FROM]: 'aa test1rrrrrrrrrrrrrrrrrrrrrrrrrrr',
    [valuesNames.TO]: 'test1rrrrrrrrrrrrr',
    [valuesNames.START_DATE]: 1511196789986,
    [valuesNames.DATE]: 1511196789986,
  },
};

const DATE = moment(testProps.detail[valuesNames.DATE]).format(DATE_FORMAT);
const STATE_DATE = moment(testProps.detail[valuesNames.STATE_DATE]).format(DATE_FORMAT);

describe('Component <TransfersOfCarePopoverReferrals />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(
      <TransfersOfCarePopoverReferrals
        detail={testProps.detail}
      />);

    expect(component.find('.control-label')).toHaveLength(6);
    expect(component.find('.form-control-static')).toHaveLength(6);

    expect(component.find('.control-label').at(0).text()).toEqual(valuesLabels.FROM);
    expect(component.find('.control-label').at(1).text()).toEqual(valuesLabels.TO);
    expect(component.find('.control-label').at(2).text()).toEqual(valuesLabels.DATE);
    expect(component.find('.control-label').at(3).text()).toEqual(valuesLabels.REASON);
    expect(component.find('.control-label').at(4).text()).toEqual(valuesLabels.SUMMARY);
    expect(component.find('.control-label').at(5).text()).toEqual(valuesLabels.STATE_DATE);

    expect(component.find('.form-control-static').at(0).text()).toEqual(testProps.detail[valuesNames.FROM]);
    expect(component.find('.form-control-static').at(1).text()).toEqual(testProps.detail[valuesNames.TO]);
    expect(component.find('.form-control-static').at(2).text()).toEqual(DATE);
    expect(component.find('.form-control-static').at(3).text()).toEqual(testProps.detail[valuesNames.REASON]);
    expect(component.find('.form-control-static').at(4).text()).toEqual(testProps.detail[valuesNames.SUMMARY]);
    expect(component.find('.form-control-static').at(5).text()).toEqual(STATE_DATE);


    expect(component).toMatchSnapshot();

    component.setProps({ detail: {} })
  });

  it('should renders with props correctly with empty detail', () => {
    const component = shallow(
      <TransfersOfCarePopoverReferrals />);

    expect(component).toMatchSnapshot();
  });
});

