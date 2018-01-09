import React, { PureComponent } from 'react';

import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import { valuesNames, valuesLabels } from '../forms.config';
import classNames from "classnames";

export default class DocumentsDetailDisharge extends PureComponent {

  render() {
    let { detail } = this.props;
    detail = detail || {};

    console.log('detail', detail);

    const date = getDDMMMYYYY(detail[valuesNames.DATE]);
    const dishargingDate = getDDMMMYYYY(detail[valuesNames.PI_DISHARGING_DATE]);
    const addmissionDate = getDDMMMYYYY(detail[valuesNames.PI_ADMISSION_DATE]);

    return (
      <div className="form">
        <div className="row-expand">
          <div className="col-expand-left">
            <div className="form-group">
              <label className="control-label">{valuesLabels.NAME}</label>
              <div className="form-control-static">{detail[valuesNames.NAME]}</div>
            </div>
          </div>
          <div className={classNames({'col-expand-left': !detail[valuesNames.NAME], 'col-expand-right': detail[valuesNames.NAME]})}>
            <div className="form-group">
              <label className="control-label">{valuesLabels.DATE}</label>
              <div className="form-control-static">{date}</div>
            </div>
          </div>
        </div>

        <div className="row-expand">
          <div className="col-expand-left">
            <div className="form-group">
              <label className="control-label">{valuesLabels.AUTHOR}</label>
              <div className="form-control-static">{detail[valuesNames.AUTHOR]}</div>
            </div>
          </div>
        </div>

        <div className="form-group-section-list">
          <div className="form-group-section-list-heading">
            <label className="control-label">{valuesLabels.TITLE_FACILITY}</label>
          </div>
          <div className="form-group-section">
            <div className="form-group-section-body">
              <div className="form-group-wrapper">
                <div className="row-expand">
                  <div className="col-expand-left">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.FACILITY}</label>
                      <div className="form-control-static">{detail[valuesNames.FACILITY]}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-group-section-list">
          <div className="form-group-section-list-heading">
            <label className="control-label">{valuesLabels.TITLE_PATIENT_INDENTIFIER}</label>
          </div>
          <div className="form-group-section">
            <div className="form-group-section-body">
              <div className="form-group-wrapper">
                <div className="row-expand">
                  { detail[valuesNames.PI_MRNTYPE] ?
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.PI_MRNTYPE}</label>
                        <div className="form-control-static">{detail[valuesNames.PI_MRNTYPE]}</div>
                      </div>
                    </div>
                    : null
                  }
                  { detail[valuesNames.PI_OTHTYPE] ?
                    <div className={classNames({'col-expand-left': !detail[valuesNames.PI_MRNTYPE], 'col-expand-right': detail[valuesNames.PI_MRNTYPE]})}>
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.PI_OTHTYPE}</label>
                        <div className="form-control-static">{detail[valuesNames.PI_OTHTYPE]}</div>
                      </div>
                    </div>
                    : null
                  }
                </div>

                <div className="row-expand">
                  { detail[valuesNames.PI_GMSTYPE] ?
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.PI_GMSTYPE}</label>
                        <div className="form-control-static">{detail[valuesNames.PI_GMSTYPE]}</div>
                      </div>
                    </div>
                    : null
                  }
                </div>

                <div className="row-expand">
                  { detail[valuesNames.PI_NAME] ?
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.PI_NAME}</label>
                        <div className="form-control-static">{detail[valuesNames.PI_NAME]}</div>
                      </div>
                    </div>
                    : null
                  }
                  { detail[valuesNames.PI_ID_TYPE] ?
                    <div className={classNames({'col-expand-left': !detail[valuesNames.PI_NAME], 'col-expand-right': detail[valuesNames.PI_NAME]})}>
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.PI_ID_TYPE}</label>
                        <div className="form-control-static">{detail[valuesNames.PI_ID_TYPE]}</div>
                      </div>
                    </div>
                    : null
                  }
                </div>

                <div className="row-expand">
                  { detail[valuesNames.PI_SOURCE] ?
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.PI_SOURCE}</label>
                        <div className="form-control-static">{detail[valuesNames.PI_SOURCE]}</div>
                      </div>
                    </div>
                    : null
                  }
                  { detail[valuesNames.PI_DISHARGING] ?
                    <div className={classNames({'col-expand-left': !detail[valuesNames.PI_SOURCE], 'col-expand-right': detail[valuesNames.PI_SOURCE]})}>
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.PI_DISHARGING}</label>
                        <div className="form-control-static">{detail[valuesNames.PI_DISHARGING]}</div>
                      </div>
                    </div>
                    : null
                  }
                </div>

                <div className="row-expand">
                  { detail[valuesNames.PI_DISHARGING_DATE] ?
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.PI_DISHARGING_DATE}</label>
                        <div className="form-control-static">{dishargingDate}</div>
                      </div>
                    </div>
                    : null
                  }
                </div>

                <div className="row-expand">
                  { detail[valuesNames.PI_CLINICAL] ?
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.PI_CLINICAL}</label>
                        <div className="form-control-static">{detail[valuesNames.PI_CLINICAL]}</div>
                      </div>
                    </div>
                    : null
                  }
                  { detail[valuesNames.PI_ADMISSION_DATE] ?
                    <div className={classNames({'col-expand-left': !detail[valuesNames.PI_CLINICAL], 'col-expand-right': detail[valuesNames.PI_CLINICAL]})}>
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.PI_ADMISSION_DATE}</label>
                        <div className="form-control-static">{addmissionDate}</div>
                      </div>
                    </div>
                    : null
                  }
                </div>
              </div>
            </div>
          </div>
        </div>


        { detail[valuesNames.DIAGNOSIS] ?
          <div className="form-group-section-list">
            <div className="form-group-section-list-heading">
              <label className="control-label">{valuesLabels.TITLE_DIAGNOSIS}</label>
            </div>
            {detail[valuesNames.DIAGNOSIS].map((item, index) => {
              return (<div className="form-group-section form-group-section-bordered form-group-section-primary accordion" key={index}>
                <div className="form-group-section-heading">
                  <div className="control-group without-side-indent right">
                    {/*<button className="btn btn-primary" ng-click="importToCreate('diagnoses', item)"><span className="btn-text">Import Data</span></button>*/}
                    <button className="btn btn-primary"><span className="btn-text">Import Data</span></button>
                    {/*<button className="btn btn-primary btn-inverse btn-square btn-form-group-section-toggle" ng-click="toggleSubAccordion()"><i className="btn-icon fa fa-chevron-up"></i></button>*/}
                    <button className="btn btn-primary btn-inverse btn-square btn-form-group-section-toggle"><i className="btn-icon fa fa-chevron-up" /></button>
                  </div>
                  <h3 className="panel-title">{valuesLabels.DG_PROBLEM}: {item[valuesNames.DG_PROBLEM]}</h3>
                </div>
                <div className="form-group-section-body">
                  <div className="form-group-wrapper">
                    <div className="row-expand">
                      <div className="col-expand-left">
                        <div className="form-group">
                          <label className="control-label">{valuesLabels.DG_PROBLEM}</label>
                          <div className="form-control-static">{item[valuesNames.DG_PROBLEM]}</div>
                        </div>
                      </div>
                      <div className="col-expand-right">
                        <div className="form-group">
                          <label className="control-label">{valuesLabels.DG_DESCR}</label>
                          <div className="form-control-static">{item[valuesNames.DG_DESCR]}</div>
                        </div>
                      </div>
                    </div>
                    <div className="row-expand">
                      <div className="col-expand-left">
                        <div className="form-group">
                          <label className="control-label">{valuesLabels.DG_TERMINOLOGY}</label>
                          <div className="form-control-static">{item[valuesNames.DG_TERMINOLOGY]}</div>
                        </div>
                      </div>
                      <div className="col-expand-right">
                        <div className="form-group">
                          <label className="control-label">{valuesLabels.DG_TERMINOLOGY_CODE}</label>
                          <div className="form-control-static">{item[valuesNames.DG_TERMINOLOGY_CODE]}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>)
            })}
          </div>
          : null
        }





      </div>
    )
  }
}