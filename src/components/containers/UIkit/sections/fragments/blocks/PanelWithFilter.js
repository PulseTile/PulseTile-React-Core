import React, { Component } from 'react';

const panelFilterClassNameDefault = 'panel-filter';

/**
 * This component returns content of PanelWithFilter section in Blocks
 *
 * @return {XML}
 * @constructor
 */
export default class PanelWithFilter extends Component {

  state = {
    panelFilterClassName: 'panel-filter',
    isFilterOpen: false,
  };

  /**
   * This function hide/show filter input
   */
  toggleFilter = () => {
    const { isFilterOpen } = this.state;
    if (isFilterOpen) {
      this.setState({
        panelFilterClassName: panelFilterClassNameDefault,
        isFilterOpen: false,
      });
    } else {
      this.setState({
        panelFilterClassName: panelFilterClassNameDefault + ' hidden',
        isFilterOpen: true,
      });
    }
  };

  render() {
    const { panelFilterClassName } = this.state;
    return (
      <div id="panel-filter" className="ui-section">
        <strong className="ui-title">Panel heading with filter</strong>
        <div className="ui-sub-section">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <div className="control-group right">
                <button type="button" className="btn btn-success btn-inverse btn-filter" onClick={() => this.toggleFilter()}>
                  <i className="btn-icon fa fa-filter"></i>
                </button>
              </div>
              <h3 className="panel-title">Panel title</h3>
              <div className={panelFilterClassName}>
                <div className="inner-addon addon-left">
                  <div className="addon">
                    <i className="fa fa-filter"></i>
                  </div>
                  <input type="text" id="filter" className="form-control" placeholder="Filter..." />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
