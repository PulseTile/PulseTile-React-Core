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
    };

    /* utils */
    getPatientsOnFirstPage = (patients) => {
      const { offset } = this.state;
      const { patientsPerPageAmount } = this.props;

      return (_.size(patients) > patientsPerPageAmount
        ? _.slice(offset, offset + patientsPerPageAmount)(patients)
        : patients)
    };

    filterAndSortPatients = (patients) => {
      const { columnNameSortBy, sortingOrder, nameShouldInclude } = this.state;
      const filterByNamePredicate = _.flow(_.get('name'), _.toLower, _.includes(nameShouldInclude));
      const filterByAddressPredicate = _.flow(_.get('address'), _.toLower, _.includes(nameShouldInclude));
      const filterByBornPredicate = _.flow(_.get('dateOfBirth'), _.toLower, _.includes(nameShouldInclude));
      const filterByGenderPredicate = _.flow(_.get('gender'), _.toLower, _.includes(nameShouldInclude));
      const filterByNHSPredicate = _.flow(_.get('id'), _.toLower, _.includes(nameShouldInclude));

      const reverseIfDescOrder = _.cond([
        [_.isEqual('desc'), () => _.reverse],
        [_.stubTrue, () => v => v],
      ])(sortingOrder);

      patients.map((item) => {
        item.dateOfBirth = getDDMMMYYYY(item.dateOfBirth);
      });

      const filterByName = _.flow(_.sortBy([columnNameSortBy]), reverseIfDescOrder, _.filter(filterByNamePredicate))(patients);
      const filterByAddress = _.flow(_.sortBy([columnNameSortBy]), reverseIfDescOrder, _.filter(filterByAddressPredicate))(patients);
      const filterByBorn = _.flow(_.sortBy([columnNameSortBy]), reverseIfDescOrder, _.filter(filterByBornPredicate))(patients);
      const filterByGender = _.flow(_.sortBy([columnNameSortBy]), reverseIfDescOrder, _.filter(filterByGenderPredicate))(patients);
      const filterByNHS = _.flow(_.sortBy([columnNameSortBy]), reverseIfDescOrder, _.filter(filterByNHSPredicate))(patients);

      const filteredAndSortedPatients = [filterByName, filterByAddress, filterByBorn, filterByGender, filterByNHS].filter((item) => {
        return _.size(item) !== 0;
      });

      return _.head(filteredAndSortedPatients)
    };

    addActionsColumn = _.map(patient => _.set('viewPatientNavigation', <ViewPatienDropdown patient={patient} onPatientViewClick={this.handlePatientViewClick} />, patient));

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

    render() {
      const { allPatients, allPatientsWithCounts, patientsPerPageAmount, panelTitle, history } = this.props;
      const { offset, selectedColumns, patientPath, isDisclaimerModalVisible, columnNameSortBy, sortingOrder } = this.state;

      const columnsToShowConfig = patientsColumnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);

      const filteredPatients = this.filterAndSortPatients(allPatientsWithCounts);
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
                totalEntriesAmount={_.size(allPatients)}
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
