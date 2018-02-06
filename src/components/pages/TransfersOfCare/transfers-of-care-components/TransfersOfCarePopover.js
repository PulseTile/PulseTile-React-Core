import React, { PureComponent } from 'react';
import PropTypes from "prop-types";
import _ from "lodash/fp";
import { connect } from "react-redux";
import Spinner from '../../../ui-elements/Spinner/Spinner';
import TransfersOfCarePopoverDiagnosis from './TransfersOfCarePopoverDiagnosis';
import TransfersOfCarePopoverMedications from './TransfersOfCarePopoverMedications';
import TransfersOfCarePopoverReferrals from './TransfersOfCarePopoverReferrals';
import TransfersOfCarePopoverEvents from './TransfersOfCarePopoverEvents';
import TransfersOfCarePopoverVitals from './TransfersOfCarePopoverVitals';

import { bindActionCreators } from "redux";
import { fetchPatientDiagnosesDetailRequest } from '../../ProblemsDiagnosis/ducks/fetch-patient-diagnoses-detail.duck';
import { fetchPatientMedicationsDetailRequest} from '../../Medications/ducks/fetch-patient-medications-detail.duck';
import { fetchPatientReferralsDetailRequest} from '../../Referrals/ducks/fetch-patient-referrals-detail.duck';
import { fetchPatientEventsDetailRequest} from '../../Events/ducks/fetch-patient-events-detail.duck';
import { fetchPatientVitalsDetailRequest} from '../../Vitals/ducks/fetch-patient-vitals-detail.duck';

import { patientDiagnosesDetailSelector } from "../../ProblemsDiagnosis/selectors";
import { patientMedicationsDetailSelector } from "../../Medications/selectors";
import { patientReferralsDetailSelector } from "../../Referrals/selectors";
import { patientEventsDetailSelector } from "../../Events/selectors";
import { patientVitalsDetailSelector } from "../../Vitals/selectors";

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchPatientDiagnosesDetailRequest,
    fetchPatientMedicationsDetailRequest,
    fetchPatientReferralsDetailRequest,
    fetchPatientEventsDetailRequest,
    fetchPatientVitalsDetailRequest
  }, dispatch) });

@connect(patientDiagnosesDetailSelector, mapDispatchToProps)
@connect(patientMedicationsDetailSelector)
@connect(patientReferralsDetailSelector)
@connect(patientEventsDetailSelector)
@connect(patientVitalsDetailSelector)
export default class TransfersOfCarePopover extends PureComponent {
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
    },

    sourceId: ''
  };

  componentDidMount() {
    const { actions, match, record: {type, sourceId} } = this.props;
    const { typesRecords } = this.state;
    const userId = _.get('params.userId', match);
    let fetchRequest = typesRecords[type] ? typesRecords[type].fetchDetail : '';


    if (fetchRequest && userId && sourceId) {
      this.setState({ sourceId });
      actions[fetchRequest]({ userId, sourceId })
    }
  };

  render() {
    const { record: {type: typeOfRecord} } = this.props;
    const { typesRecords, sourceId } = this.state;
    const title = typesRecords[typeOfRecord].title;
    const detail = this.props[typesRecords[typeOfRecord].stateName] || null;

    return (
      <div className="record-popover" style={{display: 'block'}}>
        <div className="record-popover-header">
          <div className="record-popover-title">{title}</div>
        </div>
        <div className="record-popover-body">
          <div className="record-popover-content">
            {!detail || detail.sourceId !== sourceId ? <Spinner /> : null }
            {typeOfRecord === 'diagnosis' ? <TransfersOfCarePopoverDiagnosis detail={detail} /> : null}
            {typeOfRecord === 'medications' ? <TransfersOfCarePopoverMedications detail={detail} /> : null}
            {typeOfRecord === 'referrals' ? <TransfersOfCarePopoverReferrals detail={detail} /> : null}
            {typeOfRecord === 'events' ? <TransfersOfCarePopoverEvents detail={detail} /> : null}
            {typeOfRecord === 'vitals' ? <TransfersOfCarePopoverVitals detail={detail} /> : null}
          </div>
        </div>
      </div>
    )
  }
}