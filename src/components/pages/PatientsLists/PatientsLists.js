import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { Row, Col } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';

import SortableTable from '../../containers/SortableTable/SortableTable';
import PaginationBlock from '../../presentational/PaginationBlock/PaginationBlock';
import PatientsListHeader from './header/PatientsListHeader';
import ViewPatienDropdown from './actions-column/ViewPatienDropdown';
import PatientAccessDisclaimerModal from './PatientAccessDisclaimerModal';
import patientsSelector from './selectors';
import { fetchPatientsRequest } from '../../../ducks/feth-patients.duck';
import { fetchPatientCountsRequest } from '../../../ducks/fetch-patient-counts.duck'
import { fetchPatientsOnMount } from '../../../utils/HOCs/fetch-patients.utils';
import { patientsColumnsConfig, defaultColumnsSelected } from './patients-table-columns.config'

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientsRequest, fetchPatientCountsRequest }, dispatch) });

@connect(patientsSelector, mapDispatchToProps)
@lifecycle(fetchPatientsOnMount)
class PatientsLists extends PureComponent {
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
  };

  static defaultProps = {
    patientsPerPageAmount: 10,
  };

  state = {
    columnNameSortBy: '',
    sortingOrder: null,
    offset: 0,
    nameShouldInclude: '',
    selectedColumns: defaultColumnsSelected,
    patientPath: '',
    isDisclaimerModalVisible: false,
  };

  componentDidMount() {
    const { allPatients, actions } = this.props;
    actions.fetchPatientCountsRequest(allPatients);
  }

  componentWillUpdate({ allPatients, actions }) {
    const isNewPatients = _.negate(_.isEqual(this.props.allPatients));
    return _.cond([
      [isNewPatients, actions.fetchPatientCountsRequest],
    ])(allPatients)
  }

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
    const reverseIfDescOrder = _.cond([
      [_.isEqual('desc'), () => _.reverse],
      [_.stubTrue, () => v => v],
    ])(sortingOrder);

    return _.flow(
      _.sortBy([columnNameSortBy]),
      reverseIfDescOrder,
      _.filter(filterByNamePredicate)
    )(patients);
  };

  addActionsColumn = _.map(patient => _.set('viewPatientNavigation', <ViewPatienDropdown patient={patient} onPatientViewClick={this.handlePatientViewClick} />, patient));

  /* handlers */
  handleHeaderCellClick = (e, { name, sortingOrder }) => this.setState({ columnNameSortBy: name, sortingOrder });

  handleSetOffset = offset => this.setState({ offset });

  shouldHavePagination = patients => _.size(patients) > this.props.patientsPerPageAmount;

  handleFilterChange = ({ target: { value } }) => this.setState({ nameShouldInclude: _.toLower(value) });

  handleColumnsSelected = selectedColumns => this.setState({ selectedColumns });

  handlePatientViewClick = path => this.setState({ patientPath: path, isDisclaimerModalVisible: true });

  toggleDisclaimerModalVisible = () => this.setState(prevState => ({ isDisclaimerModalVisible: !prevState.isDisclaimerModalVisible }));

  render() {
    const { allPatients, allPatientsWithCounts, patientsPerPageAmount, panelTitle, history } = this.props;
    const { offset, selectedColumns, patientPath, isDisclaimerModalVisible } = this.state;

    const columnsToShowConfig = patientsColumnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);

    const filteredPatients = this.filterAndSortPatients(allPatientsWithCounts);
    const patientsOnFirstPage = _.flow(this.getPatientsOnFirstPage, this.addActionsColumn)(filteredPatients);

    return (<section className="page-wrapper">
      <Row>
        <Col xs={12}>
          {/*//TODO use <PTPanel/>*/}
          <div className="panel panel-primary">
            <PatientsListHeader
              onFilterChange={this.handleFilterChange}
              onColumnsSelected={this.handleColumnsSelected}
              selectedColumns={selectedColumns}
              panelTitle={panelTitle}
            />
            <div className="panel-body">
              <div className="wrap-patients-table">
                <SortableTable
                  headers={columnsToShowConfig}
                  data={patientsOnFirstPage}
                  onHeaderCellClick={this.handleHeaderCellClick}
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
          </div>
        </Col>
      </Row>
      {isDisclaimerModalVisible && <PatientAccessDisclaimerModal onClose={this.toggleDisclaimerModalVisible} onAgreeRedirectTo={patientPath} history={history} />}
    </section>)
  }
}

export default PatientsLists;
