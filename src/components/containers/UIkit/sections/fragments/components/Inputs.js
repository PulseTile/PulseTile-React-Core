import React from 'react';

/**
 * This component returns content of Inputs section
 *
 * @return {XML}
 * @constructor
 */
const Inputs = () => {
    return (
        <div id="inputs" className="ui-section">
            <strong className="ui-title">Inputs</strong>
            <div className="form-group-wrapper">
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <div className="form-group">
                            <label for="name" className="control-label">Input simple</label>
                            <div className="input-holder">
                                <input type="text" className="form-control input-sm" />
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <div className="form-group">
                            <label for="name" className="control-label">Input simple (disabled)</label>
                            <div className="input-holder">
                                <input type="text" className="form-control input-sm" value="text" disabled/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <div className="form-group">
                            <label className="control-label">Input with addon</label>
                            <div className="inner-addon addon-left">
                                <div className="addon">
                                    <i className="fa fa-filter"></i>
                                </div>
                                <input type="text" className="form-control input-sm"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <div className="form-group">
                            <label className="control-label">Input with addon (disabled)</label>
                            <div className="inner-addon addon-left">
                                <div className="addon">
                                    <i className="fa fa-filter"></i>
                                </div>
                                <input type="text" className="form-control input-sm" value="text" disabled/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Inputs;
