import React, { PureComponent } from 'react';
import { Row, Col } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import PatientsList from '../../containers/PatientsList/PatientsList';
import patientsSelector from './selectors';
import { fetchBasicPatientSearchRequest } from '../../../ducks/fetch-basic-patient-search.duck';
import { fetchPatientCountsRequest } from '../../../ducks/fetch-patient-counts.duck'
import { fetchPatientsCountsOnMountAndUpdate } from '../../../utils/HOCs/fetch-patients.utils';
import { fetchPatientOnSearch } from '../../../utils/HOCs/fetch-patient-on-search.utils';
import { fetchAdvancedPatientSearchRequest } from '../../../ducks/fetch-advanced-patient-search.duck';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchBasicPatientSearchRequest, fetchAdvancedPatientSearchRequest, fetchPatientCountsRequest }, dispatch) });

@connect(patientsSelector, mapDispatchToProps)
@compose(lifecycle(fetchPatientOnSearch), lifecycle(fetchPatientsCountsOnMountAndUpdate))
class PatientsFullDetailsSearch extends PureComponent {
  render() {
    return (<section className="page-wrapper">
      <Row>
        <Col xs={12}>
          <PatientsList {...this.props} />
        </Col>
      </Row>
    </section>)
  }
}

export default PatientsFullDetailsSearch;
