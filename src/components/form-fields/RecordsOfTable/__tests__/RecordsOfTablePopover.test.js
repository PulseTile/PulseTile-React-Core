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
};
const store = mockStore(Object.assign({}, storeResource));
const emptyStore = mockStore({
  diagnosesDetail: {
    '9999999000': {},
  },
  medicationsDetail: {
    '9999999000': {},
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
      />)
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
      />)
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
      />)
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
            type: 'medications',
            sourceId: '',
          }
        }
        match={match}
      />)
      .dive()
      .dive()
      .dive();

    expect(component).toMatchSnapshot();
  });
});

