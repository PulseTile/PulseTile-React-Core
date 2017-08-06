import React from 'react';
import { Row, Col } from 'react-bootstrap';

import PTPanel from '../../presentational/PTPanel/PTPanel';
import PatientsChart from '../../containers/PatientsChart/PatientsChart';

const SystemDashboard = props => <section className="page-wrapper">
  <Row>
    <Col xs={12}>
      <PTPanel header={<h3 className="panel-title"><i className="fa fa-bar-chart" /> Patients By Settings</h3>}>
        <PatientsChart />
      </PTPanel>
      <PTPanel header={<h3 className="panel-title"><i className="fa fa-bar-chart" /> Patients By Age</h3>}>
        <PatientsChart />
      </PTPanel>
    </Col>
  </Row>
</section>;

export default SystemDashboard;
