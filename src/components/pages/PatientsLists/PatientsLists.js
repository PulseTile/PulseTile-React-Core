import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import qs from 'qs';
import { Row, Col } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';

import SortableTable from '../../containers/SortableTable/SortableTable';
import PaginationBlock from '../../presentational/PaginationBlock/PaginationBlock';
import PatientsListHeader from './header/PatientsListHeader';
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

  handleHeaderCellClick = (e, { name, sortingOrder }) => this.setState({ columnNameSortBy: name, sortingOrder });

  handleSetOffset = offset => this.setState({ offset });

  shouldHavePagination = patients => _.size(patients) > this.props.patientsPerPageAmount;

  handleFilterChange = ({ target: { value } }) => this.setState({ nameShouldInclude: _.toLower(value) });

  handleColumnsSelected = selectedColumns => this.setState({ selectedColumns });

  render() {
    const { allPatients, allPatientsWithCounts, patientsPerPageAmount, panelTitle } = this.props;
    const { offset, selectedColumns } = this.state;

    const columnsToShowConfig = patientsColumnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);
    const filteredPatients = this.filterAndSortPatients(allPatientsWithCounts);
    const patientsOnFirstPage = _.slice(offset, offset + patientsPerPageAmount)(filteredPatients);

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
    </section>)
  }
}

export default PatientsLists;
