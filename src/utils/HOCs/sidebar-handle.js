export const closeSidebarOnUnmount = ({
  componentWillUnmount() {
    this.props.actions.setSidebarVisibility(false);
  },
});

export const openSidebarOnMount = ({
  componentDidMount() {
    this.props.actions.setSidebarVisibility(true);
  },
});

