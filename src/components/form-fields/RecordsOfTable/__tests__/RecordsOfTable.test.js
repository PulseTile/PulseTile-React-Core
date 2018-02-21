import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
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

const DATE_TO_USE = new Date('2017');
const DATE_TO_USE_TIME = DATE_TO_USE.getTime();
global.Date = jest.fn(() => DATE_TO_USE);
Date.now = jest.fn(() => DATE_TO_USE_TIME);

const match = {
  params: {
    userId,
  },
};
const testProps = {
  input: {
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
    onChange: (value) => value,
  },
  allReferrals: [
    {
      dateOfReferral: 1511283530634,
      referralFrom: '#Tony Shannon1',
      referralTo: 'Ripplefields Optometry service',
      source: 'ethercis',
      sourceId: '94133578-f505-4e76-b4ed-762462508801',
      dateOfReferralConvert: '21-Nov-2017',
    },
  ],
};

describe('Component <RecordsOfTable />', () => {
  it('should renders with props correctly shallow testing different methods', () => {
    const component = shallow(
      <RecordsOfTable
        store={store}
        input={testProps.input}
        allReferrals={testProps.allReferrals}
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
    component.setState({ indexOfSelectedRecord: 'test', indexOfTypeEvents: 'test' });
    component.instance().handleGetHeadingsLists({ target: { value: 'diagnosis' }});
    expect(component.state().typeRecords).toEqual('diagnosis');
    expect(component.state().indexOfSelectedRecord).toEqual('');
    expect(component.state().indexOfTypeEvents).toEqual('');

    component.instance().handleGetHeadingsLists({ target: { value: 'events' }});
    expect(component.state().typeRecords).toEqual('events');

    component.instance().handleGetHeadingsLists({ target: { value: 'diagnosis' }});

    // Testing set['fieldName']Records methods
    component.instance().setDiagnosisRecords([{ dateOfOnset: 1512432000000 }]);
    component.instance().setMedicationsRecords([{ dateCreated: 1512432000000 }]);
    component.instance().setProceduresRecords([{ date: 1512432000000 }]);
    component.instance().setReferralsRecords([{ dateOfReferral: 1512432000000, referralFrom: 'referralFrom', referralTo: 'referralTo' }]);
    component.instance().setVitalsRecords([
      {},
      {
        newsScore: 4,
        dateCreated: 1516367377000,
      },
    ]);

    // Testing handleTogglePopover method
    expect(component.state().indexOfOpenedPopover).toEqual(null);
    component.instance().handleTogglePopover(1)
    expect(component.state().indexOfOpenedPopover).toEqual(1);

    // Testing handleClosePopover method
    component.instance().handleClosePopover()
    expect(component.state().indexOfOpenedPopover).toEqual(null);

    // Testing onDragStart method
    component.setState({ indexOfOpenedPopover: 'testIndex' });
    component.instance().onDragStart()
    expect(component.state().indexOfOpenedPopover).toEqual(null);

    // Testing handleDocumentClick method
    component.setState({ indexOfOpenedPopover: 'testIndex' });
    component.instance().handleDocumentClick({ target: { closest: () => {} }});
    component.instance().handleDocumentClick({ target: { closest: (value) => value }});
    expect(component.state().indexOfOpenedPopover).toEqual(null);

    // Testing another methods
    component.instance().onDragEnd({ source: { index: 0 }, destination: { index: 0 } });
    component.instance().onDragEnd({ source: { index: 0 } });
    component.instance().getItemStyle(true, []);
    component.instance().getItemStyle(false, []);

    // Testing handleGetHeadingsItems method at different initial conditions
    component.setState({
      typesRecords: {
        diagnosis: {
          records: []
        }
      }
    });
    component.instance().handleGetHeadingsItems({ target: { value: 0 } });
    component.setState({
      typesRecords: {
        diagnosis: {
          records: [{
            record: {
              tableName: 'test',
              date: 1512432000000,
              source: 'test Source',
              sourceId: 'test SourceID',
            }
          }]
        }
      }
    });
    component.instance().handleGetHeadingsItems({ target: { value: 0 } });
    component.setState({
      typesRecords: {
        events: {
          records: [{
            events: [{
              record: {
                tableName: 'test',
                date: 1512432000000,
                source: 'test Source',
                sourceId: 'test SourceID',
              }
            }]
          }]
        }
      },
      typeRecords: 'events',
      indexOfTypeEvents: 0,
    });
    component.instance().handleGetHeadingsItems({ target: { value: 0 } });
    component.instance().handleGetHeadingsLists({ target: { value: 'events' }});
    component.setState({
      typesRecords: {
        events: {
          records: [{
            events: undefined,
          }]
        }
      },
      typeRecords: 'events',
      indexOfTypeEvents: 0,
    });

    // Testing handleGetEventType method
    component.setState({ indexOfTypeEvents: '' });
    expect(component.state().indexOfTypeEvents).toEqual('');
    component.instance().handleGetEventType({ target: { value: 0 } });
    expect(component.state().indexOfTypeEvents).toEqual(0);
    expect(component.state().indexOfSelectedRecord).toEqual('');

    // Testing removeRecord method
    component.instance().removeRecord(0)({ preventDefault: () => {}, stopPropagation: () => {}  });

    expect(component).toMatchSnapshot();

    // Testing unmount method
    component.unmount();
  });

  it('should renders with props correctly mount testing for refs', () => {
    const component = mount(
      <RecordsOfTable
        store={store}
        input={testProps.input}
        allReferrals={testProps.allReferrals}
        match={match}
      />);

    component.setState({ indexOfOpenedPopover : 0 });
    component.setState({ indexOfOpenedPopover : 1234 });
    expect(component).toMatchSnapshot();
  });

  it('should renders with props correctly when input.value is empty', () => {
    const component = shallow(
      <RecordsOfTable
        store={store}
        input={{
          value: [],
          onChange: (value) => value,
        }}
        allReferrals={testProps.allReferrals}
        match={match}
        isSubmit
      />).dive().dive().dive()
      .dive()
      .dive()
      .dive();

    expect(component.find('.has-error')).toHaveLength(1);
    expect(component.find('.form-control-static').text()).toEqual('No records added');
    expect(component.find('.help-block')).toHaveLength(1);
    expect(component.find('.help-block').text()).toEqual('You must select at least one record.');
    expect(component).toMatchSnapshot();
  });

  it('should renders with props correctly when input.value is undefined', () => {
    const component = shallow(
      <RecordsOfTable
        store={store}
        input={{
          value: undefined,
          onChange: (value) => value,
        }}
        match={match}
        isSubmit={false}
      />).dive().dive().dive()
      .dive()
      .dive()
      .dive();

    component.setState({
      typesRecords: {
        diagnosis: {
          records: [{
            record: {
              tableName: 'test',
              date: 1512432000000,
              source: 'test Source',
              sourceId: 'test SourceID',
            }
          }]
        }
      },
      typeRecords: 'diagnosis'
    });
    component.instance().handleGetHeadingsItems({ target: { value: 0 }})
    expect(component).toMatchSnapshot();
  });
});

