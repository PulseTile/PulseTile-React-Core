import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';

import SortableTablePatients from '../SortableTable/SortableTablePatients';
import PaginationBlock from '../../presentational/PaginationBlock/PaginationBlock';
import PatientsListHeader from './header/PatientsListHeader';
import ViewPatienDropdown from './actions-column/ViewPatienDropdown';
import PatientAccessDisclaimerModal from './PatientAccessDisclaimerModal';
import { patientsColumnsConfig, defaultColumnsSelected } from '../../../config/patients-table-columns.config'
import { clientUrls } from '../../../config/client-urls.constants';
import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';
import { operationsOnCollection } from '../../../utils/plugin-helpers.utils';

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
      actions: PropTypes.objectOf(PropTypes.func).isRequired,
      history: PropTypes.shape({
        push: PropTypes.funct,
      }).isRequired,
    };

    static defaultProps = {
      patientsPerPageAmount: 10,
    };

    state = {
      columnNameSortBy: 'name',
      sortingOrder: 'asc',
      offset: 0,
      nameShouldInclude: '',
      selectedColumns: defaultColumnsSelected,
      patientPath: '',
      isDisclaimerModalVisible: false,
      openedDropdownID: null
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
    }

    componentWillUnmount() {
      document.removeEventListener('click', this.handleNoDropdownClick, false);
    }

    handleNoDropdownClick = (e) => {
      if (!(e.target.classList.contains('patient-buttons') ||
            e.target.parentNode.classList.contains('patient-buttons'))) {
        console.log('handleNoDropdownClick');
        this.onSetOpenedDropdownID(null);
      }
    };

    onSetOpenedDropdownID = (id) => {
      this.setState({ openedDropdownID: id });
    };

    addActionsColumn = _.map(patient => _.set('viewPatientNavigation', <ViewPatienDropdown patient={patient} onPatientViewClick={this.handlePatientViewClick} openedDropdownID={this.state.openedDropdownID} onSetOpenedDropdownID={this.onSetOpenedDropdownID} />, patient));

    /* handlers */
    handleHeaderCellClick = (e, { name, sortingOrder }) => this.setState({ columnNameSortBy: name, sortingOrder });

    handleSetOffset = offset => this.setState({ offset });

    shouldHavePagination = patients => _.size(patients) > this.props.patientsPerPageAmount;

    handleFilterChange = ({ target: { value } }) => this.setState({ nameShouldInclude: _.toLower(value) });

    handleColumnsSelected = selectedColumns => this.setState({ selectedColumns });

    handlePatientViewClick = (userId, candidatePluginName) => {
      //TODO move to util function, some conjunction & disjunction magic at 12 am
      const validPluginName = (_.includes(clientUrls.ORDERS, candidatePluginName) && clientUrls.ORDERS)
        || (_.includes(clientUrls.RESULTS, candidatePluginName) && clientUrls.RESULTS)
        || (_.includes(clientUrls.VITALS, candidatePluginName) && clientUrls.VITALS)
        || (_.includes(clientUrls.DIAGNOSES, candidatePluginName) && clientUrls.DIAGNOSES)
        || clientUrls.PATIENTS_SUMMARY;

      const path = `${clientUrls.PATIENTS}/${userId}/${validPluginName}`;
      this.setState({ patientPath: path, isDisclaimerModalVisible: true });
    };

    toggleDisclaimerModalVisible = () => this.setState(prevState => ({ isDisclaimerModalVisible: !prevState.isDisclaimerModalVisible }));

    formToShowCollection = (collection) => {
      const {columnNameSortBy, sortingOrder, nameShouldInclude} = this.state;

      collection = operationsOnCollection.modificate(collection, [
        { fn: getDDMMMYYYY, keyFrom: 'dateOfBirth',   keyTo: 'dateOfBirthConvert' },
        { fn: getDDMMMYYYY, keyFrom: 'diagnosesDate', keyTo: 'diagnosesDateConvert' },
        { fn: getDDMMMYYYY, keyFrom: 'ordersDate',    keyTo: 'ordersDateConvert' },
        { fn: getDDMMMYYYY, keyFrom: 'resultsDate',   keyTo: 'resultsDateConvert' },
        { fn: getDDMMMYYYY, keyFrom: 'vitalsDate',    keyTo: 'vitalsDateConvert' },
      ]);

      return operationsOnCollection.filterAndSort({
        collection: collection,
        filterBy: nameShouldInclude,
        sortingByKey: columnNameSortBy,
        sortingByOrder: sortingOrder,
        filterKeys: [
          'name', 'address', 'dateOfBirthConvert', 'gender', 'id',
          'diagnosesCount', 'ordersCount', 'resultsCount', 'vitalsCount',
          'diagnosesDateConvert', 'ordersDateConvert', 'resultsDateConvert', 'vitalsDateConvert'
        ]
      });
    };

    render() {
      const { allPatients, allPatientsWithCounts, patientsPerPageAmount, panelTitle, history } = this.props;
      const { offset, selectedColumns, patientPath, isDisclaimerModalVisible, columnNameSortBy, sortingOrder } = this.state;

      const columnsToShowConfig = patientsColumnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);

      const filteredPatients = this.formToShowCollection(allPatientsWithCounts);
      const patientsOnFirstPage = _.flow(this.getPatientsOnFirstPage, this.addActionsColumn)(filteredPatients);

      //TODO use <PTPanel/>
      return (
        <div className="panel panel-primary">
          <PatientsListHeader
            onFilterChange={this.handleFilterChange}
            onColumnsSelected={this.handleColumnsSelected}
            selectedColumns={selectedColumns}
            panelTitle={panelTitle}
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
        </div>)
    }
}
