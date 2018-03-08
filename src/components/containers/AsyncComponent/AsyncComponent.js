import React, { Component } from 'react';

import Spinner from '../../ui-elements/Spinner/Spinner';

export default function asyncComponent(getComponent) {
  class AsyncComponent extends Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then((Component) => {
          AsyncComponent.Component = Component
          this.setState({ Component })
        })
      }
    }
    render() {
      const { Component } = this.state;
      return Component ? <Component {...this.props} /> : <div style={{ height: '100px', position: 'relative' }}><Spinner /></div>
    }
  }
  return AsyncComponent;
}
