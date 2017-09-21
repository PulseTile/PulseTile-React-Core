export const dispatchCloseSidebarOnUnmount = ({
  componentWillUnmount() {
    this.props.actions.setSidebarVisibility(false)
  },
});
