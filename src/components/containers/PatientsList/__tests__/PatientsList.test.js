import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PatientsList from '../PatientsList';
import { fetchPatientsRequest } from "../../../../ducks/feth-patients.duck";
import { fetchPatientCountsRequest } from '../../../../ducks/fetch-patient-counts.duck'
import { setCurrentPageOffsetStart } from '../../../../ducks/set-current-page-offset.duck'

const defaultColumnsSelected = {
  address: true,
  dateOfBirth: true,
  diagnosesCount: false,
  diagnosesDate: false,
  gender: true,
  id: true,
  name: true,
  ordersCount: true,
  ordersDate: true,
  promsCount: false,
  promsDate: false,
  viewPatientNavigation: true,
};
const mockStore = configureStore();
const initialState = {
  columnNameSortBy: 'name',
  sortingOrder: 'asc',
  offset: -1,
  nameShouldInclude: 'ezra',
  selectedColumns: defaultColumnsSelected,
  patientPath: '',
  isDisclaimerModalVisible: false,
  openedDropdownID: null,
};
const store = mockStore(initialState);

Enzyme.configure({ adapter: new Adapter() });

const allPatients = [{
    id: '9999999006',
    address: 'P.O. Box 711, 8725 Purus Rd., Grangemouth, Stirlingshire, B4 8MW',
    dateOfBirth: -363657600000,
    department: 'Primary Care',
    gender: 'Male',
    gpAddress: 'Aulderan Practice, Ap #806-2884 Enim St., Auldearn, Nairnshire, V4F 9GJ',
    gpName: 'Joseph May N.',
    name: 'Ezra Gordon',
    nhsNumber: '9999999006',
    pasNo: '595941',
    phone: '070 6691 5178',
  }, {
    id: '9999999006',
    address: 'P.O. Box 711, 8725 Purus Rd., Grangemouth, Stirlingshire, B4 8MW',
    dateOfBirth: -363657600000,
    department: 'Primary Care',
    gender: 'Male',
    gpAddress: 'Aulderan Practice, Ap #806-2884 Enim St., Auldearn, Nairnshire, V4F 9GJ',
    gpName: 'Joseph May N.',
    name: 'Ezra Gordon',
    nhsNumber: '9999999006',
    pasNo: '595941',
    phone: '070 6691 5178',
  },
];
const allPatientsWithCounts = [{
    id: '9999999006',
    address: 'P.O. Box 711, 8725 Purus Rd., Grangemouth, Stirlingshire, B4 8MW',
    dateOfBirth: -363657600000,
    department: 'Primary Care',
    gender: 'Male',
    gpAddress: 'Aulderan Practice, Ap #806-2884 Enim St., Auldearn, Nairnshire, V4F 9GJ',
    gpName: 'Joseph May N.',
    name: 'Ezra Gordon',
    nhsNumber: '9999999006',
    pasNo: '595941',
    phone: '070 6691 5178',
    diagnosesDate: '1970-01-01T00:00:00-05:00',
    ordersDate: '1970-01-01T00:00:00-05:00',
    resultsDate: '1970-01-01T00:00:00-05:00',
    vitalsDate: '1970-01-01T00:00:00-05:00',
  }, {
    id: '9999999006',
    address: 'P.O. Box 711, 8725 Purus Rd., Grangemouth, Stirlingshire, B4 8MW',
    dateOfBirth: -363657600000,
    department: 'Primary Care',
    gender: 'Male',
    gpAddress: 'Aulderan Practice, Ap #806-2884 Enim St., Auldearn, Nairnshire, V4F 9GJ',
    gpName: 'Joseph May N.',
    name: 'Ezra Gordon',
    nhsNumber: '9999999006',
    pasNo: '595941',
    phone: '070 6691 5178',
    diagnosesDate: '1970-01-01T00:00:00-05:00',
    ordersDate: '1970-01-01T00:00:00-05:00',
    resultsDate: '1970-01-01T00:00:00-05:00',
    vitalsDate: '1970-01-01T00:00:00-05:00',
  },
];
const currentPagePatients = [
  {
    address: 'Ap #804-4028 Phasellus Rd., Ely, Cambridgeshire, GU67 5CN',
    dateOfBirth: 128304000000,
    dateOfBirthConvert: '25-Jan-1974',
    department: 'Mental Health',
    diagnosesDateConvert: '17-Jul-2018',
    gender: 'Female',
    gpAddress: 'Port Glasgow Practice, 4872 Cubilia St., Port Glasgow, Renfrewshire, TQ3J 4JG',
    gpName: 'Hawkins Sonya T.',
    id: '9999999050',
    name: 'Avram Miller',
    nhsNumber: '9999999050',
    ordersDateConvert: '17-Jul-2018',
    pasNo: '343941',
    phone: '0845 46 47',
    resultsDateConvert: '17-Jul-2018',
    viewPatientNavigation: {},
    vitalsDateConvert: '17-Jul-2018',
  }, {
    id: '9999999006',
    address: 'P.O. Box 711, 8725 Purus Rd., Grangemouth, Stirlingshire, B4 8MW',
    dateOfBirth: -363657600000,
    department: 'Primary Care',
    gender: 'Male',
    gpAddress: 'Aulderan Practice, Ap #806-2884 Enim St., Auldearn, Nairnshire, V4F 9GJ',
    gpName: 'Joseph May N.',
    name: 'Ezra Gordon',
    nhsNumber: '9999999006',
    pasNo: '595941',
    phone: '070 6691 5178',
    diagnosesDate: '1970-01-01T00:00:00-05:00',
    ordersDate: '1970-01-01T00:00:00-05:00',
    resultsDate: '1970-01-01T00:00:00-05:00',
    vitalsDate: '1970-01-01T00:00:00-05:00',
  },
];
const history = {
  location: {
    hash: '',
    pathname: '/patients',
    search: '?ageRange=31-60',
    state: '',
  },
};
const panelTitle = 'Patient Info. Age range: 31-60';
const patientsCounts = {
  9999999006: {
    0: {
      diagnosesCount: '',
      resultsCount: 1,
      vitalsCount: '',
      source: 'ethercis',
      sourceId: 'ethercis-counts',
    },
  },
};
const patientsPerPageAmount = 1;
const offset = -1;
const handleHeaderCellClick = () => {};
const actions = {
  fetchPatientsRequest, fetchPatientCountsRequest, setCurrentPageOffsetStart
};
const context = {
  router: {
    history: {
      push: () => {
      },
      replace: () => {
      },
      location: {
        pathname: '/patients',
        state: {
          data: [{
              id: '9999999006',
              address: 'P.O. Box 711, 8725 Purus Rd., Grangemouth, Stirlingshire, B4 8MW',
              dateOfBirth: -363657600000,
              department: 'Primary Care',
              gender: 'Male',
              gpAddress: 'Aulderan Practice, Ap #806-2884 Enim St., Auldearn, Nairnshire, V4F 9GJ',
              gpName: 'Joseph May N.',
              name: 'Ezra Gordon',
              nhsNumber: '9999999006',
              pasNo: '595941',
              phone: '070 6691 5178',
              diagnosesDate: '1970-01-01T00:00:00-05:00',
              ordersDate: '1970-01-01T00:00:00-05:00',
              resultsDate: '1970-01-01T00:00:00-05:00',
              vitalsDate: '1970-01-01T00:00:00-05:00',
            }],
          searchResult: '(Search Type: allergies, Search Query: contains \\"1\\")',
        },
      },
    },
  },
  props: {
    allPatients,
    allPatientsWithCounts,
    currentPagePatients,
    history,
    offset,
    panelTitle,
    patientsCounts,
    patientsPerPageAmount,
    handleHeaderCellClick,
    actions
  }
};
const emptyContext = {
    router: {
        history: {
            location: {},
        },
    },
};
const location = {
  pathname: '/patients',
  search: '?ageRange=61-80',
};

describe('Component <PatientsList />', () => {
  it('should renders with props correctly', () => {
    const component = mount(
      <PatientsList
        store={store}
        allPatients={allPatients}
        allPatientsWithCounts={allPatientsWithCounts}
        currentPagePatients={currentPagePatients}
        history={history}
        offset={-1}
        panelTitle={panelTitle}
        patientsCounts={patientsCounts}
        patientsPerPageAmount={patientsPerPageAmount}
        handleHeaderCellClick={handleHeaderCellClick}
        actions={actions}
      />, { context: emptyContext, childContextTypes: { router: React.PropTypes.object, emptyContext: React.PropTypes.object } }).setState(initialState);

    component.find('.btn-dropdown-toggle').at(0).simulate('click');
    component.find('.btn-filter').at(0).simulate('click');
    component.find('.form-control').at(0).simulate('change', { target: { value: 'ezra' } });
    expect(component.state().nameShouldInclude).toEqual('ezra');
    component.find('th[name="address"]').simulate('click');
    expect(component).toMatchSnapshot();
    expect(component.state().isDisclaimerModalVisible).toEqual(false);
    component.setState({ isDisclaimerModalVisible: true });
    expect(component.state().isDisclaimerModalVisible).toEqual(true);
    component.find('[name="address"]').at(0).simulate('click');
    component.find('.pagination-link').at(2).simulate('click');
    component.find('.btn-dropdown-toggle').at(3).simulate('click');
    component.setProps({ patientsPerPageAmount: 2 });
    expect(component.props().patientsPerPageAmount).toEqual(2);
    component.mount();
    component.unmount();
  });

  it('should renders with props correctly shallow testing', () => {
    const component = mount(
      <Provider store={store}>
        <StaticRouter location="someLocation" context={context}>
          <PatientsList
            allPatients={allPatients}
            allPatientsWithCounts={allPatientsWithCounts}
            currentPagePatients={currentPagePatients}
            history={history}
            offset={-1}
            panelTitle={'Patient Info (Search Type: allergies, Search Query: contains \\"1\\")'}
            patientsCounts={patientsCounts}
            patientsPerPageAmount={patientsPerPageAmount}
            handleHeaderCellClick={handleHeaderCellClick}
            actions={actions}
          />
        </StaticRouter>
      </Provider>);
    expect(component.find('PatientsListHeader').props().panelTitle).toEqual('Patient Info (Search Type: allergies, Search Query: contains \\"1\\")');
    expect(component).toMatchSnapshot();
  });
});