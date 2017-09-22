import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';

import SimpleDashboardPanel from './SimpleDashboardPanel';
import PatientsSummaryListHeader from './header/PatientsSummaryListHeader';
import patientSummarySelector from './selectors';
import { patientsSummaryConfig, defaultCategorySelected } from '../../../config/patients-summary.config';
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

    state = {
      selectedCategory: defaultCategorySelected,
    };

    handleCategorySelected = selectedCategory => this.setState({ selectedCategory });

    render() {
      const { allergies, contacts, problems, medications } = this.props;
      const { selectedCategory } = this.state;

      return (<section className="page-wrapper">
        <Row>
          <Col xs={12}>
            <div className="panel panel-primary">
              <PatientsSummaryListHeader
                onCategorySelected={this.handleCategorySelected}
                selectedCategory={selectedCategory}
              />
              <div className="panel-body">
                <div className="dashboard">
                  {selectedCategory.problems ? <SimpleDashboardPanel title="Problems" items={problems} navigateTo={console.log} /> : null}
                  {selectedCategory.contacts ? <SimpleDashboardPanel title="Contacts" items={contacts} navigateTo={console.log} /> : null}
                  {selectedCategory.allergies ? <SimpleDashboardPanel title="Allergies" items={allergies} navigateTo={console.log} /> : null}
                  {selectedCategory.medications ? <SimpleDashboardPanel title="Medications" items={medications} navigateTo={console.log} /> : null}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </section>)
    }
}
