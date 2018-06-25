import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { lifecycle, compose } from 'recompose';
import _ from 'lodash/fp';

import SortableTablePatients from '../SortableTable/SortableTablePatients';
import PaginationBlock from '../../presentational/PaginationBlock/PaginationBlock';
import PatientsListHeader from './header/PatientsListHeader';
import ViewPatienDropdown from './actions-column/ViewPatienDropdown';
import PatientAccessDisclaimerModal from './PatientAccessDisclaimerModal';
import { patientsColumnsConfig, defaultColumnsSelected } from '../../../config/patients-table-columns.config'
import { setCurrentPagePatientsStart } from '../../../ducks/set-current-page-patients.duck';
import { clientUrls } from '../../../config/client-urls.constants';
import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';
import { operationsOnCollection } from '../../../utils/plugin-helpers.utils';

const mapDispatchToProps = dispatch => ({ dispatch });
@connect(PatientsList, mapDispatchToProps)
export default class PatientsList extends PureComponent {
    static propTypes = {
      allPatients: PropTypes.arrayOf(
        PropTypes.shape({
          address: PropTypes.string,
          dateOfBirth: PropTypes.number,
          gender: PropTypes.string,
          gpAddress: PropTypes.string,
          id: PropTypes.string,
          name: PropTypes.string,
          nhsNumber: PropTypes.string,
        })).isRequired,
      allPatientsWithCounts: PropTypes.arrayOf(PropTypes.object).isRequired,
      panelTitle: PropTypes.string.isRequired,
      patientsPerPageAmount: PropTypes.number,
      dispatch: PropTypes.func,
      currentPagePatients: PropTypes.arrayOf(PropTypes.object),
      offset: PropTypes.number,
      actions: PropTypes.objectOf(PropTypes.func).isRequired,
      history: PropTypes.shape({
        push: PropTypes.funct,
      }).isRequired,
    };

    componentDidUpdate(prevProps) {
      if (this.props.offset !== prevProps.offset) {              
        const patientsOnFirstPageTitle = this.getPatientsOnPage();
        this.props.dispatch(setCurrentPagePatientsStart(patientsOnFirstPageTitle.patientsOnFirstPage));  
      } 
    }

    static contextTypes = {
      router: PropTypes.shape({
        history: PropTypes.object,
      }),
    };

    static defaultProps = {
      patientsPerPageAmount: 10,
      offset: -1,
      currentPagePatients: []
    };

    state = {
      columnNameSortBy: 'name',
      sortingOrder: 'asc',
      offset: -1,
      nameShouldInclude: '',
      selectedColumns: defaultColumnsSelected,
      patientPath: '',
      isDisclaimerModalVisible: false,
      openedDropdownID: null,
    };

    /* utils */
    getPatientsOnFirstPage = (patients) => {
      const { offset } = this.state;
      const { patientsPerPageAmount } = this.props;

      return (_.size(patients) > patientsPerPageAmount
        ? _.slice(offset, offset + patientsPerPageAmount)(patients)
        : patients)
    };

    componentWillMount() {
      document.addEventListener('click', this.handleNoDropdownClick, false);
      if (this.props.offset < 0) {
        this.handleSetOffset(0);
      }
    }

    componentWillUnmount() {
      document.removeEventListener('click', this.handleNoDropdownClick, false);
      this.props.dispatch(this.props.actions.setCurrentPageOffsetStart(-1));
      this.props.dispatch(setCurrentPagePatientsStart([]));      
    }

    handleNoDropdownClick = /* istanbul ignore next */ (e) => {
      const el = e.target;
      if (!((el.classList && el.classList.contains('patient-buttons')) ||
            (el.parentNode && el.parentNode.classList && el.parentNode.classList.contains('patient-buttons'))
      )) {
        this.onSetOpenedDropdownID(null);
      }
    };

    onSetOpenedDropdownID = (id) => {
      this.setState({ openedDropdownID: id });
    };

    addActionsColumn = _.map(patient => _.set('viewPatientNavigation', <ViewPatienDropdown patient={patient} onPatientViewClick={this.handlePatientViewClick} openedDropdownID={this.state.openedDropdownID} onSetOpenedDropdownID={this.onSetOpenedDropdownID} />, patient));

    /* handlers */
    handleHeaderCellClick = (e, { name, sortingOrder }) => this.setState({ columnNameSortBy: name, sortingOrder });

    handleSetOffset = (offset) => {
      this.setState({ offset });    
      this.props.dispatch(this.props.actions.setCurrentPageOffsetStart(offset));
    }

    shouldHavePagination = patients => _.size(patients) > this.props.patientsPerPageAmount;

    handleFilterChange = ({ target: { value } }) => this.setState({ nameShouldInclude: _.toLower(value) });

    handleColumnsSelected = /* istanbul ignore next */ selectedColumns => this.setState({ selectedColumns });

    handlePatientViewClick = /* istanbul ignore next */ (userId, candidatePluginName) => {
      //TODO move to util function, some conjunction & disjunction magic at 12 am
      const validPluginName = (_.includes(clientUrls.ORDERS, candidatePluginName) && clientUrls.ORDERS)
        || (_.includes(clientUrls.RESULTS, candidatePluginName) && clientUrls.RESULTS)
        || (_.includes(clientUrls.VITALS, candidatePluginName) && clientUrls.VITALS)
        || (_.includes(clientUrls.DIAGNOSES, candidatePluginName) && clientUrls.DIAGNOSES)
        || clientUrls.PATIENTS_SUMMARY;

      const path = `${clientUrls.PATIENTS}/${userId}/${validPluginName}`;
      this.setState({ patientPath: path, isDisclaimerModalVisible: true });
    };

    toggleDisclaimerModalVisible = /* istanbul ignore next */ () => this.setState(prevState => ({ isDisclaimerModalVisible: !prevState.isDisclaimerModalVisible }));

    formToShowCollection = (collection) => {
      const { columnNameSortBy, sortingOrder, nameShouldInclude } = this.state;

      collection = operationsOnCollection.modificate(collection, [
        { fn: getDDMMMYYYY, keyFrom: 'dateOfBirth', keyTo: 'dateOfBirthConvert' },
        { fn: getDDMMMYYYY, keyFrom: 'diagnosesDate', keyTo: 'diagnosesDateConvert' },
        { fn: getDDMMMYYYY, keyFrom: 'ordersDate', keyTo: 'ordersDateConvert' },
        { fn: getDDMMMYYYY, keyFrom: 'resultsDate', keyTo: 'resultsDateConvert' },
        { fn: getDDMMMYYYY, keyFrom: 'vitalsDate', keyTo: 'vitalsDateConvert' },
      ]);

      return operationsOnCollection.filterAndSort({
        collection,
        filterBy: nameShouldInclude,
        sortingByKey: columnNameSortBy,
        sortingByOrder: sortingOrder,
        filterKeys: [
          'name', 'address', 'dateOfBirthConvert', 'gender', 'id',
          'diagnosesCount', 'ordersCount', 'resultsCount', 'vitalsCount',
          'diagnosesDateConvert', 'ordersDateConvert', 'resultsDateConvert', 'vitalsDateConvert',
        ],
        modeSorting: {
          number: ['dateOfBirth'],
        },
      });
    };

    getPatientsOnPage = () => {
      const { router } = this.context;
      const { selectedColumns } = this.state;
      const { allPatientsWithCounts, panelTitle } = this.props;
      let filteredPatients;
      let titleForPanel;
      if (!_.isEmpty(router.history.location.state)) {
        const clinicalSearchData = router.history.location.state.data;
        const searchResult = router.history.location.state.searchResult;
        filteredPatients = this.formToShowCollection(clinicalSearchData);
        titleForPanel = `Patient Info ${searchResult}`
      } else {
        filteredPatients = this.formToShowCollection(allPatientsWithCounts);
        titleForPanel = panelTitle;
      }
      return {filteredPatients: filteredPatients, titleForPanel: titleForPanel, patientsOnFirstPage: _.flow(this.getPatientsOnFirstPage, this.addActionsColumn)(filteredPatients) };
    }

    render() {
      const { allPatients, allPatientsWithCounts, patientsPerPageAmount, panelTitle, history, offset } = this.props;
      const { selectedColumns, patientPath, isDisclaimerModalVisible, columnNameSortBy, sortingOrder } = this.state;
      const { router } = this.context;

      const columnsToShowConfig = patientsColumnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);

      const patientsOnFirstPageTitle =  this.getPatientsOnPage();
      const titleForPanel = patientsOnFirstPageTitle.titleForPanel;
      const filteredPatients = patientsOnFirstPageTitle.filteredPatients;
      const patientsOnFirstPage = patientsOnFirstPageTitle.patientsOnFirstPage;
      if (_.isEmpty(this.props.currentPagePatients) && !_.isEmpty(patientsOnFirstPage)) {
        this.props.dispatch(setCurrentPagePatientsStart(patientsOnFirstPage));
      }

      return (
        <div className="patients-list">
          <div className="panel panel-primary">
            <PatientsListHeader
              onFilterChange={this.handleFilterChange}
              onColumnsSelected={this.handleColumnsSelected}
              selectedColumns={selectedColumns}
              panelTitle={titleForPanel}
            />
            <div className="panel-body">
              <div className="wrap-patients-table">
                <SortableTablePatients
                  headers={columnsToShowConfig}
                  data={patientsOnFirstPage}
                  resourceData={allPatients}
                  emptyDataMessage="No patients found"
                  onHeaderCellClick={this.handleHeaderCellClick}
                  onCellClick={this.handlePatientViewClick}
                  columnNameSortBy={columnNameSortBy}
                  sortingOrder={sortingOrder}
                  table="patientsList"
                />
              </div>
              {this.shouldHavePagination(filteredPatients) &&
              <div className="control-group with-indent center">
                <PaginationBlock
                  entriesPerPage={patientsPerPageAmount}
                  totalEntriesAmount={_.size(filteredPatients)}
                  offset={offset}
                  setOffset={this.handleSetOffset}
                />
              </div>
              }
            </div>
            {isDisclaimerModalVisible && <PatientAccessDisclaimerModal
              onClose={this.toggleDisclaimerModalVisible}
              onAgreeRedirectTo={patientPath}
              history={history}
              isVisible={isDisclaimerModalVisible}
            />}
          </div>
        </div>)
    }
}
