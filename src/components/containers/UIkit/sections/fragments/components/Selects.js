import React, { Component } from 'react';

const themes = [
  { id: 'green',  name: 'Green Theme',  baseColor: '#0D672F' },
  { id: 'red',    name: 'Red Theme',    baseColor: 'red'     },
  { id: 'blue',   name: 'Blue Theme',   baseColor: 'blue'    },
  { id: 'brown',  name: 'Brown Theme',  baseColor: 'brown'   },
  { id: 'yellow', name: 'Yellow Theme', baseColor: 'yellow'  },
];

/**
 * This component returns content of Selects section
 *
 * @return {XML}
 * @constructor
 */
export default class Selects extends Component {

  state = {
    currentId: 'green',
    isDropdownOpen: false,
  };

  /**
   * This function opens dropdown of the Theme selector
   */
  openDropdown = () => {
    this.setState({
      isDropdownOpen: !this.state.isDropdownOpen,
    });
  };

  /**
   * This function changes current theme
   */
  changeTheme = id => {
    this.setState({
      currentId: id,
    });
  };

  /**
   * This function returns current theme
   */
  getCurrentTheme = currentId => {
    let result = null;
    for (let i = 0, n = themes.length; i < n; i++) {
      let item = themes[i];
      if (item.id === currentId) {
        result = item;
        break;
      }
    }
    return result;
  };

  render() {
    const { isDropdownOpen, currentId } = this.state;
    const currentTheme = this.getCurrentTheme(currentId);
    return (
      <div id="select" className="ui-section">
        <strong className="ui-title">Selects</strong>
          <div className="form-group-wrapper">
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <div className="form-group">
                  <label className="control-label">Select</label>
                  <div className="input-holder">
                    <select className="form-control input-sm" id="select1" name="select1">
                      <option selected>Select 1</option>
                      <option>Select 2</option>
                      <option>Select 3</option>
                      <option>Select 4</option>
                      <option>Select 5</option>
                      <option>Select 6</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6">
                <div className="form-group">
                  <label className="control-label">Select (disabled)</label>
                  <div className="input-holder">
                    <select className="form-control input-sm" id="select2" name="select2" disabled>
                      <option selected>Select 1</option>
                      <option>Select 2</option>
                      <option>Select 3</option>
                      <option>Select 4</option>
                      <option>Select 5</option>
                      <option>Select 6</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <div className="form-group">
                  <label className="control-label">Custom Select</label>
                  <div className="input-holder">
                    <div className="input-holder">
                      <div className="ui-select-container ui-select-bootstrap dropdown open" onClick={() => this.openDropdown()}>
                        <div className="ui-select-match">
                          <span className="btn btn-default form-control ui-select-toggle">
                            <span className="ui-select-placeholder text-muted"></span>
                            <span className="ui-select-match-text pull-left">
                              <div className="palette-color">
                                <div className="palette-color-icon" style={{background: currentTheme.baseColor}}></div>
                                <div className="palette-color-name">{currentTheme.name}</div>
                              </div>
                            </span>
                          </span>
                        </div>
                        { isDropdownOpen &&
                          <ul className="ui-select-choices ui-select-choices-content ui-select-dropdown dropdown-menu">
                            { themes.map((item, key) => {
                              return (
                                <li key={key} className="ui-select-choices-group">
                                  <div className="ui-select-match" onClick={() => this.changeTheme(item.id)}>
                                    <span className="btn btn-default form-control ui-select-toggle">
                                      <span className="ui-select-placeholder text-muted"></span>
                                      <span className="ui-select-match-text pull-left">
                                        <div className="palette-color">
                                          <div className="palette-color-icon" style={{background: item.baseColor}}></div>
                                          <div className="palette-color-name">{item.name}</div>
                                        </div>
                                      </span>
                                    </span>
                                  </div>
                                </li>
                              );
                             })}
                          </ul>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6">
                <div className="form-group">
                  <label className="control-label">Select (disabled)</label>
                  <div className="input-holder">
                    <div className="ui-select-container ui-select-bootstrap dropdown open" disabled="disabled">
                      <div className="ui-select-match" disabled="disabled">
                        <span className="btn btn-default form-control ui-select-toggle" disabled="disabled">
                          <span className="ui-select-placeholder text-muted"></span>
                          <span className="ui-select-match-text pull-left">
                            <div className="palette-color">
                              <div className="palette-color-icon"></div>
                              <div className="palette-color-name">Green Theme</div>
                            </div>
                          </span>
                        </span>
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
}
