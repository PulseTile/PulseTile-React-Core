import qs from 'qs';

const searchForPatient = (location, actions) => {
  const { orderType, pageNumber, searchString, queryType } = qs.parse(location.search.replace('?', ''));
  //advanced search
  if (queryType === 'advanced') return actions.fetchAdvancedPatientSearchRequest(searchString);
  //clinical query search
  if (queryType === 'clinicalQuery') return actions.fetchClinicalQuerySearchRequest(searchString);
  //basic search
  return actions.fetchBasicPatientSearchRequest({ orderType, pageNumber, searchString });
};

export const fetchPatientOnSearch = ({
  componentDidMount() {
    const { location, actions } = this.props;
    searchForPatient(location, actions);
  },

  componentWillReceiveProps(nextProps) {
    const { location, actions } = nextProps;
    const isNewSearch = location.search !== this.props.location.search;

    if (isNewSearch) searchForPatient(location, actions);
  },
});
