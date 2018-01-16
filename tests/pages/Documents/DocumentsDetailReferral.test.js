import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import DocumentsDetailReferral from '../../../src/components/pages/Documents/DocumentsDetail/DocumentsDetailReferral';
import { valuesNames, valuesLabels } from '../../../src/components/pages/Documents/forms.config';

Enzyme.configure({ adapter: new Adapter() });
const DATE_TO_USE = new Date('2017');
const DATE_TO_USE_TEXT = '01-Jan-2017';
const DATE_TO_USE_TIME = DATE_TO_USE.getTime();
global.Date = jest.fn(() => DATE_TO_USE);
Date.now = jest.fn(() => DATE_TO_USE_TIME);

const testProps = {
  importHandler: () => {},
  detail:{
    source: 'source',
    author_name: 'author_name',
    facility: 'facility',
    providerContact_id: '156',
    composerName: 'composerName',
    referralDateTime: 1515493787482,
    referralType: 'referralType',
    referralStatus_value: 'referralStatus_value',
    referralReferenceNumber: 'referralReferenceNumber',
    referredFrom: 'referredFrom',
    referredTo: 'referredTo',
    referralComments: 'referralComments',
    reasonForReferral: [{
      reason: '1'
    }, {
      reason: '2'
    }],
    providerContact_organisationName: 'providerContact_organisationName',
    providerContact_workNumber: 'providerContact_workNumber',
    providerContact_emergencyNumber: 'providerContact_emergencyNumber',
    providerContact_email: 'providerContact_email',
    referralStatus_originalCode: 'referralStatus_originalCode',
    referralStatus_code: 'referralStatus_code',
    clinicalNarrative: 'clinicalNarrative',
    presentIllness: 'presentIllness',
    clinicalSynopsisComments: 'clinicalSynopsisComments',
    previousHospitalAttendance: 'previousHospitalAttendance',
    pastIllensses: [{
      value: 1,
      date: 1515493787482
    }, {
      value: 2,
      date: 2515493787482
    }, {
      value: 3,
      date: 3515493787482
    }],
    conclusion: [{
      value: 1,
      date: 1515493787482
    }, {
      value: 2,
      date: 2515493787482
    }, {
      value: 3,
      date: 3515493787482
    }],
    medications: [{
      name: 'name',
      startDate: 1515493787482,
      startTime: 1515493787482,
      doseAmount: 'doseAmount',
      doseDirections: 'doseDirections',
      doseTiming: 'doseTiming',
      route: 'route',
      termonology: 'termonology',
      code: 'code',
      author_name: 'author_name',
      source: 'source',
    }],
    medication_anticoagulation_use: 'medication_anticoagulation_use',
    allergies: [{
      cause: 'testName',
      status: 'status',
      sampleTaken: 1515493787482,
      conclusion: 'conclusion',
      author: 'author',
      dateCreated: 1515493787482,
      source: 'source',
    }, {
      cause: 'testName',
      status: 'status',
      sampleTaken: 1515493787482,
      conclusion: 'conclusion',
      author: 'author',
      dateCreated: 1515493787482,
      source: 'source',
    }],
    tobaccoUse: 'tobaccoUse',
    alcoholUse: 'alcoholUse',
    physicalImparement: 'physicalImparement',
    systolicBP: 'systolicBP',
    systolicBP_units: 'systolicBP_units',
    diastolicBP: 'diastolicBP',
    diastolicBP_units: 'diastolicBP_units',
    pulse: 'pulse',
    pulse_units: 'pulse_units',
    height: 'height',
    height_units: 'height_units',
    weight: 'weight',
    weight_units: 'weight_units',
    bodyMass: 'bodyMass',
    bodyMass_units: 'bodyMass_units',
    otherExaminationFindings: 'otherExaminationFindings',
    documentOriginalSource: 'documentOriginalSource',
  }
};

describe('Component <DocumentsDetailReferral />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(<DocumentsDetailReferral />);
    expect(component).toMatchSnapshot();

    component.setProps({ detail: testProps.detail, importHandler: testProps.importHandler });
    const medications = testProps.detail.medications;
    const allergies = testProps.detail.allergies;

    expect(component.find('FormSectionList')).toHaveLength(10);
    expect(component.find('FormSection')).toHaveLength(8 + medications.length + allergies.length);

    const formControls = component.find('.form-group');
    const pastIllenssesFormGroup = testProps.detail.pastIllensses.length;
    const conclusionFormGroup = testProps.detail.conclusion.length;
    const medicationsFormGroup = medications.length * 11;
    const allergiesFormGroup = allergies.length * 7;
    expect(formControls).toHaveLength(43 + pastIllenssesFormGroup + conclusionFormGroup + medicationsFormGroup + allergiesFormGroup);

    expect(formControls.at(0).find('.control-label').text()).toEqual(valuesLabels.COMPOSER_NAME);
    expect(formControls.at(0).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.COMPOSER_NAME]);
    expect(formControls.at(1).find('.control-label').text()).toEqual(valuesLabels.DATE);
    expect(formControls.at(1).find('.form-control-static').text()).toEqual(DATE_TO_USE_TEXT);
    expect(formControls.at(2).find('.control-label').text()).toEqual(valuesLabels.AUTHOR);
    expect(formControls.at(2).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.AUTHOR]);

    expect(component.find('FormSectionList').at(0).props().title).toEqual(valuesLabels.TITLE_FACILITY);
    expect(formControls.at(3).find('.control-label').text()).toEqual(valuesLabels.FACILITY);
    expect(formControls.at(3).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.FACILITY]);
    expect(formControls.at(4).find('.control-label').text()).toEqual(valuesLabels.FACILITY_PROVIDER_ID);
    expect(formControls.at(4).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.FACILITY_PROVIDER_ID]);

    expect(component.find('FormSectionList').at(1).props().title).toEqual(valuesLabels.TITLE_REFERRAL);
    expect(formControls.at(5).find('.control-label').text()).toEqual(valuesLabels.REFERRAL_DATE);
    expect(formControls.at(5).find('.form-control-static').text()).toEqual(DATE_TO_USE_TEXT);
    expect(formControls.at(6).find('.control-label').text()).toEqual(valuesLabels.REFERRAL_TYPE);
    expect(formControls.at(6).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.REFERRAL_TYPE]);
    expect(formControls.at(7).find('.control-label').text()).toEqual(valuesLabels.REFERRAL_STATUS);
    expect(formControls.at(7).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.REFERRAL_STATUS]);
    expect(formControls.at(8).find('.control-label').text()).toEqual(valuesLabels.REFERRAL_REF);
    expect(formControls.at(8).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.REFERRAL_REF]);
    expect(formControls.at(9).find('.control-label').text()).toEqual(valuesLabels.REFERRAL_FROM);
    expect(formControls.at(9).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.REFERRAL_FROM]);
    expect(formControls.at(10).find('.control-label').text()).toEqual(valuesLabels.REFERRAL_TO);
    expect(formControls.at(10).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.REFERRAL_TO]);
    expect(formControls.at(11).find('.control-label').text()).toEqual(valuesLabels.REFERRAL_COMMENTS);
    expect(formControls.at(11).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.REFERRAL_COMMENTS]);

    expect(formControls.at(12).find('.control-label').text()).toEqual(valuesLabels.REFERRAL_REASONS);
    expect(formControls.at(12).find('.form-control-static').at(0).text()).toEqual(testProps.detail[valuesNames.REFERRAL_REASONS][0].reason);
    expect(formControls.at(12).find('.form-control-static').at(1).text()).toEqual(testProps.detail[valuesNames.REFERRAL_REASONS][1].reason);

    expect(component.find('FormSectionList').at(2).props().title).toEqual(valuesLabels.TITLE_PROVIDER);
    expect(formControls.at(13).find('.control-label').text()).toEqual(valuesLabels.PROVIDER_NAME);
    expect(formControls.at(13).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.PROVIDER_NAME]);
    expect(formControls.at(14).find('.control-label').text()).toEqual(valuesLabels.PROVIDER_ID);
    expect(formControls.at(14).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.PROVIDER_ID]);
    expect(formControls.at(15).find('.control-label').text()).toEqual(valuesLabels.PROVIDER_WORK_PHONE);
    expect(formControls.at(15).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.PROVIDER_WORK_PHONE]);
    expect(formControls.at(16).find('.control-label').text()).toEqual(valuesLabels.PROVIDER_EMERGENCY_PHONE);
    expect(formControls.at(16).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.PROVIDER_EMERGENCY_PHONE]);
    expect(formControls.at(17).find('.control-label').text()).toEqual(valuesLabels.PROVIDER_EMAIL_PHONE);
    expect(formControls.at(17).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.PROVIDER_EMAIL_PHONE]);

    expect(component.find('FormSectionList').at(3).props().title).toEqual(valuesLabels.TITLE_STATUS);
    expect(formControls.at(18).find('.control-label').text()).toEqual(valuesLabels.STATUS);
    expect(formControls.at(18).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.STATUS]);
    expect(formControls.at(19).find('.control-label').text()).toEqual(valuesLabels.STATUS_ORIGINAL_CODE);
    expect(formControls.at(19).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.STATUS_ORIGINAL_CODE]);
    expect(formControls.at(20).find('.control-label').text()).toEqual(valuesLabels.STATUS_CODE);
    expect(formControls.at(20).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.STATUS_CODE]);

    expect(component.find('FormSectionList').at(4).props().title).toEqual(valuesLabels.TITLE_SYNOPSIS);
    expect(formControls.at(21).find('.control-label').text()).toEqual(valuesLabels.SYNOPSIS_NARRATIVE);
    expect(formControls.at(21).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.SYNOPSIS_NARRATIVE]);
    expect(formControls.at(22).find('.control-label').text()).toEqual(valuesLabels.SYNOPSIS_ILLNESS);
    expect(formControls.at(22).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.SYNOPSIS_ILLNESS]);
    expect(formControls.at(23).find('.control-label').text()).toEqual(valuesLabels.SYNOPSIS_COMMENTS);
    expect(formControls.at(23).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.SYNOPSIS_COMMENTS]);
    expect(formControls.at(24).find('.control-label').text()).toEqual(valuesLabels.SYNOPSIS_HOSPITAL);
    expect(formControls.at(24).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.SYNOPSIS_HOSPITAL]);

    expect(component.find('FormSectionList').at(5).props().title).toEqual(valuesLabels.TITLE_PAST_ILLNESS);
    expect(formControls.at(25).find('.control-label').at(0).text()).toEqual(valuesLabels.PAST_I_HYPERTENSION);
    expect(formControls.at(25).find('.form-control-static--item').at(0).find('.control-label')
      .text()).toEqual(`${testProps.detail[valuesNames.PAST_I_HYPERTENSION][0].value}:`);
    expect(formControls.at(25).find('.form-control-static--item').at(0).find('.form-control-static').at(1)
      .text()).toEqual(DATE_TO_USE_TEXT);

    expect(component.find('FormSectionList').at(6).props().title).toEqual(valuesLabels.TITLE_SURGICAL_PROCEDURES);
    expect(formControls.at(25).find('.control-label').at(0).text()).toEqual(valuesLabels.SP_CONCLUSION);
    expect(formControls.at(25).find('.form-control-static--item').at(0).find('.control-label')
      .text()).toEqual(`${testProps.detail[valuesNames.SP_CONCLUSION][0].value}:`);
    expect(formControls.at(25).find('.form-control-static--item').at(0).find('.form-control-static').at(1)
      .text()).toEqual(DATE_TO_USE_TEXT);

    // Test Medications Section
    expect(component.find('FormSectionList').at(7).props().title).toEqual(valuesLabels.TITLE_MEDICATIONS);
    const medicationsSection = component.find('FormSectionList').at(7).find('FormSection').at(0);

    expect(medicationsSection.find('.control-label').at(0).text()).toEqual(valuesLabels.M_NAME);
    expect(medicationsSection.find('.control-label').at(1).text()).toEqual(valuesLabels.M_START_DATE);
    expect(medicationsSection.find('.control-label').at(2).text()).toEqual(valuesLabels.M_TIME);
    expect(medicationsSection.find('.control-label').at(3).text()).toEqual(valuesLabels.M_DOSE_A);
    expect(medicationsSection.find('.control-label').at(4).text()).toEqual(valuesLabels.M_DOSE_D);
    expect(medicationsSection.find('.control-label').at(5).text()).toEqual(valuesLabels.M_DOSE_T);
    expect(medicationsSection.find('.control-label').at(6).text()).toEqual(valuesLabels.M_ROUTE);
    expect(medicationsSection.find('.control-label').at(7).text()).toEqual(valuesLabels.M_TERMINOLOGY);
    expect(medicationsSection.find('.control-label').at(8).text()).toEqual(valuesLabels.M_CODE);
    expect(medicationsSection.find('.control-label').at(9).text()).toEqual(valuesLabels.M_AUTHOR);
    expect(medicationsSection.find('.control-label').at(10).text()).toEqual(valuesLabels.M_DATE);
    expect(medicationsSection.find('.control-label').at(11).text()).toEqual(valuesLabels.M_SOURCE);

    expect(medicationsSection.find('.form-control-static').at(0).text()).toEqual(medications[0][valuesNames.M_NAME]);
    expect(medicationsSection.find('.form-control-static').at(1).text()).toEqual(DATE_TO_USE_TEXT);
    expect(medicationsSection.find('.form-control-static').at(2).text()).toEqual(DATE_TO_USE_TEXT);
    expect(medicationsSection.find('.form-control-static').at(3).text()).toEqual(medications[0][valuesNames.M_DOSE_A]);
    expect(medicationsSection.find('.form-control-static').at(4).text()).toEqual(medications[0][valuesNames.M_DOSE_D]);
    expect(medicationsSection.find('.form-control-static').at(5).text()).toEqual(medications[0][valuesNames.M_DOSE_T]);
    expect(medicationsSection.find('.form-control-static').at(6).text()).toEqual(medications[0][valuesNames.M_ROUTE]);
    expect(medicationsSection.find('.form-control-static').at(7).text()).toEqual(medications[0][valuesNames.M_TERMINOLOGY]);
    expect(medicationsSection.find('.form-control-static').at(8).text()).toEqual(medications[0][valuesNames.M_CODE]);
    expect(medicationsSection.find('.form-control-static').at(9).text()).toEqual(medications[0][valuesNames.M_AUTHOR]);
    expect(medicationsSection.find('.form-control-static').at(10).text()).toEqual(DATE_TO_USE_TEXT);
    expect(medicationsSection.find('.form-control-static').at(11).text()).toEqual(medications[0][valuesNames.M_SOURCE]);

    // Test Allergies Section
    expect(component.find('FormSectionList').at(8).props().title).toEqual(valuesLabels.TITLE_ALLERGIES);
    const allergiesSection = component.find('FormSectionList').at(8).find('FormSection').at(0);

    expect(allergiesSection.find('.control-label').at(0).text()).toEqual(valuesLabels.A_NAME);
    expect(allergiesSection.find('.control-label').at(1).text()).toEqual(valuesLabels.A_STATUS);
    expect(allergiesSection.find('.control-label').at(2).text()).toEqual(valuesLabels.A_TAKEN);
    expect(allergiesSection.find('.control-label').at(3).text()).toEqual(valuesLabels.A_TERMINOLOGY);
    expect(allergiesSection.find('.control-label').at(4).text()).toEqual(valuesLabels.A_TERMINOLOGY_CODE);
    expect(allergiesSection.find('.control-label').at(5).text()).toEqual(valuesLabels.A_AUTHOR);
    expect(allergiesSection.find('.control-label').at(6).text()).toEqual(valuesLabels.A_DATE_CREATED);
    expect(allergiesSection.find('.control-label').at(7).text()).toEqual(valuesLabels.A_SOURCE);

    expect(allergiesSection.find('.form-control-static').at(0).text()).toEqual(allergies[0][valuesNames.A_NAME]);
    expect(allergiesSection.find('.form-control-static').at(1).text()).toEqual(allergies[0][valuesNames.A_STATUS]);
    expect(allergiesSection.find('.form-control-static').at(2).text()).toEqual(DATE_TO_USE_TEXT);
    expect(allergiesSection.find('.form-control-static').at(3).text()).toEqual(allergies[0][valuesNames.A_TERMINOLOGY]);
    expect(allergiesSection.find('.form-control-static').at(4).text()).toEqual(allergies[0][valuesNames.A_TERMINOLOGY_CODE]);
    expect(allergiesSection.find('.form-control-static').at(5).text()).toEqual(allergies[0][valuesNames.A_AUTHOR]);
    expect(allergiesSection.find('.form-control-static').at(6).text()).toEqual(DATE_TO_USE_TEXT);
    expect(allergiesSection.find('.form-control-static').at(7).text()).toEqual(allergies[0][valuesNames.A_SOURCE]);

    expect(formControls.at(56).find('.control-label').text()).toEqual(valuesLabels.USE_TOBACCO);
    expect(formControls.at(56).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.USE_TOBACCO]);
    expect(formControls.at(57).find('.control-label').text()).toEqual(valuesLabels.USE_ALCOHOL);
    expect(formControls.at(57).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.USE_ALCOHOL]);
    expect(formControls.at(58).find('.control-label').text()).toEqual(valuesLabels.PHYSICAL_I);
    expect(formControls.at(58).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.PHYSICAL_I]);

    expect(component.find('FormSectionList').at(9).props().title).toEqual(valuesLabels.TITLE_VITALS);
    expect(formControls.at(59).find('.control-label').text()).toEqual(valuesLabels.V_SBP);
    expect(formControls.at(59).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.V_SBP]);
    expect(formControls.at(60).find('.control-label').text()).toEqual(valuesLabels.V_SBPU);
    expect(formControls.at(60).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.V_SBPU]);
    expect(formControls.at(61).find('.control-label').text()).toEqual(valuesLabels.V_DBP);
    expect(formControls.at(61).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.V_DBP]);
    expect(formControls.at(62).find('.control-label').text()).toEqual(valuesLabels.V_DBPU);
    expect(formControls.at(62).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.V_DBPU]);
    expect(formControls.at(63).find('.control-label').text()).toEqual(valuesLabels.V_P);
    expect(formControls.at(63).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.V_P]);
    expect(formControls.at(64).find('.control-label').text()).toEqual(valuesLabels.V_PU);
    expect(formControls.at(64).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.V_PU]);
    expect(formControls.at(65).find('.control-label').text()).toEqual(valuesLabels.V_H);
    expect(formControls.at(65).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.V_H]);
    expect(formControls.at(66).find('.control-label').text()).toEqual(valuesLabels.V_HU);
    expect(formControls.at(66).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.V_HU]);
    expect(formControls.at(67).find('.control-label').text()).toEqual(valuesLabels.V_W);
    expect(formControls.at(67).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.V_W]);
    expect(formControls.at(68).find('.control-label').text()).toEqual(valuesLabels.V_WU);
    expect(formControls.at(68).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.V_WU]);
    expect(formControls.at(69).find('.control-label').text()).toEqual(valuesLabels.V_BM);
    expect(formControls.at(69).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.V_BM]);
    expect(formControls.at(70).find('.control-label').text()).toEqual(valuesLabels.V_BMU);
    expect(formControls.at(70).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.V_BMU]);

    expect(formControls.at(71).find('.control-label').text()).toEqual(valuesLabels.OTHER_EXAM);
    expect(formControls.at(71).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.OTHER_EXAM]);
    expect(formControls.at(72).find('.control-label').text()).toEqual(valuesLabels.DOC_ORIGINAL_SOURCE);
    expect(formControls.at(72).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.DOC_ORIGINAL_SOURCE]);
    expect(formControls.at(73).find('.control-label').text()).toEqual(valuesLabels.SOURCE);
    expect(formControls.at(73).find('.form-control-static').text()).toEqual(testProps.detail[valuesNames.SOURCE]);

    expect(component).toMatchSnapshot();
  });
});

