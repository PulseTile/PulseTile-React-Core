import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import moment from 'moment';
import RecordsOfTablePopoverProcedures from '../../../form-fields/RecordsOfTable/RecordsOfTablePopoverProcedures';

// THESE PLUGINS WERE EXTRACTED FROM MAIN AND RELOCATED TO SILVER-PLUGINS
// import { valuesLabels, valuesNames } from '../../../pages/Procedures/forms.config';

Enzyme.configure({ adapter: new Adapter() });

const DATE_FORMAT = 'DD-MMM-YYYY';

const DATE_TO_USE = new Date('2018');
global.Date = jest.fn(() => DATE_TO_USE);

const testProps = {
  detail: {
    // For Procedures-plugin
    // [valuesNames.NAME]: 'a test request23 changed',
    // [valuesNames.PROCEDURE_NAME]: 'a test request23 changed',
    // [valuesNames.CODE]: '1234523 changed',
    // [valuesNames.DATE_OF_PROCEDURE]: 1510856522000,
    // [valuesNames.TIME]: 66122000,
    // [valuesNames.TERMINOLOGY]: 'SNOMED-CT changed',
    // [valuesNames.NOTES]: 'testing23 changed',
    // [valuesNames.PERFORMER]: 'Performer changed',
    // [valuesNames.STATUS]: 'completed',
    // [valuesNames.AUTHOR]: 'bob.smith@gmail.com',
    // [valuesNames.DATE]: 1511799722000,
    // [valuesNames.SOURCE]: 'ethercis',
    // [valuesNames.SOURCE_ID]: 'abfa6a6c-9703-4566-8926-f046580bd8a7',
    // [valuesNames.ORIGINAL_COMPOSITION]: '',
    // [valuesNames.ORIGINAL_SOURCE]: '',
  },
};

// For Procedures-plugin
// const DATE_OF_PROCEDURE = moment(testProps.detail[valuesNames.DATE_OF_PROCEDURE]).format(DATE_FORMAT);
// const DATE = moment(testProps.detail[valuesNames.DATE]).format(DATE_FORMAT);

describe('Component <RecordsOfTablePopoverProcedures />', () => {
  it('should renders with props correctly', () => {

    // For Procedures-plugin
    // const component = shallow(
    //   <RecordsOfTablePopoverProcedures
    //     detail={testProps.detail}
    //   />);
    // expect(component.find('.control-label')).toHaveLength(6);
    // expect(component.find('.form-control-static')).toHaveLength(6);
    // expect(component.find('.control-label').at(0).text()).toEqual(valuesLabels.NAME);
    // expect(component.find('.control-label').at(1).text()).toEqual(valuesLabels.DATE_OF_PROCEDURE);
    // expect(component.find('.control-label').at(2).text()).toEqual(valuesLabels.PERFORMER);
    // expect(component.find('.control-label').at(3).text()).toEqual(valuesLabels.NOTES);
    // expect(component.find('.control-label').at(4).text()).toEqual(valuesLabels.DATE);
    // expect(component.find('.control-label').at(5).text()).toEqual(valuesLabels.SOURCE);
    // expect(component.find('.form-control-static').at(0).text()).toEqual(testProps.detail[valuesNames.NAME]);
    // expect(component.find('.form-control-static').at(1).text()).toEqual(DATE_OF_PROCEDURE);
    // expect(component.find('.form-control-static').at(2).text()).toEqual(testProps.detail[valuesNames.PERFORMER]);
    // expect(component.find('.form-control-static').at(3).text()).toEqual(testProps.detail[valuesNames.NOTES]);
    // expect(component.find('.form-control-static').at(4).text()).toEqual(DATE);
    // expect(component.find('.form-control-static').at(5).text()).toEqual(testProps.detail[valuesNames.SOURCE]);
    // expect(component).toMatchSnapshot();
    // component.setProps({ detail: {} })

  });

  it('should renders with props correctly with empty detail', () => {
    const component = shallow(
      <RecordsOfTablePopoverProcedures />);

    expect(component).toMatchSnapshot();
  });
});

