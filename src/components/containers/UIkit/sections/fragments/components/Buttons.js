import React, { Component } from 'react';

/**
 * This component returns content of Buttons section
 */
export default class Buttons extends Component {

  state = {
    dropdownButtonClassName: 'control-group with-indent left',
    isDropdownOpen: false,
  };

  /**
   * This function toggle dropdown button class name
   */
  toggleDropdown = () => {
    const { isDropdownOpen } = this.state;
    if (isDropdownOpen) {
      this.setState({
        dropdownButtonClassName: 'control-group with-indent left open',
        isDropdownOpen: !isDropdownOpen,
      });
    } else {
      this.setState({
        dropdownButtonClassName: 'control-group with-indent left',
        isDropdownOpen: !isDropdownOpen,
      });
    }
  };

  render() {
    const { dropdownButtonClassName } = this.state;
    return (
      <div id="buttons" className="ui-section">
        <strong className="ui-title">Buttons</strong>
        <div className="ui-sub-section">
          <strong className="ui-sub-title">Button color variations</strong>
          <div className="wrap-control-group hide-indent-bottom">
            <div className="control-group with-indent left">
              <button className="btn"><span className="btn-text">Button text</span></button>
              <button className="btn btn-default"><span className="btn-text">Button text</span></button>
              <button className="btn btn-primary"><span className="btn-text">Button text</span></button>
              <button className="btn btn-success"><span className="btn-text">Button text</span></button>
              <button className="btn btn-info"><span className="btn-text">Button text</span></button>
              <button className="btn btn-warning"><span className="btn-text">Button text</span></button>
              <button className="btn btn-danger"><span className="btn-text">Button text</span></button>
            </div>
          </div>
        </div>
        <div className="ui-sub-section">
          <strong className="ui-sub-title">Buttons inverse</strong>
            <div className="wrap-control-group hide-indent-bottom">
              <div className="control-group with-indent left">
                <button className="btn btn-inverse"><span className="btn-text">Button text</span></button>
                <button className="btn btn-inverse btn-default"><span className="btn-text">Button text</span></button>
                <button className="btn btn-inverse btn-primary"><span className="btn-text">Button text</span></button>
                <button className="btn btn-inverse btn-success"><span className="btn-text">Button text</span></button>
                <button className="btn btn-inverse btn-info"><span className="btn-text">Button text</span></button>
                <button className="btn btn-inverse btn-warning"><span className="btn-text">Button text</span></button>
                <button className="btn btn-inverse btn-danger"><span className="btn-text">Button text</span></button>
              </div>
            </div>
          </div>
          <div className="ui-sub-section">
            <strong className="ui-sub-title">Buttons without border</strong>
            <div className="wrap-control-group hide-indent-bottom">
              <div className="control-group with-indent left">
                <button className="btn btn-inverse btn-none-border"><span className="btn-text">Button text</span></button>
                <button className="btn btn-inverse btn-none-border btn-default"><span className="btn-text">Button text</span></button>
                <button className="btn btn-inverse btn-none-border btn-primary"><span className="btn-text">Button text</span></button>
                <button className="btn btn-inverse btn-none-border btn-success"><span className="btn-text">Button text</span></button>
                <button className="btn btn-inverse btn-none-border btn-info"><span className="btn-text">Button text</span></button>
                <button className="btn btn-inverse btn-none-border btn-warning"><span className="btn-text">Button text</span></button>
                <button className="btn btn-inverse btn-none-border btn-danger"><span className="btn-text">Button text</span></button>
              </div>
            </div>
          </div>
          <div className="ui-sub-section">
            <strong className="ui-sub-title">Buttons disabled</strong>
            <div className="wrap-control-group hide-indent-bottom">
              <div className="control-group with-indent left">
                <button className="btn btn-success disabled"><span className="btn-text">Button text</span></button>
                <button className="btn btn-success disabled btn-inverse"><span className="btn-text">Button text</span></button>
                <button className="btn btn-success disabled btn-inverse btn-none-border"><span className="btn-text">Button text</span></button>
              </div>
            </div>
          </div>
          <div className="ui-sub-section">
            <strong className="ui-sub-title">Buttons with icons</strong>
            <div className="wrap-control-group hide-indent-bottom">
              <div className="control-group with-indent left">
                <button className="btn btn-success"><i className="btn-icon fa fa-check"></i> <span className="btn-text">Button text</span></button>
                <button className="btn btn-success btn-inverse"><i className="btn-icon fa fa-check"></i> <span className="btn-text">Button text</span></button>
                <button className="btn btn-success"><i className="btn-icon fa fa-filter"></i></button>
                <button className="btn btn-success btn-inverse"><i className="btn-icon fa fa-filter"></i></button>
              </div>
            </div>
          </div>
          <div className="ui-sub-section">
            <strong className="ui-sub-title">Buttons for dropdown menu</strong>
            <div className="wrap-control-group">
              <div className={dropdownButtonClassName}>
                <button type="button" className="btn btn-success btn-inverse btn-dropdown-toggle" onClick={() => this.toggleDropdown()}>
                  <span className="btn-text">Button text</span>
                </button>
              </div>
            </div>
          </div>
          <div className="ui-sub-section">
            <strong className="ui-sub-title">Buttons size</strong>
            <div className="wrap-control-group">
              <div className="control-group with-indent left">
                <button className="btn btn-success btn-inverse"><i className="btn-icon fa fa-check"></i> <span className="btn-text">Button text</span></button>
                <button className="btn btn-success btn-inverse btn-sm"><i className="btn-icon fa fa-check"></i> <span className="btn-text">Button text</span></button>
                <button className="btn btn-success btn-inverse btn-smaller"><i className="btn-icon fa fa-check"></i> <span className="btn-text">Button text</span></button>
                <button className="btn btn-success btn-inverse btn-square"><i className="btn-icon fa fa-check"></i></button>
                <button className="btn btn-success btn-inverse btn-square  btn-sm"><i className="btn-icon fa fa-check"></i></button>
                <button className="btn btn-success btn-inverse btn-square  btn-smaller"><i className="btn-icon fa fa-check"></i></button>
              </div>
            </div>
            <div className="wrap-control-group">
              <button className="btn btn-success btn-inverse btn-block"><i className="btn-icon fa fa-check"></i> <span className="btn-text">Button text</span></button>
            </div>
          </div>
          <div className="ui-sub-section">
            <strong className="ui-sub-title">Buttons rounded</strong>
            <div className="wrap-control-group hide-indent-bottom">
              <div className="control-group with-indent left">
                <button className="btn btn-success btn-inverse btn-rounded"><i className="btn-icon fa fa-check"></i> <span className="btn-text">Button text</span></button>
                <button className="btn btn-success btn-inverse btn-rounded btn-square"><i className="btn-icon fa fa-check"></i></button>
              </div>
            </div>
          </div>
          <div className="ui-sub-section">
            <strong className="ui-sub-title">Buttons text weight</strong>
            <div className="wrap-control-group hide-indent-bottom">
              <div className="control-group with-indent left">
                <button className="btn btn-success btn-inverse"><i className="btn-icon fa fa-table"></i> <span className="btn-text">Button text</span></button>
                <button className="btn btn-success btn-inverse btn-bold"><i className="btn-icon fa fa-table"></i> <span className="btn-text">Button text</span></button>
                <button className="btn btn-success btn-inverse btn-icon-normal"><i className="btn-icon fa fa-table"></i> <span className="btn-text">Button text</span></button>
                <button className="btn btn-success btn-inverse btn-icon-normal btn-bold"><i className="btn-icon fa fa-table"></i> <span className="btn-text">Button text</span></button>
              </div>
            </div>
        </div>
      </div>
    );
  }
};
