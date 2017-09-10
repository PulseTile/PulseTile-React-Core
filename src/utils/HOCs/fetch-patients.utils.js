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

  componentWillUpdate({ allPatients, actions }) {
    const isNewPatients = _.negate(_.isEqual(this.props.allPatients));
    return _.cond([
      [isNewPatients, actions.fetchPatientCountsRequest],
    ])(allPatients)
  },
});

export const fetchPatientSimpleSearchOnMount = ({
  componentDidMount() {
    const { location, actions } = this.props;
    const { orderType, pageNumber, searchString } = qs.parse(location.search.replace('?', ''));
    actions.fetchBasicPatientSearchRequest({ orderType, pageNumber, searchString })
  },
});
