import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { Row, Col, Panel } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';

import SortableTable from '../../containers/SortableTable/SortableTable';
import patientsSelector from './selectors';
import { fetchPatientsRequest } from '../../../ducks/feth-patients.duck';
import { fetchPatientsOnMount } from '../../../utils/hoc-arguments/fetch-patients.utils';
import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';

const allTableHeaders = [
  { name: 'name', title: 'Name' },
  { name: 'address', title: 'Address' },
  { name: 'dateOfBirth', title: 'Born', transformer: getDDMMMYYYY },
  { name: 'gender', title: 'Gender' },
  { name: 'id', title: 'NHS No.' },
  { name: 'ordersDate', title: 'Orders', icon: <i className="fa fa-calendar" />, transformer: getDDMMMYYYY },
  { name: 'ordersCount', title: 'Orders ', icon: <span>#</span> },
  { name: 'resultsDate', title: 'Results', icon: <i className="fa fa-calendar" />, transformer: getDDMMMYYYY },
  { name: 'resultsCount', title: 'Results ', icon: <span>#</span> },
  { name: 'vitalsDate', title: 'Count', icon: <i className="fa fa-calendar" /> },
  { name: 'vitalsCount', title: 'Count ', icon: <span>#</span> },
  { name: 'diagnosesDate', title: 'Diagnoses', icon: <i className="fa fa-calendar" />, transformer: getDDMMMYYYY },
  { name: 'diagnosesCount', title: 'Diagnoses ', icon: <span>#</span> },
];

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientsRequest }, dispatch) });

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
    patientsPerPageAmount: PropTypes.number,
  };

  static defaultProps = {
    patientsPerPageAmount: 10,
  }

  render() {
    const { allPatients, patientsPerPageAmount } = this.props;

    return (<section className="page-wrapper">
      <Row>
        <Col xs={12}>
          <Panel>
            <article className="wrap-patients-table">
              <SortableTable
                headers={allTableHeaders}
                data={_.take(patientsPerPageAmount, allPatients)}
              />
            </article>
          </Panel>
        </Col>
      </Row>
    </section>)
  }
}

export default PatientsLists;
