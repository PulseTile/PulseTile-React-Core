export const fetchPatientsOnMount = ({
  componentDidMount() {
    this.props.actions.fetchPatientsRequest()
  },
});
