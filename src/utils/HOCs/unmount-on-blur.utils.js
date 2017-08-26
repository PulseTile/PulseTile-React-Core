import _ from 'lodash/fp'
import { findDOMNode } from 'react-dom'

export const unmountOnBlur = ({
  componentDidMount() {
    const { toggleVisibility } = this.props;
    const componentDOMNode = findDOMNode(this)

    this._toggleVisibility = (e, ...restArgs) => {
      const isClickInsideComponent = componentDOMNode.contains(e.target);
      return isClickInsideComponent
        ? e.stopPropagation()
        : toggleVisibility(e, ...restArgs);
    };
    if (_.isFunction(toggleVisibility)) document.addEventListener('click', this._toggleVisibility, false);
  },

  componentWillUnmount() {
    if (_.isFunction(this._toggleVisibility)) document.removeEventListener('click', this._toggleVisibility, false);
  },
});
