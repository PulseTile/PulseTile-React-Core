import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from '../../ui-elements/Spinner/Spinner';
import RecordsOfTablePopoverDiagnosis from './RecordsOfTablePopoverDiagnosis';
import RecordsOfTablePopoverMedications from './RecordsOfTablePopoverMedications';
import { fetchPatientDiagnosesDetailRequest } from '../../pages/Diagnosis/ducks/fetch-patient-diagnoses-detail.duck';
import { fetchPatientMedicationsDetailRequest } from '../../pages/Medications/ducks/fetch-patient-medications-detail.duck';
import { patientDiagnosesDetailSelector } from '../../pages/Diagnosis/selectors';
import { patientMedicationsDetailSelector } from '../../pages/Medications/selectors';

import RecordsOfTablePlugins from '../../theme/config/recordsOfTable/recordsOfTablePopover';
import { themeDetailsAction, themeDetailsSelector, themeTypesRecordsDetails } from '../../theme/config/recordsOfTable/recordsOfTableDetails';

const coreActions = {
    fetchPatientDiagnosesDetailRequest,
    fetchPatientMedicationsDetailRequest,
};
const actionsArray = Object.assign(coreActions, themeDetailsAction);
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actionsArray, dispatch) });

const coreTypesRecordsDetails = {
  diagnosis: {
    title: 'Diagnosis',
    fetchDetail: 'fetchPatientDiagnosesDetailRequest',
    stateName: 'diagnosisDetail',
  },
  medications: {
    title: 'Medications',
    fetchDetail: 'fetchPatientMedicationsDetailRequest',
    stateName: 'medicationDetail',
  },
};
const typesRecordsDetails = Object.assign(coreTypesRecordsDetails, themeTypesRecordsDetails);

@connect(patientDiagnosesDetailSelector, mapDispatchToProps)
@connect(patientMedicationsDetailSelector)
@connect(themeDetailsSelector)

export default class RecordsOfTablePopover extends PureComponent {

  static propTypes = {
    record: PropTypes.object,
  };

  state = {
    typesRecords: typesRecordsDetails,
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
            <RecordsOfTablePlugins typeOfRecord={typeOfRecord} detail={detail} />
          </div>
        </div>
      </div>
    )
  }
}
