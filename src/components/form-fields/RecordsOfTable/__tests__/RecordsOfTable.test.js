import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import RecordsOfTable from '../../../form-fields/RecordsOfTable/RecordsOfTable';
import { valuesNames } from '../forms.config';

Enzyme.configure({ adapter: new Adapter() });

const userId = '9999999000';

const mockStore = configureStore();
const storeResource = {
  patientsDiagnoses: {
    '9999999000': [
      {
        problem: 'Too bad desease ddd',
        dateOfOnset: 1512432000000,
        source: 'ethercis',
        sourceId: '0234fbd6-bfb5-49b0-bf02-9759a22f471f',
        dateOfOnsetConvert: '05-Dec-2017',
      },
    ],
  },
  patientsMedications: {
    '9999999000': [
      {
        name: 'test medication 11.01',
        doseAmount: 'Dose Amount',
        dateCreated: 1515670672000,
        source: 'ethercis',
        sourceId: '1893365f-4961-4af1-847c-8ccf205aa7a1',
        highlighters: [
          {
            name: 'name',
            status: 'warning',
          },
        ],
        dateCreatedConvert: '11-Jan-2018',
      },
    ],
  },
  patientsReferrals: {
    '9999999000': [
      {
        dateOfReferral: 1511283530634,
        referralFrom: '#Tony Shannon1',
        referralTo: 'Ripplefields Optometry service',
        source: 'ethercis',
        sourceId: '94133578-f505-4e76-b4ed-762462508801',
        dateOfReferralConvert: '21-Nov-2017',
      },
    ],
  },
  patientsVitals: {
    '9999999000': [
      {
        author: 'Dr Tony Shannon',
        dateCreated: 1516367377000,
        newsScore: 4,
        respirationRate: '12.0',
        oxygenSupplemental: 'false',
        heartRate: '45.0',
        temperature: '37.0',
        levelOfConsciousness: 'Voice',
        systolicBP: '112.0',
        diastolicBP: '64.0',
        oxygenSaturation: '97.0',
        source: 'ethercis',
        sourceId: '27ee5e25-4c32-46d2-b45a-f74149d72030',
        id: 1,
        highlighters: [
          {
            name: 'newsScore',
            status: 'success',
          },
        ],
        dateCreatedConvert: '19-Jan-2018',
      },
    ],
  },
  patientsEvents: {
    '9999999000': [
      {
        dateCreated: 1494586220000,
        type: 'Discharge',
        name: 'Discharge to care home',
        description: 'Needs nursing and supervisory care',
        dateTime: 1494496220958,
        source: 'ethercis',
        sourceId: '93ac376d-3ff4-4e0b-b080-47eb3fe81750',
        dateTimeConvert: '11-May-2017',
        sideDateInTimeline: 'right',
      },
    ],
  },
  patientsProcedures: {
    '9999999000': [
      {
        name: 'total replacement of hip',
        date: 1436969493829,
        time: 54693829,
        source: 'ethercis',
        sourceId: 'fa7408c3-7d69-4f50-84ac-cbf735a0ab18',
        dateConvert: '15-Jul-2015',
        timeConvert: '17:11',
      },
    ],
  },
}
const store = mockStore(Object.assign({}, storeResource));
const emptyStore = mockStore({
  diagnosesDetail: {
    // '9999999000': {},
  },
  medicationsDetail: {
    // '9999999000': {},
  },
  referralsDetail: {
    // '9999999000': {},
  },
  vitalsDetail: {
    // '9999999000': {},
  },
  eventsDetail: {
    // '9999999000': {},
  },
  proceduresDetail: {
    // '9999999000': {},
  },
});


const DATE_TO_USE = new Date('2017');
const DATE_TO_USE_TIME = DATE_TO_USE.getTime();
global.Date = jest.fn(() => DATE_TO_USE);
Date.now = jest.fn(() => DATE_TO_USE_TIME);

const match = {
  params: {
    userId,
  },
};

describe('Component <RecordsOfTable />', () => {
  it('should renders with props correctly when type referrals', () => {
    const component = shallow(
      <RecordsOfTable
        store={store}
        input={{
          value: [
            {
              [valuesNames.RECORDS_DATE]: '05-Dec-2017',
              [valuesNames.RECORDS_NAME]: 'Too bad desease ddd',
              [valuesNames.RECORDS_SOURCE]: 'ethercis',
              [valuesNames.SOURCE_ID]: '0234fbd6-bfb5-49b0-bf02-9759a22f471f',
              [valuesNames.TYPE]: 'diagnosis',
              [valuesNames.RECORDS_TYPE]: 'Problems / Diagnosis',
            },
          ],
        }}
        match={match}
      />).dive().dive().dive()
      .dive()
      .dive()
      .dive();

    expect(component.find('Spinner')).toHaveLength(0);
    expect(component.find('SelectFormGroup')).toHaveLength(1);
    expect(component.find('DragDropContext')).toHaveLength(1);
    expect(component.find('Connect(Droppable)')).toHaveLength(1);

    // Testing handleGetHeadingsLists method
    expect(component.state().typeRecords).toEqual('');
    component.instance().handleGetHeadingsLists({ target: { value: 'diagnosis' }});
    expect(component.state().typeRecords).toEqual('diagnosis');

    component.instance().handleGetHeadingsLists({ target: { value: 'events' }});
    expect(component.state().typeRecords).toEqual('events');

    expect(component).toMatchSnapshot();
  });
});

