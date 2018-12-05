import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import PTButton from '../ui-elements/PTButton/PTButton';

export default class PluginListHeader extends PureComponent {
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
    const { onFilterChange, panelTitle, isBtnExpandVisible, isBtnTableVisible, onExpand, name, currentPanel } = this.props;

    return (
      <div className="panel-heading">
        <div className="control-group right">
          { isBtnExpandVisible ? <PTButton className="btn btn-success btn-inverse btn-square hidden-xs hidden-sm btn-expand-panel" aria-label="Expand / Collapse" onClick={() => onExpand(name, currentPanel)}>
            <i className="btn-icon fa fa-expand" />
            <i className="btn-icon fa fa-compress" />
          </PTButton> : null }
          { isBtnTableVisible ? <PTButton className="btn btn-success btn-inverse btn-dropdown-toggle btn-table" aria-label="Table">
            <i className="btn-icon fa fa-table" />
          </PTButton> : null }
          <PTButton className="btn btn-success btn-inverse btn-filter" aria-label="Filter" onClick={this.toggleFilterInputVisibility} accessKey="G">
            <i className="btn-icon fa fa-filter" />
          </PTButton>
        </div>
        <h3 className="panel-title">{panelTitle}</h3>
        {isFilterInputVisible && <div className="panel-filter">
          <div className="inner-addon addon-left">
            <div className="addon">
              <i className="fa fa-filter" />
            </div>
            <input className="form-control" placeholder="Filter..." onChange={onFilterChange} autoFocus />
          </div>
        </div>}
      </div>
    )
  }
}
