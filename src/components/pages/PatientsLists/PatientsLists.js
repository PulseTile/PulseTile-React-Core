import React, { PureComponent } from 'react';
import { Row, Col } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import PatientsList from '../../containers/PatientsList/PatientsList';
import patientsSelector from './selectors';
import { fetchPatientsRequest } from '../../../ducks/feth-patients.duck';
import { fetchPatientCountsRequest } from '../../../ducks/fetch-patient-counts.duck'
import { setCurrentPageOffsetStart } from '../../../ducks/set-current-page-offset.duck'
import { fetchPatientsOnMount, fetchPatientsCountsOnMountAndUpdate } from '../../../utils/HOCs/fetch-patients.utils';

const mapDispatchToProps = dispatch => ({dispatch, actions: bindActionCreators({ fetchPatientsRequest, fetchPatientCountsRequest, setCurrentPageOffsetStart }, dispatch) });

@connect(patientsSelector, mapDispatchToProps)
@compose(lifecycle(fetchPatientsOnMount), lifecycle(fetchPatientsCountsOnMountAndUpdate))
class PatientsLists extends PureComponent {
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

export default PatientsLists;
