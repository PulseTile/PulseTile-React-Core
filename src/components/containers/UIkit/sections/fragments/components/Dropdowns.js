import React, { Component } from 'react';

const dropdownClassNameDefault = 'dropdown';

/**
 * This component returns Dropdown section for COMPONENTS
 */
export default class Dropdowns extends Component {

  state = {
    openedDropdown: '',
    dropdownNotHiddenClassName: dropdownClassNameDefault,
    dropdownTopLeft: dropdownClassNameDefault,
    dropdownTopRight: dropdownClassNameDefault,
    dropdownBottomLeft: dropdownClassNameDefault,
    dropdownBottomRight: dropdownClassNameDefault,
  };

  toggleDropdown = panel => {
    const { openedDropdown } = this.state;
    if (openedDropdown) {
      this.closeDropdowns();
    } else {
      if ('notHidden' === panel) {
        this.setState({
          openedDropdown: panel,
          dropdownNotHiddenClassName: dropdownClassNameDefault + ' open',
        });
      }
      if ('topLeft' === panel) {
        this.setState({
          openedDropdown: panel,
          dropdownTopLeft: dropdownClassNameDefault + ' open',
        });
      }
      if ('topRight' === panel) {
        this.setState({
          openedDropdown: panel,
          dropdownTopRight: dropdownClassNameDefault + ' open',
        });
      }
      if ('bottomLeft' === panel) {
        this.setState({
          openedDropdown: panel,
          dropdownBottomLeft: dropdownClassNameDefault + ' open',
        });
      }
      if ('bottomRight' === panel) {
        this.setState({
          openedDropdown: panel,
          dropdownBottomRight: dropdownClassNameDefault + ' open',
        });
      }
    }
  };

  closeDropdowns = () => {
    this.setState({
      openedDropdown: '',
      dropdownNotHiddenClassName: dropdownClassNameDefault,
      dropdownTopLeft: dropdownClassNameDefault,
      dropdownTopRight: dropdownClassNameDefault,
      dropdownBottomLeft: dropdownClassNameDefault,
      dropdownBottomRight: dropdownClassNameDefault,
    });
  };

  render () {
    const { dropdownTopLeft, dropdownTopRight, dropdownBottomLeft, dropdownBottomRight, dropdownNotHiddenClassName } = this.state;
    return (
      <div id="dropdowns" className="ui-section">
        <strong className="ui-title">Dropdowns</strong>
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <div className="ui-sub-section">
              <div className="ui-sub-title">Dropdown top-left</div>
              <div className="wrap-control-group hide-indent-bottom">
                <div className="control-group with-indent left">
                  <div className={dropdownTopLeft}>
                    <button type="button" className="btn btn-primary btn-inverse" id="topLeftDropdown" onClick={() => this.toggleDropdown('topLeft')}>
                      <span className="btn-text">Open dropdown</span>
                    </button>
                    <div className="dropdown-menu dropdown-menu-panel dropdown-menu-top-left dropdown-menu-small-size">
                      <div className="heading">Dropdown title</div>
                      <div className="dropdown-menu-wrap-list">
                        <div className="dropdown-menu-list">
                          <div className="dropdown-menu-item active"><span className="dropdown-menu-item-text">Item 1</span></div>
                          <div className="dropdown-menu-item"><span className="dropdown-menu-item-text">Item 2</span></div>
                          <div className="dropdown-menu-item"><span className="dropdown-menu-item-text">Item 3</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6">
            <div className="ui-sub-section">
              <div className="ui-sub-title">Dropdown top-right</div>
              <div className="wrap-control-group hide-indent-bottom">
                <div className="control-group with-indent right">
                  <div className={dropdownTopRight}>
                    <button type="button" className="btn btn-primary btn-inverse" id="topRightDropdown" onClick={() => this.toggleDropdown('topRight')}>
                      <span className="btn-text">Open dropdown</span>
                    </button>
                  <div className="dropdown-menu dropdown-menu-panel dropdown-menu-top-right dropdown-menu-small-size">
                  <div className="heading">Dropdown title</div>
                    <div className="dropdown-menu-wrap-list">
                      <div className="dropdown-menu-list">
                        <div className="dropdown-menu-item active"><span className="dropdown-menu-item-text">Item 1</span></div>
                        <div className="dropdown-menu-item"><span className="dropdown-menu-item-text">Item 2</span></div>
                        <div className="dropdown-menu-item"><span className="dropdown-menu-item-text">Item 3</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-6">
          <div className="ui-sub-section">
            <div className="ui-sub-title">Dropdown bottom-left</div>
            <div className="wrap-control-group hide-indent-bottom">
              <div className="control-group with-indent left">
                <div className={dropdownBottomLeft}>
                  <button type="button" className="btn btn-primary btn-inverse" id="bottomLeftDropdown" onClick={() => this.toggleDropdown('bottomLeft')}>
                    <span className="btn-text">Open dropdown</span>
                  </button>
                  <div className="dropdown-menu dropdown-menu-panel dropdown-menu-small-size">
                    <div className="heading">Dropdown title</div>
                    <div className="dropdown-menu-wrap-list">
                      <div className="dropdown-menu-list">
                        <div className="dropdown-menu-item active"><span className="dropdown-menu-item-text">Item 1</span></div>
                        <div className="dropdown-menu-item"><span className="dropdown-menu-item-text">Item 2</span></div>
                        <div className="dropdown-menu-item"><span className="dropdown-menu-item-text">Item 3</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-6">
          <div className="ui-sub-section">
            <div className="ui-sub-title">Dropdown bottom-right</div>
            <div className="wrap-control-group hide-indent-bottom">
              <div className="control-group with-indent right">
                <div className={dropdownBottomRight}>
                  <button type="button" className="btn btn-primary btn-inverse" id="bottomRightDropdown" onClick={() => this.toggleDropdown('bottomRight')}>
                    <span className="btn-text">Open dropdown</span>
                  </button>
                  <div className="dropdown-menu dropdown-menu-panel dropdown-menu-right dropdown-menu-small-size">
                    <div className="heading">Dropdown title</div>
                    <div className="dropdown-menu-wrap-list">
                      <div className="dropdown-menu-list">
                        <div className="dropdown-menu-item active"><span className="dropdown-menu-item-text">Item 1</span></div>
                        <div className="dropdown-menu-item"><span className="dropdown-menu-item-text">Item 2</span></div>
                        <div className="dropdown-menu-item"><span className="dropdown-menu-item-text">Item 3</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ui-sub-section">
        <div className="ui-sub-title">Dropdown not hidden when click inside</div>
          <div className="wrap-control-group hide-indent-bottom">
            <div className="control-group with-indent left">
              <div className={dropdownNotHiddenClassName}>
                <button type="button" className="btn btn-success btn-inverse btn-filter btn-dropdown-toggle" id="notHiddenDropdown" onClick={() => this.toggleDropdown('notHidden')}>
                  <i className="btn-icon fa fa-filter"></i>
                </button>
                <div className="dropdown-menu dropdown-menu-panel dropdown-menu-small-size">
                  <div className="heading">FILTERING</div>
                    <div className="dropdown-menu-wrap-list">
                      <div className="dropdown-menu-list">
                        <div className="dropdown-menu-item"><span className="dropdown-menu-item-text">Filter</span></div>
                        <div className="dropdown-menu-item"><span className="dropdown-menu-item-text">Timelines</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
           </div>
         </div>
      </div>
    );
  }
};
