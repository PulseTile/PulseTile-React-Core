import React, { Component } from 'react';

const panelClassNameDefault = 'panel panel-secondary';

export default class PanelAccordion extends Component {

    state = {
        panelFirstClassName: panelClassNameDefault,
        panelSecondClassName: panelClassNameDefault,
        openPanel: null,
    };

    openPanel = panel => {
        this.closePanels();
        if ('first' === panel) {
            this.setState({
                panelFirstClassName: panelClassNameDefault + ' open',
                openPanel: 'first',
            })
        }
        if ('second' === panel) {
            this.setState({
                panelSecondClassName: panelClassNameDefault + ' open',
                openPanel: 'second',
            })
        }
    };

    closePanels = () => {
        this.setState({
            panelFirstClassName: panelClassNameDefault,
            panelSecondClassName: panelClassNameDefault,
            openPanel: null,
        })
    };

    render() {
        const { panelFirstClassName, panelSecondClassName } = this.state;
        return (
            <div className="col-xs-12 col-sm-6">
                <div className="ui-sub-section">
                    <div className="ui-sub-title">Panel accordion</div>
                    <div className="panel-group accordion">
                        <div className={panelFirstClassName}>
                            <div className="panel-heading">
                                <div className="control-group right" >
                                    <button type="button" className="btn btn-success btn-inverse btn-square btn-toggle-rotate" onClick={() => this.openPanel('first')}>
                                        <i className="btn-icon fa fa-chevron-up"></i>
                                    </button>
                                </div>
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
                            <div className="panel-heading">
                                <div className="control-group right" >
                                    <button className="btn btn-success btn-inverse btn-square btn-toggle-rotate" onClick={() => this.openPanel('second')}>
                                        <i className="btn-icon fa fa-chevron-up"></i>
                                    </button>
                                </div>
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
            </div>
        );
    }
}