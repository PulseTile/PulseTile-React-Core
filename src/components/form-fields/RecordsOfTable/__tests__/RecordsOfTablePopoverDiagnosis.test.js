import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import moment from 'moment';

import RecordsOfTablePopoverDiagnosis from '../../../form-fields/RecordsOfTable/RecordsOfTablePopoverDiagnosis';
import { valuesLabels, valuesNames } from '../../../pages/ProblemsDiagnosis/forms.config';

Enzyme.configure({ adapter: new Adapter() });

const DATE_FORMAT = 'DD-MMM-YYYY';

const DATE_TO_USE = new Date('2018');
global.Date = jest.fn(() => DATE_TO_USE);

const testProps = {
  detail: {
    [valuesNames.PROBLEM]: '# CONDYLE RIGHT HUMERUS 123',
    [valuesNames.DATE_OF_ONSET]: 1514851200000,
    [valuesNames.DESCRIPTION]: 'ggg',
    [valuesNames.TERMINOLOGY]: 'SNOMED-CT',
    [valuesNames.CODE]: '12393890',
    [valuesNames.SOURCE]: 'ethercis',
    [valuesNames.SOURCE_ID]: 'a360e5fa-c837-4060-9f67-fecbf2f42d42',
  },
};

const DATE_OF_ONSET = moment(testProps.detail[valuesNames.DATE_OF_ONSET]).format(DATE_FORMAT);

describe('Component <RecordsOfTablePopoverDiagnosis />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(
      <RecordsOfTablePopoverDiagnosis
        detail={testProps.detail}
      />);

    expect(component.find('.control-label')).toHaveLength(5);
    expect(component.find('.form-control-static')).toHaveLength(5);

    expect(component.find('.control-label').at(0).text()).toEqual(valuesLabels.PROBLEM);
    expect(component.find('.control-label').at(1).text()).toEqual(valuesLabels.DATE_OF_ONSET);
    expect(component.find('.control-label').at(2).text()).toEqual(valuesLabels.DESCRIPTION);
    expect(component.find('.control-label').at(3).text()).toEqual(valuesLabels.TERMINOLOGY);
    expect(component.find('.control-label').at(4).text()).toEqual(valuesLabels.CODE);

    expect(component.find('.form-control-static').at(0).text()).toEqual(testProps.detail[valuesNames.PROBLEM]);
    expect(component.find('.form-control-static').at(1).text()).toEqual(DATE_OF_ONSET);
    expect(component.find('.form-control-static').at(2).text()).toEqual(testProps.detail[valuesNames.DESCRIPTION]);
    expect(component.find('.form-control-static').at(3).text()).toEqual(testProps.detail[valuesNames.TERMINOLOGY]);
    expect(component.find('.form-control-static').at(4).text()).toEqual(testProps.detail[valuesNames.CODE]);

    expect(component).toMatchSnapshot();

    component.setProps({ detail: {} })
  });

  it('should renders with props correctly with empty detail', () => {
    const component = shallow(
      <RecordsOfTablePopoverDiagnosis />);

    expect(component).toMatchSnapshot();
  });
});

