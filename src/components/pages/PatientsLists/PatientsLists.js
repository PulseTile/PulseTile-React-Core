import React, { PureComponent } from 'react';
import { Row, Col, Panel } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';

import SortableTable from '../../containers/SortableTable/SortableTable';
import patientsSelector from './selectors';
import { fetchPatientsRequest } from '../../../ducks/feth-patients.duck';
import { fetchPatientsOnMount } from '../../../utils/hoc-arguments/fetch-patients.utils';

const tableHeaders = [
  { name: 'name', title: 'Name' },
  { name: 'address', title: 'Address' },
  { name: 'dateOfBirth', title: 'Born' },
  { name: 'gender', title: 'Gender' },
  { name: 'id', title: 'NHS No.' },
  { name: 'ordersDate', title: 'Orders', icon: <i className="fa fa-calendar" /> },
  { name: 'ordersCount', title: 'Orders ', icon: <span>#</span> },
  { name: 'resultsDate', title: 'Results', icon: <i className="fa fa-calendar" /> },
  { name: 'resultsCount', title: 'Results ', icon: <span>#</span> },
  { name: 'vitalsDate', title: 'Count', icon: <i className="fa fa-calendar" /> },
  { name: 'vitalsCount', title: 'Count ', icon: <span>#</span> },
  { name: 'diagnosesDate', title: 'Diagnoses', icon: <i className="fa fa-calendar" /> },
  { name: 'diagnosesCount', title: 'Diagnoses ', icon: <span>#</span> },
];

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientsRequest }, dispatch) });

@connect(patientsSelector, mapDispatchToProps)
@lifecycle(fetchPatientsOnMount)
class PatientsLists extends PureComponent {
  render() {
    return (<section className="page-wrapper">
      <Row>
        <Col xs={12}>
          <Panel>
            <article className="wrap-patients-table">
              <SortableTable headers={tableHeaders}/>
            </article>
          </Panel>
        </Col>
      </Row>
    </section>)
  }
}

export default PatientsLists;
