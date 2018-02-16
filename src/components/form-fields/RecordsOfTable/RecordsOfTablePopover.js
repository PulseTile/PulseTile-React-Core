import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Spinner from '../../ui-elements/Spinner/Spinner';
import RecordsOfTablePopoverDiagnosis from './RecordsOfTablePopoverDiagnosis';
import RecordsOfTablePopoverMedications from './RecordsOfTablePopoverMedications';
import RecordsOfTablePopoverReferrals from './RecordsOfTablePopoverReferrals';
import RecordsOfTablePopoverEvents from './RecordsOfTablePopoverEvents';
import RecordsOfTablePopoverVitals from './RecordsOfTablePopoverVitals';
import RecordsOfTablePopoverProcedures from './RecordsOfTablePopoverProcedures';


import { fetchPatientDiagnosesDetailRequest } from '../../pages/ProblemsDiagnosis/ducks/fetch-patient-diagnoses-detail.duck';
import { fetchPatientMedicationsDetailRequest } from '../../pages/Medications/ducks/fetch-patient-medications-detail.duck';
import { fetchPatientReferralsDetailRequest } from '../../pages/Referrals/ducks/fetch-patient-referrals-detail.duck';
import { fetchPatientEventsDetailRequest } from '../../pages/Events/ducks/fetch-patient-events-detail.duck';
import { fetchPatientVitalsDetailRequest } from '../../pages/Vitals/ducks/fetch-patient-vitals-detail.duck';
import { fetchPatientProceduresDetailRequest } from '../../pages/Procedures/ducks/fetch-patient-procedures-detail.duck';

import { patientDiagnosesDetailSelector } from '../../pages/ProblemsDiagnosis/selectors';
import { patientMedicationsDetailSelector } from '../../pages/Medications/selectors';
import { patientReferralsDetailSelector } from '../../pages/Referrals/selectors';
import { patientEventsDetailSelector } from '../../pages/Events/selectors';
import { patientVitalsDetailSelector } from '../../pages/Vitals/selectors';
import { patientProceduresDetailSelector } from '../../pages/Procedures/selectors';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchPatientDiagnosesDetailRequest,
    fetchPatientMedicationsDetailRequest,
    fetchPatientReferralsDetailRequest,
    fetchPatientEventsDetailRequest,
    fetchPatientVitalsDetailRequest,
    fetchPatientProceduresDetailRequest,
  }, dispatch) });

@connect(patientDiagnosesDetailSelector, mapDispatchToProps)
@connect(patientMedicationsDetailSelector)
@connect(patientReferralsDetailSelector)
@connect(patientEventsDetailSelector)
@connect(patientVitalsDetailSelector)
@connect(patientProceduresDetailSelector)
export default class RecordsOfTablePopover extends PureComponent {
  static propTypes = {
    record: PropTypes.object,
  };

  state = {
    typesRecords: {
      diagnosis: {
        title: 'Problems / Diagnosis',
        fetchDetail: 'fetchPatientDiagnosesDetailRequest',
        stateName: 'diagnosisDetail',
      },
      medications: {
        title: 'Medications',
        fetchDetail: 'fetchPatientMedicationsDetailRequest',
        stateName: 'medicationDetail',
      },
      referrals: {
        title: 'Referrals',
        fetchDetail: 'fetchPatientReferralsDetailRequest',
        stateName: 'referralDetail',
      },
      events: {
        title: 'Events',
        fetchDetail: 'fetchPatientEventsDetailRequest',
        stateName: 'eventDetail',
      },
      vitals: {
        title: 'Vitals',
        fetchDetail: 'fetchPatientVitalsDetailRequest',
        stateName: 'vitalDetail',
      },
      procedures: {
        title: 'Procedures',
        fetchDetail: 'fetchPatientProceduresDetailRequest',
        stateName: 'procedureDetail',
      },
    },

    sourceId: '',
  };

  componentDidMount() {
    const { actions, match, record: { type, sourceId } } = this.props;
    const { typesRecords } = this.state;
    const userId = _.get('params.userId', match);
    const fetchRequest = typesRecords[type] ? typesRecords[type].fetchDetail : '';


    if (fetchRequest && userId && sourceId) {
      this.setState({ sourceId });
      actions[fetchRequest]({ userId, sourceId })
    }
  }

  render() {
    const { record: { type: typeOfRecord } } = this.props;
    const { typesRecords, sourceId } = this.state;
    let title = '';
    let detail = null;
    if (typesRecords[typeOfRecord]) {
      title = typesRecords[typeOfRecord].title;
      detail = this.props[typesRecords[typeOfRecord].stateName] || null;
    }

    return (
      <div className="record-popover" style={{ display: 'block' }}>
        <div className="record-popover-header">
          <div className="record-popover-title">{title}</div>
        </div>
        <div className="record-popover-body">
          <div className="record-popover-content">
            {!detail || detail.sourceId !== sourceId ? <Spinner /> : null }
            {typeOfRecord === 'diagnosis' ? <RecordsOfTablePopoverDiagnosis detail={detail} /> : null}
            {typeOfRecord === 'medications' ? <RecordsOfTablePopoverMedications detail={detail} /> : null}
            {typeOfRecord === 'referrals' ? <RecordsOfTablePopoverReferrals detail={detail} /> : null}
            {typeOfRecord === 'events' ? <RecordsOfTablePopoverEvents detail={detail} /> : null}
            {typeOfRecord === 'vitals' ? <RecordsOfTablePopoverVitals detail={detail} /> : null}
            {typeOfRecord === 'procedures' ? <RecordsOfTablePopoverProcedures detail={detail} /> : null}
          </div>
        </div>
      </div>
    )
  }
}
