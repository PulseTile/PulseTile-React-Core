import _ from 'lodash/fp';
import qs from 'qs';

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

export const fetchPatientSummaryOnMount = ({
  componentDidMount() {
    const { actions, match } = this.props;
    const userId = _.get('params.userId', match);
    if (userId) actions.fetchPatientSummaryRequest({ userId })
  },
});

export const fetchPatientAllergiesOnMount = ({
  componentDidMount() {
    const { actions, match } = this.props;
    const userId = _.get('params.userId', match);
    if (userId) actions.fetchPatientAllergiesRequest({ userId })
  },
});

export const fetchPatientAllergiesDetailOnMount = ({
  componentDidMount() {
    const { actions, match } = this.props;
    const userId = _.get('params.userId', match);
    const sourceId = _.get('params.sourceId', match);
    if (userId && sourceId) actions.fetchPatientAllergiesDetailRequest({ userId, sourceId })
  },
});

export const fetchPatientsInfoOnMount = ({
  componentDidMount() {
    const { actions } = this.props;
    actions.fetchPatientsInfoRequest()
  },
});

export const fetchPatientDiagnosesOnMount = ({
  componentDidMount() {
    const { actions, match } = this.props;
    const userId = _.get('params.userId', match);
    if (userId) actions.fetchPatientDiagnosesRequest({ userId })
  },
});

export const fetchPatientClinicalNotesOnMount = ({
  componentDidMount() {
    const { actions, match } = this.props;
    const userId = _.get('params.userId', match);
    if (userId) actions.fetchPatientClinicalNotesRequest({ userId })
  },
});