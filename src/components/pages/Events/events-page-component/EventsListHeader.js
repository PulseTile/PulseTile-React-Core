import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import PTButton from '../../../ui-elements/PTButton/PTButton';

const FILTER_CONTENT = 'filterContent';
const VIEW_CONTENT = 'viewContent';

export default class PluginListHeader extends PureComponent {
  static propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    panelTitle: PropTypes.string.isRequired,
  };

  state = {
    isFilterInputVisible: false,
    selected: '',
    openedPanel: '',
    isFilterOpen: false,
    isTimelinesOpen: false,
    activeView: 'table',
  };

  handleSelect = (selected) => {
    this.setState({ selected });
    document.body.click();
  };

  toggleFilterInputVisibility = () => this.setState(prevState => ({ isFilterInputVisible: !prevState.isFilterInputVisible, isFilterOpen: !prevState.isFilterOpen }),
    () => !this.state.isFilterInputVisible && this.props.onFilterChange({ target: { value: '' } })
  );

  toggleTimelinesVisibility = () => this.setState(prevState => ({ isTimelinesOpen: !prevState.isTimelinesOpen }));

  componentWillMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  handleClick = (e) => {
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

  render() {
    const { isFilterInputVisible, selected, openedPanel, isFilterOpen, isTimelinesOpen, activeView } = this.state;
    const { onFilterChange, panelTitle, isBtnExpandVisible, isBtnTableVisible, onExpand, name, currentPanel } = this.props;

    return (
      <div className="panel-heading" ref={node => this.node = node}>
        <div className="control-group right">
          <div className={classNames('dropdown', { 'open': openedPanel === FILTER_CONTENT })}>
            <PTButton className="btn btn-success btn-inverse btn-filter btn-dropdown-toggle open" onClick={() => this.handleMouseDown(FILTER_CONTENT)}>
              <i className="btn-icon fa fa-filter" />
            </PTButton>
            <div className="dropdown-menu dropdown-menu-panel dropdown-menu-right dropdown-menu-small-size">
              <div className="heading">FILTERING</div>
              <div className="dropdown-menu-wrap-list">
                <div className="dropdown-menu-list">
                  <div className={classNames('dropdown-menu-item', { 'active': isFilterOpen })} onClick={this.toggleFilterInputVisibility}>
                    <span className="dropdown-menu-item-text">Filter</span>
                  </div>
                  <div className={classNames('dropdown-menu-item', { 'active': isTimelinesOpen })} onClick={this.toggleTimelinesVisibility}>
                    <span className="dropdown-menu-item-text">Timelines</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="control-group right" >
          { isBtnExpandVisible ? <PTButton className="btn btn-success btn-inverse btn-square hidden-xs hidden-sm btn-expand-panel" onClick={() => onExpand(name, currentPanel)}>
            <i className="btn-icon fa fa-expand" />
            <i className="btn-icon fa fa-compress" />
          </PTButton> : null }
          <div className={classNames('dropdown', { 'open': openedPanel === VIEW_CONTENT })}>
            <PTButton className="btn btn-success btn-inverse btn-dropdown-toggle btn-table" onClick={() => this.handleMouseDown(VIEW_CONTENT)}>
              {activeView === 'table' ? <i className="btn-icon fa fa-table" /> : null }
              {activeView === 'timeline' ? <i className="btn-icon fa fa-sliders" /> : null }
            </PTButton>
            <div className="dropdown-menu dropdown-menu-panel dropdown-menu-right dropdown-menu-small-size">
              <div className="heading">TABLES</div>
              <div className="dropdown-menu-list">
                <div className={classNames('dropdown-menu-item', { 'active': activeView === 'table' })}>
                  <i className="dropdown-menu-item-icon fa fa-table"></i>
                  <span className="dropdown-menu-item-text">Events</span>
                </div>
              </div>
              <div className="heading">TIMELINES</div>
              <div className="dropdown-menu-wrap-list">
                <div className="dropdown-menu-list">
                  <div className={classNames('dropdown-menu-item', { 'active': activeView === 'timeline' })}>
                    <i className="dropdown-menu-item-icon fa fa-sliders"></i>
                    <span className="dropdown-menu-item-text">Events</span></div>
                </div>
              </div>
            </div>
          </div>
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
