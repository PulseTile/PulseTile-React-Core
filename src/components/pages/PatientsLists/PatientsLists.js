import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { Row, Col } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';

import SortableTable from '../../containers/SortableTable/SortableTable';
import PaginationBlock from '../../presentational/PaginationBlock/PaginationBlock';
import PatientsListHeader from './PatientsListHeader';
import PTButton from '../../ui-elements/PTButton/PTButton';
import patientsSelector from './selectors';
import { fetchPatientsRequest } from '../../../ducks/feth-patients.duck';
import { fetchPatientCountsRequest } from '../../../ducks/fetch-patient-counts.duck'
import { fetchPatientsOnMount } from '../../../utils/hoc-arguments/fetch-patients.utils';
import { patientsColumnsConfig } from './patients-table-columns.config'

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
  };

  componentDidMount() {
    this.fetchPatientCounts()(this.props.allPatients);
  }

  componentWillUpdate({ allPatients }, nextState) {
    const isNewPatients = _.negate(_.isEqual(this.props.allPatients));
    _.cond([
      [isNewPatients, this.fetchPatientCounts(0, _.size(allPatients))],
    ])(allPatients)
  }

  fetchPatientCounts = (offset = 0, limit = this.props.patientsPerPageAmount) => _.flow(_.slice(offset, offset + limit), this.props.actions.fetchPatientCountsRequest);

  handleHeaderCellClick = (e, { name, sortingOrder }) => this.setState({ columnNameSortBy: name, sortingOrder });

  handleSetOffset = offset => this.setState({ offset });

  havePagination = () => _.size(this.props.allPatients) > this.props.patientsPerPageAmount;

  handleFilterChange = ({ target: { value } }) => this.setState({ nameShouldInclude: _.toLower(value) });

  render() {
    const { allPatients, allPatientsWithCounts, patientsPerPageAmount } = this.props;
    const { columnNameSortBy, sortingOrder, offset, nameShouldInclude } = this.state;
    const filterByNamePredicate = _.flow(_.get('name'), _.toLower, _.includes(nameShouldInclude));
    const data = _.flow(
      _.sortBy([columnNameSortBy]),
      _.cond([
        [_.isEqual('desc'), () => _.reverse],
        [_.stubTrue, () => v => v],
      ])(sortingOrder),
      _.filter(filterByNamePredicate),
      _.slice(offset, offset + patientsPerPageAmount)
    )(allPatientsWithCounts);

    return (<section className="page-wrapper">
      <Row>
        <Col xs={12}>
          {/*//TODO use <PTPanel/>*/}
          <div className="panel panel-primary">
            <PatientsListHeader
              onFilterChange={this.handleFilterChange}
            />
            <div className="panel-body">
              <div className="wrap-patients-table">
                <SortableTable
                  headers={patientsColumnsConfig}
                  data={data}
                  onHeaderCellClick={this.handleHeaderCellClick}
                />
              </div>
              {this.havePagination() &&
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
