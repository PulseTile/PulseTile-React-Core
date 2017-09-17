import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';

import SimpleDashboardPanel from './SimpleDashboardPanel';
import patientSummarySelector from './selectors';
import { fetchPatientSummaryRequest } from '../../../ducks/fetch-patient-summary.duck';
import { fetchPatientSummaryOnMount } from '../../../utils/HOCs/fetch-patients.utils';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientSummaryRequest }, dispatch) });

@connect(patientSummarySelector, mapDispatchToProps)
@lifecycle(fetchPatientSummaryOnMount)
export default class PatientsSummary extends PureComponent {
    static propTypes = {
      allergies: PropTypes.arrayOf(PropTypes.string).isRequired,
      contacts: PropTypes.arrayOf(PropTypes.string).isRequired,
      problems: PropTypes.arrayOf(PropTypes.string).isRequired,
      medications: PropTypes.arrayOf(PropTypes.string).isRequired,
    };

    render() {
      const { allergies, contacts, problems, medications } = this.props;

      return (<section className="page-wrapper">
        <Row>
          <Col xs={12}>
            <div className="panel panel-primary">
              <div className="panel-heading">
                <div className="control-group left dropdown">
                  <button className="btn btn-success btn-inverse btn-dropdown-toggle open"><i className="btn-icon fa fa-cog" /></button>
                </div>
                <h3 className="panel-title">Patient Summary</h3>
              </div>
              <div className="panel-body">
                <div className="dashboard">
                  <SimpleDashboardPanel title="Problems" items={problems} navigateTo={console.log} />
                  <SimpleDashboardPanel title="Contacts" items={contacts} navigateTo={console.log} />
                  <SimpleDashboardPanel title="Allergies" items={allergies} navigateTo={console.log} />
                  <SimpleDashboardPanel title="Medications" items={medications} navigateTo={console.log} />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </section>)
    }
}
