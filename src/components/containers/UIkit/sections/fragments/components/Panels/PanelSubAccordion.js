import React, { Component } from 'react';

const panelClassNameDefault = 'panel panel-secondary panel-subaccordion accordion';

/**
 * This component return Panel Sub-Accordion
 */
export default class PanelSubAccordion extends Component {

  state = {
    panelFirstClassName: panelClassNameDefault,
    panelSecondClassName: panelClassNameDefault,
    isFirstOpen: false,
    isSecondOpen: false,
  };

  toggleFirstSubAccordion = () => {
    const { isFirstOpen } = this.state;
    if (isFirstOpen) {
      this.setState({
        panelFirstClassName: panelClassNameDefault,
        isFirstOpen: !isFirstOpen
      })
    } else {
      this.setState({
        panelFirstClassName: panelClassNameDefault + ' open',
        isFirstOpen: !isFirstOpen
      })
    }
  };

  toggleSecondSubAccordion = () => {
    const { isSecondOpen } = this.state;
    if (isSecondOpen) {
      this.setState({
        panelSecondClassName: panelClassNameDefault,
        isSecondOpen: !isSecondOpen
      })
    } else {
      this.setState({
        panelSecondClassName: panelClassNameDefault + ' open',
        isSecondOpen: !isSecondOpen
      })
    }
  };

  render() {
    const { panelFirstClassName, panelSecondClassName } = this.state;
    return (
      <div className="col-xs-12 col-sm-6">
        <div className="ui-sub-section">
          <div className="ui-sub-title">Panel sub-accordion</div>
          <div className={panelFirstClassName}>
            <div className="panel-heading" onClick={() => this.toggleFirstSubAccordion()}>
              <h3 className="panel-title">Panel title 1</h3>
            </div>
            <div className="panel-body">
              <div className="ui-panel-content">Panel Content 1</div>
              <div className="panel-control">
                <div className="wrap-control-group hide-indent-bottom">
                  <div className="control-group with-indent right">
                    <button className="btn btn-success btn-inverse btn-create">
                      <i className="btn-icon fa fa-plus"></i> <span className="btn-text">Create</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={panelSecondClassName}>
            <div className="panel-heading" onClick={() => this.toggleSecondSubAccordion()}>
              <h3 className="panel-title">Panel title 2</h3>
            </div>
            <div className="panel-body">
              <div className="ui-panel-content">Panel Content 2</div>
              <div className="panel-control">
                <div className="wrap-control-group hide-indent-bottom">
                  <div className="control-group with-indent right">
                    <button className="btn btn-success btn-inverse btn-create">
                     <i className="btn-icon fa fa-plus"></i> <span className="btn-text">Create</span>
                    </button>
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
