import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import RecordsOfTablePopover from '../../../form-fields/RecordsOfTable/RecordsOfTablePopover';

Enzyme.configure({ adapter: new Adapter() });

const userId = '9999999000';

const mockStore = configureStore();
const storeResource = {
  diagnosesDetail: {
    '9999999000': {
      problem: '# CONDYLE RIGHT HUMERUS 123',
      dateOfOnset: 1514851200000,
      description: 'ggg',
      terminology: 'SNOMED-CT',
      code: 12393890,
      author: 'Dr Tony Shannon',
      dateCreated: 1516801743000,
      source: 'ethercis',
      sourceId: 'a360e5fa-c837-4060-9f67-fecbf2f42d42',
      originalComposition: '',
      originalSource: '',
    },
  },
  medicationsDetail: {
    '9999999000': {
      name: 'test medication 11.01',
      doseAmount: 'Dose Amount',
      doseDirections: 'Dose Direction',
      doseTiming: 'Dose Amount',
      route: 'Po Per Oral',
      startDate: 1515719699000,
      startTime: 4499000,
      medicationCode: 123456789,
      medicationTerminology: 'external',
      author: 'bob.smith@gmail.com',
      dateCreated: 1515670672000,
      source: 'ethercis',
      sourceId: '1893365f-4961-4af1-847c-8ccf205aa7a1',
    },
  },
  referralsDetail: {
    '9999999000': {
      referralType: 'Referral To',
      referralReason: 'test1rrrrrrrrrrrr',
      referralSummary: 'test1rrrrrrrrrrrrr',
      referralFrom: 'aa test1rrrrrrrrrrrrrrrrrrrrrrrrrrr',
      referralTo: 'test1rrrrrrrrrrrrr',
      referralRef: '',
      referralOutcome: '',
      referralStateDate: 1511196789986,
      referralState: 'planned',
      referralStateCode: 526,
      referralCareFlow: 'Service request sent',
      referralServiceName: 'Referral To',
      author: 'bob.smith@gmail.com',
      dateOfReferral: 1511196789986,
      dateCreated: 1512479165000,
      source: 'ethercis',
      sourceId: 'f1dc1821-65a4-42a3-8c09-732e321ab97a',
    },
  },
  vitalsDetail: {
    '9999999000': {
      respirationRate: '12.0',
      oxygenSupplemental: 'false',
      heartRate: '45.0',
      temperature: '37.0',
      levelOfConsciousness: 'Voice',
      systolicBP: '112.0',
      diastolicBP: '64.0',
      oxygenSaturation: '97.0',
      newsScore: 4,
      author: 'Dr Tony Shannon',
      dateCreated: 1516367377000,
      source: 'ethercis',
      sourceId: '27ee5e25-4c32-46d2-b45a-f74149d72030',
    },
  },
  eventsDetail: {
    '9999999000': {
      name: '- Procedure',
      type: 'Admission',
      description: '- Procedure',
      dateTime: 1517845805981,
      author: 'bob.smith@gmail.com',
      dateCreated: 1517845806000,
      source: 'ethercis',
      sourceId: '773c2b67-9a88-4bfd-9f0d-04e78dc5721e',
    },
  },
  proceduresDetail: {
    '9999999000': {
      name: 'a test request23 changed',
      procedureName: 'a test request23 changed',
      procedureCode: '1234523 changed',
      date: 1510856522000,
      time: 66122000,
      procedureTerminology: 'SNOMED-CT changed',
      notes: 'testing23 changed',
      performer: 'Performer changed',
      currentStatus: 'completed',
      author: 'bob.smith@gmail.com',
      dateSubmitted: 1511799722000,
      source: 'ethercis',
      sourceId: 'abfa6a6c-9703-4566-8926-f046580bd8a7',
      originalComposition: '',
      originalSource: '',
    },
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

describe('Component <RecordsOfTablePopover />', () => {
  it('should renders with props correctly when type referrals', () => {
    const component = shallow(
      <RecordsOfTablePopover
        store={store}
        record={
          {
            type: 'referrals',
            sourceId: '9dabaf87-7ad4-410a-944f-2449a8d0f8f7',
          }
        }
        match={match}
      />).dive().dive().dive()
      .dive()
      .dive()
      .dive();

    expect(component.find('.record-popover')).toHaveLength(1);

    expect(component.find('.record-popover-title')).toHaveLength(1);
    expect(component.find('.record-popover-title').at(0).text()).toEqual('Referrals');

    expect(component.find('Spinner')).toHaveLength(1);
    expect(component.find('RecordsOfTablePopoverReferrals')).toHaveLength(1);

    expect(component).toMatchSnapshot();
  });

  it('should renders with props correctly when type diagnosis', () => {
    const component = shallow(
      <RecordsOfTablePopover
        store={store}
        record={
          {
            type: 'diagnosis',
            sourceId: '9dabaf87-7ad4-410a-944f-2449a8d0f8f7',
          }
        }
        match={match}
      />).dive().dive().dive()
      .dive()
      .dive()
      .dive();

    expect(component.find('.record-popover')).toHaveLength(1);

    expect(component.find('.record-popover-title')).toHaveLength(1);
    expect(component.find('.record-popover-title').at(0).text()).toEqual('Diagnosis');

    expect(component.find('Spinner')).toHaveLength(1);
    expect(component.find('RecordsOfTablePopoverDiagnosis')).toHaveLength(1);

    expect(component).toMatchSnapshot();
  });

  it('should renders with props correctly when type medications', () => {
    const component = shallow(
      <RecordsOfTablePopover
        store={store}
        record={
          {
            type: 'medications',
            sourceId: '9dabaf87-7ad4-410a-944f-2449a8d0f8f7',
          }
        }
        match={match}
      />).dive().dive().dive()
      .dive()
      .dive()
      .dive();

    expect(component.find('.record-popover')).toHaveLength(1);

    expect(component.find('.record-popover-title')).toHaveLength(1);
    expect(component.find('.record-popover-title').at(0).text()).toEqual('Medications');

    expect(component.find('Spinner')).toHaveLength(1);
    expect(component.find('RecordsOfTablePopoverMedications')).toHaveLength(1);

    expect(component).toMatchSnapshot();
  });

  it('should renders with props correctly when type events', () => {
    const component = shallow(
      <RecordsOfTablePopover
        store={store}
        record={
          {
            type: 'events',
            sourceId: '9dabaf87-7ad4-410a-944f-2449a8d0f8f7',
          }
        }
        match={match}
      />).dive().dive().dive()
      .dive()
      .dive()
      .dive();

    expect(component.find('.record-popover')).toHaveLength(1);

    expect(component.find('.record-popover-title')).toHaveLength(1);
    expect(component.find('.record-popover-title').at(0).text()).toEqual('Events');

    expect(component.find('Spinner')).toHaveLength(1);
    expect(component.find('RecordsOfTablePopoverEvents')).toHaveLength(1);

    expect(component).toMatchSnapshot();
  });

  it('should renders with props correctly when type vitals', () => {
    const component = shallow(
      <RecordsOfTablePopover
        store={store}
        record={
          {
            type: 'vitals',
            sourceId: '27ee5e25-4c32-46d2-b45a-f74149d72030',
          }
        }
        match={match}
      />).dive().dive().dive()
      .dive()
      .dive()
      .dive();

    expect(component.find('.record-popover')).toHaveLength(1);

    expect(component.find('.record-popover-title')).toHaveLength(1);
    expect(component.find('.record-popover-title').at(0).text()).toEqual('Vitals');

    expect(component.find('Spinner')).toHaveLength(0);
    expect(component.find('RecordsOfTablePopoverVitals')).toHaveLength(1);

    expect(component).toMatchSnapshot();
  });

  it('should renders with props correctly when type procedures', () => {
    const component = shallow(
      <RecordsOfTablePopover
        store={store}
        record={
          {
            type: 'procedures',
            sourceId: '9dabaf87-7ad4-410a-944f-2449a8d0f8f7',
          }
        }
        match={match}
      />).dive().dive().dive()
      .dive()
      .dive()
      .dive();

    expect(component.find('.record-popover')).toHaveLength(1);

    expect(component.find('.record-popover-title')).toHaveLength(1);
    expect(component.find('.record-popover-title').at(0).text()).toEqual('Procedures');

    expect(component.find('Spinner')).toHaveLength(1);
    expect(component.find('RecordsOfTablePopoverProcedures')).toHaveLength(1);

    expect(component).toMatchSnapshot();
  });

  it('should renders with props correctly without Spinner', () => {
    const component = shallow(
      <RecordsOfTablePopover
        store={emptyStore}
        record={
          {
            type: 'test',
            sourceId: '',
          }
        }
        match={match}
      />).dive().dive().dive()
      .dive()
      .dive()
      .dive();


    expect(component).toMatchSnapshot();
  });

  it('should renders with props correctly without Spinner', () => {
    const component = shallow(
      <RecordsOfTablePopover
        store={emptyStore}
        record={
          {
            type: 'vitals',
            sourceId: '',
          }
        }
        match={match}
      />).dive().dive().dive()
      .dive()
      .dive()
      .dive();


    expect(component).toMatchSnapshot();
  });
});

