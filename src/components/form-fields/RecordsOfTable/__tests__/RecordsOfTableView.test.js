import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import RecordsOfTableView from '../../../form-fields/RecordsOfTable/RecordsOfTableView';
import { valuesLabels, valuesNames } from '../../../form-fields/RecordsOfTable/forms.config';

Enzyme.configure({ adapter: new Adapter() });

const DATE_TO_USE = new Date('2018');
global.Date = jest.fn(() => DATE_TO_USE);

const testProps = {
  records: [
    {
      [valuesNames.RECORDS_DATE]: '05-Dec-2017',
      [valuesNames.RECORDS_NAME]: 'Too bad desease ddd',
      [valuesNames.RECORDS_SOURCE]: 'ethercis',
      [valuesNames.SOURCE_ID]: '0234fbd6-bfb5-49b0-bf02-9759a22f471f',
      [valuesNames.TYPE]: 'diagnosis',
      [valuesNames.RECORDS_TYPE]: 'Problems / Diagnosis',
    },
    {
      [valuesNames.RECORDS_DATE]: '10-Oct-2017',
      [valuesNames.RECORDS_NAME]: 'Cardiology',
      [valuesNames.RECORDS_SOURCE]: 'ethercis',
      [valuesNames.SOURCE_ID]: '41aece90-65e3-4b98-bf12-2568ae5a328f',
      [valuesNames.TYPE]: 'events',
      [valuesNames.RECORDS_TYPE]: 'Events',
    },
  ],
};

describe('Component <RecordsOfTableView />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(
      <RecordsOfTableView
        records={testProps.records}
      />);

    expect(component.find('table')).toHaveLength(1);

    expect(component.find('th').at(0).text()).toEqual(valuesLabels.RECORDS_NAME);
    expect(component.find('th').at(1).text()).toEqual(valuesLabels.RECORDS_TYPE);
    expect(component.find('th').at(2).text()).toEqual(valuesLabels.RECORDS_DATE);
    expect(component.find('th').at(3).text()).toEqual(valuesLabels.RECORDS_SOURCE);

    expect(component.find('td').at(0).find('span').text()).toEqual(testProps.records[0][valuesNames.RECORDS_NAME]);
    expect(component.find('td').at(1).find('span').text()).toEqual(testProps.records[0][valuesNames.RECORDS_TYPE]);
    expect(component.find('td').at(2).find('span').text()).toEqual(testProps.records[0][valuesNames.RECORDS_DATE]);
    expect(component.find('td').at(3).find('span').text()).toEqual(testProps.records[0][valuesNames.RECORDS_SOURCE]);

    expect(component.find('.form-control-static')).toHaveLength(0);

    expect(component).toMatchSnapshot();

    component.setProps({ records: [] });
    expect(component.find('table')).toHaveLength(0);
    expect(component.find('.form-control-static')).toHaveLength(1);
    expect(component.find('.form-control-static').text()).toEqual(valuesLabels.RECORDS_NOT_EXIST);
  });
});

