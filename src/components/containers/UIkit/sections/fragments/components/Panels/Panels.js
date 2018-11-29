import React from 'react';
import PanelAccordion from './PanelAccordion';
import PanelSubAccordion from './PanelSubAccordion';

/**
 * This component returns Panels section for COMPONENT
 */
const Panels = () => {
    return (
        <div id="panels" className="ui-section">
            <strong className="ui-title">Panels</strong>
            <div className="row">
                <div className="col-xs-12 col-sm-6">
                    <div className="ui-sub-section">
                        <div className="ui-sub-title">Panel primary</div>
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <div className="control-group right" >
                                    <button className="btn btn-success btn-inverse btn-square hidden-xs hidden-sm btn-expand-panel"><i className="btn-icon fa fa-expand"></i><i className="btn-icon fa fa-compress"></i></button>
                                </div>
                                <h3 className="panel-title">Panel title</h3>
                            </div>
                            <div className="panel-body">
                                <div className="ui-panel-content">Panel Conten</div>
                                <div className="panel-control">
                                    <div className="wrap-control-group hide-indent-bottom">
                                        <div className="control-group with-indent right">
                                            <button className="btn btn-success btn-inverse btn-create"><i className="btn-icon fa fa-plus"></i> <span className="btn-text">Create</span></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-6">
                    <div className="ui-sub-section">
                        <div className="ui-sub-title">Panel secondary</div>
                        <div className="panel panel-secondary">
                            <div className="panel-heading">
                                <div className="control-group right" >
                                    <button className="btn btn-success btn-inverse btn-square hidden-xs hidden-sm btn-expand-panel"><i className="btn-icon fa fa-expand"></i><i className="btn-icon fa fa-compress"></i></button>
                                </div>
                                <h3 className="panel-title">Panel title</h3>
                            </div>
                            <div className="panel-body">
                                <div className="ui-panel-content">Panel Conten</div>
                                <div className="panel-control">
                                    <div className="wrap-control-group hide-indent-bottom">
                                        <div className="control-group with-indent right">
                                            <button className="btn btn-success btn-inverse btn-create"><i className="btn-icon fa fa-plus"></i> <span className="btn-text">Create</span></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 col-sm-6">
                    <div className="ui-sub-section">
                        <div className="ui-sub-title">Panel secondary</div>
                        <div className="panel panel-secondary">
                            <div className="panel-heading">
                                <div className="control-group right" >
                                    <button className="btn btn-success btn-inverse btn-square hidden-xs hidden-sm btn-expand-panel"><i className="btn-icon fa fa-expand"></i><i className="btn-icon fa fa-compress"></i></button>
                                </div>
                                <h3 className="panel-title">Panel title</h3>
                            </div>
                            <div className="panel-body">
                                <div className="panel-body-inner">
                                    <div className="ui-panel-content">Panel Conten</div>
                                </div>
                                <div className="panel-control">
                                    <div className="wrap-control-group hide-indent-bottom">
                                        <div className="control-group with-indent right">
                                            <button className="btn btn-success btn-inverse btn-create"><i className="btn-icon fa fa-plus"></i> <span className="btn-text">Create</span></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-6">
                    <div className="ui-sub-section">
                        <div className="ui-sub-title">Panel small</div>
                        <div className="panel panel-secondary panel-small">
                            <div className="panel-heading">
                                <h3 className="panel-title">Panel title</h3>
                            </div>
                            <div className="panel-body">
                                <div className="ui-panel-content">Panel Conten</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <PanelAccordion />
                <PanelSubAccordion />
            </div>
        </div>
    );
};

export default Panels;
