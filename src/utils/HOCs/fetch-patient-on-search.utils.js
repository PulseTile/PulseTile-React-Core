import _ from 'lodash/fp';
import qs from 'qs';

const searchForPatient = (location, actions) => {
  const { orderType, pageNumber, searchString, queryType } = qs.parse(location.search.replace('?', ''));
  if (queryType === 'advanced') return console.log('advanced');
  return actions.fetchBasicPatientSearchRequest({ orderType, pageNumber, searchString })
}

export const fetchPatientOnSearch = ({
  componentDidMount() {
    const { location, actions } = this.props;
    searchForPatient(location, actions)
  },

  componentWillReceiveProps(nextProps) {
    const { location, actions } = nextProps;
    const isNewSearch = location.search !== this.props.location.search;

    if (isNewSearch) {
      searchForPatient(location, actions)
    }
  },
});
