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

export const fetchPatientSimpleSearch = ({
  componentDidMount() {
    const { location, actions } = this.props;
    const { orderType, pageNumber, searchString } = qs.parse(location.search.replace('?', ''));
    actions.fetchBasicPatientSearchRequest({ orderType, pageNumber, searchString })
  },

  componentWillReceiveProps(nextProps) {
    const { location, actions } = nextProps;
    const isNewSearch = location.search !== this.props.location.search;

    if (isNewSearch) {
      const { orderType, pageNumber, searchString } = qs.parse(location.search.replace('?', ''));
      actions.fetchBasicPatientSearchRequest({ orderType, pageNumber, searchString })
    }
  },
});

export const fetchPatientSummaryOnMount = ({
  componentDidMount() {
    const { actions, match } = this.props;
    const userId = _.get('params.userId', match);
    if (userId) actions.fetchPatientSummaryRequest({ userId })
  },
});
