import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import PTButton from '../../../ui-elements/PTButton/PTButton';

export default class AllergiesListHeader extends PureComponent {
  static propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    panelTitle: PropTypes.string.isRequired,
  };

  state = {
    isFilterInputVisible: false,
  };

  toggleFilterInputVisibility = () => this.setState(prevState => ({ isFilterInputVisible: !prevState.isFilterInputVisible }),
    () => !this.state.isFilterInputVisible && this.props.onFilterChange({ target: { value: '' } })
  );

  render() {
    const { isFilterInputVisible } = this.state;
    const { onFilterChange, panelTitle } = this.props;

    return (
      <div className="panel-heading">
        <div className="control-group right">
          <PTButton className="btn btn-success btn-inverse btn-filter" onClick={this.toggleFilterInputVisibility}>
            <i className="btn-icon fa fa-filter" />
          </PTButton>
        </div>
        <h3 className="panel-title">{panelTitle}</h3>
        {isFilterInputVisible && <div className="panel-filter">
          <div className="inner-addon addon-left">
            <div className="addon">
              <i className="fa fa-filter" />
            </div>
            <input className="form-control" placeholder="Filter..." onChange={onFilterChange} />
          </div>
        </div>}
      </div>
    )
  }
}
