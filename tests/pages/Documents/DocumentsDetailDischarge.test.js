import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import DocumentsDetailDischarge from '../../../src/components/pages/Documents/DocumentsDetail/DocumentsDetailDischarge';
import { valuesNames, valuesLabels } from '../../../src/components/pages/Documents/forms.config';

Enzyme.configure({ adapter: new Adapter() });
const DATE_TO_USE = new Date('2017');
const DATE_TO_USE_TEXT = '01-Jan-2017';
const DATE_TO_USE_TIME = DATE_TO_USE.getTime();
global.Date = jest.fn(() => DATE_TO_USE);
Date.now = jest.fn(() => DATE_TO_USE_TIME);

const testProps = {
  importHandler: () => {},
  detail: {
    [valuesNames.NAME]: 'NAME',
    [valuesNames.DATE]: 'DATE',
    [valuesNames.AUTHOR]: 'AUTHOR',
    [valuesNames.FACILITY]: 'FACILITY',
    [valuesNames.PI_MRNTYPE]: 'PI_MRNTYPE',
    [valuesNames.PI_OTHTYPE]: 'PI_OTHTYPE',
    [valuesNames.PI_GMSTYPE]: 'PI_GMSTYPE',
    [valuesNames.PI_NAME]: 'PI_NAME',
    [valuesNames.PI_ID_TYPE]: 'PI_ID_TYPE',
    [valuesNames.PI_SOURCE]: 'PI_SOURCE',
    [valuesNames.PI_DISCHARGING]: 'PI_DISCHARGING',
    [valuesNames.PI_DISCHARGING_DATE]: 'PI_DISCHARGING_DATE',
    [valuesNames.PI_CLINICAL]: 'PI_CLINICAL',
    [valuesNames.PI_ADMISSION_DATE]: 'PI_ADMISSION_DATE',
    [valuesNames.DIAGNOSIS]: [{
      [valuesNames.DG_PROBLEM]: 'DG_PROBLEM',
      [valuesNames.DG_DESCR]: 'DG_DESCR',
      [valuesNames.DG_TERMINOLOGY]: 'DG_TERMINOLOGY',
      [valuesNames.DG_TERMINOLOGY_CODE]: 'DG_TERMINOLOGY_CODE',
    }]
  }
};

describe('Component <DocumentsDetailDischarge />', () => {
	it('should renders with props correctly', () => {
		const component = shallow(<DocumentsDetailDischarge />);
    expect(component).toMatchSnapshot();

    expect(component.find('.form-group')).toHaveLength(3);
    expect(component.find('.form-group').at(0).find('.control-label').text()).toEqual(valuesLabels.DATE);
    expect(component.find('.form-group').at(1).find('.control-label').text()).toEqual(valuesLabels.AUTHOR);
    expect(component.find('.form-group').at(2).find('.control-label').text()).toEqual(valuesLabels.TYPE);

		component.setProps({ detail: testProps.detail, importHandler: testProps.importHandler });
		const diagnosisLength = testProps.detail[valuesNames.DIAGNOSIS].length;
    expect(component.find('FormSectionList')).toHaveLength(3);
    expect(component.find('FormSection')).toHaveLength(2 + diagnosisLength);

    expect(component.find('FormSectionList').at(0).props().title).toEqual(valuesLabels.TITLE_FACILITY);
    expect(component.find('FormSectionList').at(1).props().title).toEqual(valuesLabels.TITLE_PATIENT_INDENTIFIER);
    expect(component.find('FormSectionList').at(2).props().title).toEqual(valuesLabels.TITLE_DIAGNOSIS);

    expect(component.find('.form-group')).toHaveLength(14 + diagnosisLength * 4);

    const formControls = component.find('.form-group');
    expect(formControls.at(0).find('.control-label').text()).toEqual(valuesLabels.NAME);
    expect(formControls.at(1).find('.control-label').text()).toEqual(valuesLabels.DATE);
    expect(formControls.at(2).find('.control-label').text()).toEqual(valuesLabels.AUTHOR);
    expect(formControls.at(3).find('.control-label').text()).toEqual(valuesLabels.FACILITY);
    expect(formControls.at(4).find('.control-label').text()).toEqual(valuesLabels.PI_MRNTYPE);
    expect(formControls.at(5).find('.control-label').text()).toEqual(valuesLabels.PI_OTHTYPE);
    expect(formControls.at(6).find('.control-label').text()).toEqual(valuesLabels.PI_GMSTYPE);
    expect(formControls.at(7).find('.control-label').text()).toEqual(valuesLabels.PI_NAME);
    expect(formControls.at(8).find('.control-label').text()).toEqual(valuesLabels.PI_ID_TYPE);
    expect(formControls.at(9).find('.control-label').text()).toEqual(valuesLabels.PI_SOURCE);
    expect(formControls.at(10).find('.control-label').text()).toEqual(valuesLabels.PI_DISCHARGING);
    expect(formControls.at(11).find('.control-label').text()).toEqual(valuesLabels.PI_DISCHARGING_DATE);
    expect(formControls.at(12).find('.control-label').text()).toEqual(valuesLabels.PI_CLINICAL);
    expect(formControls.at(13).find('.control-label').text()).toEqual(valuesLabels.PI_ADMISSION_DATE);

    expect(formControls.at(0).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.NAME]);
    expect(formControls.at(1).find('.form-control-static').text()).toEqual(DATE_TO_USE_TEXT);
    expect(formControls.at(2).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.AUTHOR]);
    expect(formControls.at(3).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.FACILITY]);
    expect(formControls.at(4).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.PI_MRNTYPE]);
    expect(formControls.at(5).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.PI_OTHTYPE]);
    expect(formControls.at(6).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.PI_GMSTYPE]);
    expect(formControls.at(7).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.PI_NAME]);
    expect(formControls.at(8).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.PI_ID_TYPE]);
    expect(formControls.at(9).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.PI_SOURCE]);
    expect(formControls.at(10).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.PI_DISCHARGING]);
    expect(formControls.at(11).find('.form-control-static').text()).toEqual(DATE_TO_USE_TEXT);
    expect(formControls.at(12).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.PI_CLINICAL]);
    expect(formControls.at(13).find('.form-control-static').text()).toEqual(DATE_TO_USE_TEXT);

    // Test Diagnosis Section
    const diagnosisSection = component.find('FormSectionList').at(2).find('FormSection').at(0);
    const diagnose = testProps.detail[valuesNames.DIAGNOSIS][0];

    expect(diagnosisSection.find('.control-label').at(0).text()).toEqual(valuesLabels.DG_PROBLEM);
    expect(diagnosisSection.find('.control-label').at(1).text()).toEqual(valuesLabels.DG_DESCR);
    expect(diagnosisSection.find('.control-label').at(2).text()).toEqual(valuesLabels.DG_TERMINOLOGY);
    expect(diagnosisSection.find('.control-label').at(3).text()).toEqual(valuesLabels.DG_TERMINOLOGY_CODE);

    expect(diagnosisSection.find('.form-control-static').at(0).text()).toEqual(diagnose[valuesNames.DG_PROBLEM]);
    expect(diagnosisSection.find('.form-control-static').at(1).text()).toEqual(diagnose[valuesNames.DG_DESCR]);
    expect(diagnosisSection.find('.form-control-static').at(2).text()).toEqual(diagnose[valuesNames.DG_TERMINOLOGY]);
    expect(diagnosisSection.find('.form-control-static').at(3).text()).toEqual(diagnose[valuesNames.DG_TERMINOLOGY_CODE]);

		expect(component).toMatchSnapshot();
	});
});

