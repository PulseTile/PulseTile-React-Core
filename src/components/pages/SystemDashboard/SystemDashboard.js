import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';
import { Row, Col } from 'react-bootstrap';

import PTPanel from '../../presentational/PTPanel/PTPanel';
import PatientsChart from '../../containers/PatientsChart/PatientsChart';
import patientsSelector from './selectors';
import { fetchPatientsRequest } from '../../../ducks/feth-patients.duck';

const fetchPatientsOnMount = ({
  componentDidMount() {
    this.props.actions.fetchPatientsRequest()
  },
});

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientsRequest }, dispatch) });

@connect(patientsSelector, mapDispatchToProps)
@lifecycle(fetchPatientsOnMount)
export default class SystemDashboard extends PureComponent {
  render() {
    return (
      <section className="page-wrapper">
        <Row>
          <Col xs={12}>
            <PTPanel header={<h3 className="panel-title"><i className="fa fa-bar-chart" /> Patients By Settings</h3>}>
              <PatientsChart
                title="Patients By Setting"
                subTitle="This is a brief description of patients by setting."
              />
            </PTPanel>
            <PTPanel header={<h3 className="panel-title"><i className="fa fa-bar-chart" /> Patients By Age</h3>}>
              <PatientsChart
                title="Patients By Age"
                subTitle="This is a brief description of patients by age."
              />
            </PTPanel>
          </Col>
        </Row>
      </section>)
  }
}
