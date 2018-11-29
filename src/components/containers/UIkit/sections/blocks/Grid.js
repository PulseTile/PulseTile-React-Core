import React, { Component } from 'react';

/**
 * This component returns content of Grid block of UIkit page
 *
 * @return {XML}
 * @constructor
 */
export default class Grid extends Component {

    state = {
        expandBlocksClassName: 'ui-expanded-wrapper',
        isFull: false,
    };

    toggleFullPanelClass = block => {
        const { isFull } = this.state;
        if (isFull) {
            this.setState({
                expandBlocksClassName: 'ui-expanded-wrapper full-panel full-panel-' + block,
                isFull: !isFull
            })
        } else {
            this.setState({
                expandBlocksClassName: 'ui-expanded-wrapper',
                isFull: !isFull
            })
        }
    };

    render () {
        const { expandBlocksClassName } = this.state;
        return (
            <div id="grid" className="ui-section">
                <h2 className="ui-main-title">Grid System</h2>

                <div id="grid-options" className="ui-section">
                    <strong className="ui-title">Grid options</strong>

                    <div className="ui-sub-section">
                        <strong className="ui-sub-title">Class prefix</strong>
                        <ul>
                            <li>.col-xs-*</li>
                            <li>.col-sm-*</li>
                            <li>.col-md-*</li>
                            <li>.col-lg-*</li>
                        </ul>
                    </div>
                    <div className="ui-sub-section">
                        <strong className="ui-sub-title">Gutter width</strong>
                        <p>&#62;&#61; 480px &#8211; 16px (8px on each side of a column)</p>
                        <p>&#60;&#61; 479px &#8211; 10px (5px on each side of a column)</p>
                    </div>
                </div>

                <div id="grid-examples" className="ui-section">
                    <strong className="ui-title">Grid Examples</strong>

                    <div className="ui-sub-section">
                        <strong className="ui-sub-title">Columns width variations</strong>
                        <div className="row">
                            <div className="col-sm-12"><div className="ui-grid-block">.col-sm-12</div></div>
                        </div>
                        <div className="row">
                            <div className="col-sm-1"><div className="ui-grid-block">.col-sm-1</div></div>
                            <div className="col-sm-11"><div className="ui-grid-block">.col-sm-11</div></div>
                        </div>
                        <div className="row">
                            <div className="col-sm-2"><div className="ui-grid-block">.col-sm-2</div></div>
                            <div className="col-sm-10"><div className="ui-grid-block">.col-sm-10</div></div>
                        </div>
                        <div className="row">
                            <div className="col-sm-3"><div className="ui-grid-block">.col-sm-3</div></div>
                            <div className="col-sm-9"><div className="ui-grid-block">.col-sm-9</div></div>
                        </div>
                        <div className="row">
                            <div className="col-sm-4"><div className="ui-grid-block">.col-sm-4</div></div>
                            <div className="col-sm-8"><div className="ui-grid-block">.col-sm-8</div></div>
                        </div>
                        <div className="row">
                            <div className="col-sm-5"><div className="ui-grid-block">.col-sm-5</div></div>
                            <div className="col-sm-7"><div className="ui-grid-block">.col-sm-7</div></div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6"><div className="ui-grid-block">.col-sm-6</div></div>
                            <div className="col-sm-6"><div className="ui-grid-block">.col-sm-6</div></div>
                        </div>
                        <div className="row">
                            <div className="col-sm-4"><div className="ui-grid-block">.col-sm-4</div></div>
                            <div className="col-sm-4"><div className="ui-grid-block">.col-sm-4</div></div>
                            <div className="col-sm-4"><div className="ui-grid-block">.col-sm-4</div></div>
                        </div>
                        <div className="row">
                            <div className="col-sm-3"><div className="ui-grid-block">.col-sm-3</div></div>
                            <div className="col-sm-3"><div className="ui-grid-block">.col-sm-3</div></div>
                            <div className="col-sm-3"><div className="ui-grid-block">.col-sm-3</div></div>
                            <div className="col-sm-3"><div className="ui-grid-block">.col-sm-3</div></div>
                        </div>
                        <div className="row">
                            <div className="col-sm-2"><div className="ui-grid-block">.col-sm-2</div></div>
                            <div className="col-sm-2"><div className="ui-grid-block">.col-sm-2</div></div>
                            <div className="col-sm-2"><div className="ui-grid-block">.col-sm-2</div></div>
                            <div className="col-sm-2"><div className="ui-grid-block">.col-sm-2</div></div>
                            <div className="col-sm-2"><div className="ui-grid-block">.col-sm-2</div></div>
                            <div className="col-sm-2"><div className="ui-grid-block">.col-sm-2</div></div>
                        </div>
                        <div className="row">
                            <div className="col-sm-1"><div className="ui-grid-block">.col-sm-1</div></div>
                            <div className="col-sm-1"><div className="ui-grid-block">.col-sm-1</div></div>
                            <div className="col-sm-1"><div className="ui-grid-block">.col-sm-1</div></div>
                            <div className="col-sm-1"><div className="ui-grid-block">.col-sm-1</div></div>
                            <div className="col-sm-1"><div className="ui-grid-block">.col-sm-1</div></div>
                            <div className="col-sm-1"><div className="ui-grid-block">.col-sm-1</div></div>
                            <div className="col-sm-1"><div className="ui-grid-block">.col-sm-1</div></div>
                            <div className="col-sm-1"><div className="ui-grid-block">.col-sm-1</div></div>
                            <div className="col-sm-1"><div className="ui-grid-block">.col-sm-1</div></div>
                            <div className="col-sm-1"><div className="ui-grid-block">.col-sm-1</div></div>
                            <div className="col-sm-1"><div className="ui-grid-block">.col-sm-1</div></div>
                            <div className="col-sm-1"><div className="ui-grid-block">.col-sm-1</div></div>
                        </div>
                    </div>
                    <div className="ui-sub-section">
                        <strong className="ui-sub-title">Columns for modules with details information</strong>
                        <div className="row">
                            <div className="col-xs-12 col-panel-main"><div className="ui-grid-block">.col-panel-main</div></div>
                            <div className="col-xs-12 col-panel-details"><div className="ui-grid-block">.col-panel-details</div></div>
                        </div>
                    </div>

                    <div className="ui-sub-section">
                        <strong className="ui-sub-title">Columns for expanded blocks</strong>
                        <div className={expandBlocksClassName}>
                            <div className="row">
                                <div className="col-xs-12 col-panel-main">
                                    <div className="panel panel-secondary">
                                        <div className="panel-heading">
                                            <div className="control-group right">
                                                <button type="button" id="gridButtonMain" className="btn btn-success btn-inverse btn-square hidden-xs hidden-sm btn-expand-panel" onClick={() => this.toggleFullPanelClass('main')} >
                                                    <i className="btn-icon fa fa-expand"></i><i className="btn-icon fa fa-compress"></i>
                                                </button>
                                            </div>
                                            <h3 className="panel-title">.col-panel-main</h3>
                                        </div>
                                        <div className="panel-body">
                                            <div className="panel-body-inner">
                                                <div className="row-expand">
                                                    <div className="col-expand-left"><div className="ui-grid-block">.col-expand-left</div></div>
                                                    <div className="col-expand-right"><div className="ui-grid-block">.col-expand-right</div></div>
                                                </div>
                                                <div className="row-expand">
                                                    <div className="col-expand-left"><div className="ui-grid-block">.col-expand-left</div></div>
                                                    <div className="col-expand-right"><div className="ui-grid-block">.col-expand-right</div></div>
                                                </div>
                                                <div className="row-expand">
                                                    <div className="col-expand-left">
                                                        <div className="ui-grid-block hidden-expand">.hidden-expand</div>
                                                        <div className="ui-grid-block visible-expand">.visible-expand</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-panel-details">
                                    <div className="panel panel-secondary">
                                        <div className="panel-heading">
                                            <div className="control-group right">
                                                <button type="button" id="gridButtonDetails" className="btn btn-success btn-inverse btn-square hidden-xs hidden-sm btn-expand-panel" onClick={() => this.toggleFullPanelClass('details')} >
                                                    <i className="btn-icon fa fa-expand"></i><i className="btn-icon fa fa-compress"></i>
                                                </button>
                                            </div>
                                            <h3 className="panel-title">.col-panel-details</h3>
                                        </div>
                                        <div className="panel-body">
                                            <div className="panel-body-inner">
                                                <div className="row-expand">
                                                    <div className="col-expand-left"><div className="ui-grid-block">.col-expand-left</div></div>
                                                    <div className="col-expand-right"><div className="ui-grid-block">.col-expand-right</div></div>
                                                </div>
                                                <div className="row-expand">
                                                    <div className="col-expand-left"><div className="ui-grid-block">.col-expand-left</div></div>
                                                    <div className="col-expand-right"><div className="ui-grid-block">.col-expand-right</div></div>
                                                </div>
                                                <div className="row-expand">
                                                    <div className="col-expand-left">
                                                        <div className="ui-grid-block hidden-not-expand">.hidden-not-expand</div>
                                                        <div className="ui-grid-block visible-not-expand">.visible-not-expand</div>
                                                    </div>
                                                </div>
                                            </div>
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
