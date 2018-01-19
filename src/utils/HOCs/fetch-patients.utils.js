import _ from 'lodash/fp';

const generateFetchListOnMount = (fetchRequest) => {
  return {
    componentDidMount() {
      const { actions, match } = this.props;
      const userId = _.get('params.userId', match);
      if (userId) actions[fetchRequest]({ userId })
    },
    componentWillReceiveProps(nextProps) {
      const { actions, match } = this.props;
      const nextUserId = _.get('match.params.userId', nextProps);
      const userId = _.get('params.userId', match);

      if (nextUserId !== userId) {
        actions[fetchRequest]({ userId: nextUserId })
      }
    },
  }
};

const generateFetchDetailOnMount = (fetchRequest) => {
  return {
    componentDidMount() {
      const { actions, match } = this.props;
      const userId = _.get('params.userId', match);
      const sourceId = _.get('params.sourceId', match);
      if (userId && sourceId) actions[fetchRequest]({ userId, sourceId })
    },
  }
};

export const fetchPatientsOnMount = ({
  componentDidMount() {
    this.props.actions.fetchPatientsRequest()
  },
});

export const fetchPatientsCountsOnMountAndUpdate = ({
  componentDidMount() {
    const { allPatients, actions } = this.props;
    actions.fetchPatientCountsRequest(allPatients);
  },

  componentWillReceiveProps({ allPatients, actions }) {
    const isNewPatients = _.negate(_.isEqual(this.props.allPatients));
    return _.cond([
      [isNewPatients, actions.fetchPatientCountsRequest],
    ])(allPatients)
  },
});

export const fetchListOrdersOnMount = ({
  componentDidMount() {
    this.props.actions.fetchListOrdersRequest()
  },
});

export const fetchPatientSummaryOnMount = (generateFetchListOnMount('fetchPatientSummaryRequest'));

export const fetchPatientAllergiesOnMount = (generateFetchListOnMount('fetchPatientAllergiesRequest'));
export const fetchPatientAllergiesDetailOnMount = (generateFetchDetailOnMount('fetchPatientAllergiesDetailRequest'));

export const fetchPatientDiagnosesOnMount = (generateFetchListOnMount('fetchPatientDiagnosesRequest'));
export const fetchPatientDiagnosesDetailOnMount = (generateFetchDetailOnMount('fetchPatientDiagnosesDetailRequest'));

export const fetchPatientClinicalNotesOnMount = (generateFetchListOnMount('fetchPatientClinicalNotesRequest'));
export const fetchPatientClinicalNotesDetailOnMount = (generateFetchListOnMount('fetchPatientClinicalNotesDetailRequest'));

export const fetchPatientPersonalNotesOnMount = (generateFetchListOnMount('fetchPatientPersonalNotesRequest'));
export const fetchPatientPersonalNotesDetailOnMount = (generateFetchListOnMount('fetchPatientPersonalNotesDetailRequest'));

export const fetchPatientGenericPluginOnMount = (generateFetchListOnMount('fetchPatientGenericPluginRequest'));
export const fetchPatientGenericPluginDetailOnMount = (generateFetchDetailOnMount('fetchPatientGenericPluginDetailRequest'));

export const fetchPatientContactsOnMount = (generateFetchListOnMount('fetchPatientContactsRequest'));
export const fetchPatientContactsDetailOnMount = (generateFetchDetailOnMount('fetchPatientContactsDetailRequest'));

export const fetchPatientVaccinationsOnMount = (generateFetchListOnMount('fetchPatientVaccinationsRequest'));
export const fetchPatientVaccinationsDetailOnMount = (generateFetchDetailOnMount('fetchPatientVaccinationsDetailRequest'));

export const fetchPatientMedicationsOnMount = (generateFetchListOnMount('fetchPatientMedicationsRequest'));
export const fetchPatientMedicationsDetailOnMount = (generateFetchDetailOnMount('fetchPatientMedicationsDetailRequest'));

export const fetchPatientProceduresOnMount = (generateFetchListOnMount('fetchPatientProceduresRequest'));
export const fetchPatientProceduresDetailOnMount = (generateFetchDetailOnMount('fetchPatientProceduresDetailRequest'));

export const fetchPatientEventsOnMount = (generateFetchListOnMount('fetchPatientEventsRequest'));
export const fetchPatientEventsDetailOnMount = (generateFetchDetailOnMount('fetchPatientEventsDetailRequest'));

export const fetchPatientTestResultsOnMount = (generateFetchListOnMount('fetchPatientTestResultsRequest'));
export const fetchPatientTestResultsDetailOnMount = (generateFetchDetailOnMount('fetchPatientTestResultsDetailRequest'));

export const fetchPatientReferralsOnMount = (generateFetchListOnMount('fetchPatientReferralsRequest'));
export const fetchPatientReferralsDetailOnMount = (generateFetchDetailOnMount('fetchPatientReferralsDetailRequest'));

export const fetchPatientOrdersOnMount = (generateFetchListOnMount('fetchPatientOrdersRequest'));
export const fetchPatientOrdersDetailOnMount = (generateFetchDetailOnMount('fetchPatientOrdersDetailRequest'));

export const fetchPatientMDTsOnMount = (generateFetchListOnMount('fetchPatientMDTsRequest'));
export const fetchPatientMDTsDetailOnMount = (generateFetchDetailOnMount('fetchPatientMDTsDetailRequest'));

export const fetchPatientDrawingsOnMount = (generateFetchListOnMount('fetchPatientDrawingsRequest'));
export const fetchPatientDrawingsDetailOnMount = (generateFetchDetailOnMount('fetchPatientDrawingsDetailRequest'));

export const fetchPatientVitalsOnMount = (generateFetchListOnMount('fetchPatientVitalsRequest'));
export const fetchPatientVitalsDetailOnMount = (generateFetchDetailOnMount('fetchPatientVitalsDetailRequest'));

export const fetchPatientDocumentsOnMount = (generateFetchListOnMount('fetchPatientDocumentsRequest'));
export const fetchPatientDocumentsDetailOnMount = (generateFetchDetailOnMount('fetchPatientDocumentsDetailRequest'));

export const fetchPatientImagesOnMount = (generateFetchListOnMount('fetchPatientImagesRequest'));
export const fetchPatientImagesDetailOnMount = (generateFetchDetailOnMount('fetchPatientImagesDetailRequest'));
export const fetchSeriesOnMount = ({
  componentDidMount() {
    const { actions, match } = this.props;
    const userId = _.get('params.userId', match);
    const sourceId = _.get('params.sourceId', match);
    const source = 'orthanc';
    if (userId && sourceId) actions.fetchSeriesRequest({ userId, studyId: sourceId, source })
  },
});
