import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import PTButton from '../../../ui-elements/PTButton/PTButton';

const VIEW_CONTENT = 'viewContent';

export default class PromsListHeader extends PureComponent {
  static propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    panelTitle: PropTypes.string.isRequired,
  };

  state = {
    isFilterInputVisible: false,
    selected: '',
    openedPanel: '',
    isFilterOpen: false,
  };

  componentWillMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  toggleFilterInputVisibility = /* istanbul ignore next */ () => this.setState(prevState => ({ isFilterInputVisible: !prevState.isFilterInputVisible, isFilterOpen: !prevState.isFilterOpen }),
    () => !this.state.isFilterInputVisible && this.props.onFilterChange({ target: { value: '' } })
  );

  handleClick = /* istanbul ignore next */ (e) => {
    if (!this.node.contains(e.target)) {
      this.setState({ openedPanel: '' });
    }
  };

  handleMouseDown = (name) => {
    this.setState((prevState) => {
      if (prevState.openedPanel !== name) {
        return ({ openedPanel: name })
      }
      return ({ openedPanel: '' })
    })
  };

  handleClickFilterFocus = () => this.setState({ openedPanel: '' });

  render() {
    const { isFilterInputVisible, openedPanel } = this.state;
    const { onFilterChange, panelTitle, isBtnExpandVisible, onExpand, name, currentPanel, activeView, toggleViewVisibility } = this.props;

    return (
      <div className="panel-heading" ref={node => this.node = node}>
        <div className="control-group right">
          <PTButton className="btn btn-success btn-inverse btn-filter" onClick={this.toggleFilterInputVisibility}>
            <i className="btn-icon fa fa-filter" />
          </PTButton>
        </div>
        <div className="control-group right" >
          { isBtnExpandVisible ? <PTButton className="btn btn-success btn-inverse btn-square hidden-xs hidden-sm btn-expand-panel" onClick={() => onExpand(name, currentPanel)}>
            <i className="btn-icon fa fa-expand" />
            <i className="btn-icon fa fa-compress" />
          </PTButton> : null }
          <div className={classNames('dropdown', { 'open': openedPanel === VIEW_CONTENT })}>
            <PTButton className="btn btn-success btn-inverse btn-dropdown-toggle btn-table" onClick={() => this.handleMouseDown(VIEW_CONTENT)}>
              {activeView === 'tableNews' ? <i className="btn-icon fa fa-table" /> : null }
              {activeView === 'chartNews' ? <i className="btn-icon fa fa-area-chart" /> : null }
            </PTButton>
            <div className="dropdown-menu dropdown-menu-panel dropdown-menu-right dropdown-menu-small-size">
              <div className="heading">TABLES</div>
              <div className="dropdown-menu-list">
                <div className={classNames('dropdown-menu-item', { 'active': activeView === 'tableNews' })} onClick={() => toggleViewVisibility('tableNews')}>
                  <i className="dropdown-menu-item-icon fa fa-table" />
                  <span className="dropdown-menu-item-text">Proms</span>
                </div>
              </div>
              <div className="heading">CHARTS</div>
              <div className="dropdown-menu-wrap-list">
                <div className="dropdown-menu-list">
                  <div className={classNames('dropdown-menu-item', { 'active': activeView === 'chartNews' })} onClick={() => toggleViewVisibility('chartNews')}>
                    <i className="dropdown-menu-item-icon fa fa-area-chart" />
                    <span className="dropdown-menu-item-text">Proms</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 className="panel-title">{panelTitle}</h3>
        { (isFilterInputVisible) ? <div className="panel-filter">
          <div className="inner-addon addon-left">
            <div className="addon">
              <i className="fa fa-filter" />
            </div>
            <input className="form-control" placeholder="Filter..." onChange={onFilterChange} onClick={() => this.handleClickFilterFocus()} autoFocus />
          </div>
        </div> : null}
      </div>
    )
  }
}
