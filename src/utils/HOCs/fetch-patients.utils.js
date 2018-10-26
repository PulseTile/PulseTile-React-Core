import _ from 'lodash/fp';

const generateFetchListOnMount = (fetchRequest) => {
  return {
    componentDidMount() {
      const { actions, match } = this.props;
      const userId = _.get('params.userId', match);
      if (userId) actions[fetchRequest]({ userId });
    },
    componentWillReceiveProps(nextProps) {
      const { actions, match } = this.props;
      const nextUserId = _.get('match.params.userId', nextProps);
      const userId = _.get('params.userId', match);
      if (nextUserId !== userId) {
        actions[fetchRequest]({ userId: nextUserId });
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
      if (userId && sourceId) actions[fetchRequest]({ userId, sourceId });
    },
  }
};

export const fetchPatientsOnMount = ({
  componentDidMount() {
    this.props.actions.fetchPatientsRequest();
  },
});

export const fetchPatientsCountsOnMountAndUpdate = ({
  componentDidMount() {
    const { actions, currentPagePatients } = this.props;
    actions.fetchPatientCountsRequest(currentPagePatients);
  },

  componentWillReceiveProps({ currentPagePatients, actions, offset }) {
    const isNewPatients = _.negate(_.isEqual(this.props.currentPagePatients));
    return _.cond([
      [isNewPatients, actions.fetchPatientCountsRequest],
    ])(currentPagePatients)
  },
});

export const fetchHeaderToolbarOnMount = ({
  componentDidMount() {
    const { actions, match } = this.props;
    const userId = _.get('params.userId', match);
    if (userId && _.isEmpty(this.props.patientsDemographics[userId])) actions.fetchPatientDemographicsRequest({ userId })
  },
  componentWillReceiveProps(nextProps) {
    const { actions, match } = this.props;
    const nextUserId = _.get('match.params.userId', nextProps);
    const userId = _.get('params.userId', match);
    if (nextUserId !== userId) {
      actions.fetchPatientDemographicsRequest({ userId: nextUserId })
    }
  },
});

export const fetchPatientDemographicsOnMount = (generateFetchListOnMount('fetchPatientDemographicsRequest'));

export const fetchPatientAllergiesOnMount = (generateFetchListOnMount('fetchPatientAllergiesRequest'));
export const fetchPatientAllergiesSynopsisOnMount = (generateFetchListOnMount('fetchPatientAllergiesSynopsisRequest'));
export const fetchPatientAllergiesDetailOnMount = (generateFetchDetailOnMount('fetchPatientAllergiesDetailRequest'));

export const fetchPatientProblemsSynopsisOnMount = (generateFetchListOnMount('fetchPatientDiagnosesSynopsisRequest'));
export const fetchPatientDiagnosesOnMount = (generateFetchListOnMount('fetchPatientDiagnosesRequest'));
export const fetchPatientDiagnosesDetailOnMount = (generateFetchDetailOnMount('fetchPatientDiagnosesDetailRequest'));

export const fetchPatientContactsOnMount = (generateFetchListOnMount('fetchPatientContactsRequest'));
export const fetchPatientContactsSynopsisOnMount = (generateFetchListOnMount('fetchPatientContactsSynopsisRequest'));
export const fetchPatientContactsDetailOnMount = (generateFetchDetailOnMount('fetchPatientContactsDetailRequest'));

export const fetchPatientMedicationsOnMount = (generateFetchListOnMount('fetchPatientMedicationsRequest'));
export const fetchPatientMedicationsSynopsisOnMount = (generateFetchListOnMount('fetchPatientMedicationsSynopsisRequest'));
export const fetchPatientMedicationsDetailOnMount = (generateFetchDetailOnMount('fetchPatientMedicationsDetailRequest'));
