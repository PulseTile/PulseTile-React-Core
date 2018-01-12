import React, { PureComponent } from 'react';
import FormSectionList from '../../../form-fields/FormSectionList';
import FormSection from '../../../form-fields/FormSection';

import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import { valuesNames, valuesLabels } from '../forms.config';
import classNames from "classnames";

const DIAGNOSIS_TYPE = 'diagnoses';

export default class DocumentsDetailDischarge extends PureComponent {

  render() {
    let { detail, importHandler } = this.props;
    detail = detail || {};

    const date = getDDMMMYYYY(detail[valuesNames.DATE]);
    const dischargingDate = getDDMMMYYYY(detail[valuesNames.PI_DISCHARGING_DATE]);
    const addmissionDate = getDDMMMYYYY(detail[valuesNames.PI_ADMISSION_DATE]);

    return (
      <div className="form">
        <div className="form-group-wrapper">
          <div className="row-expand">
            {detail[valuesNames.NAME] ?
              <div className="col-expand-left">
                <div className="form-group">
                  <label className="control-label">{valuesLabels.NAME}</label>
                  <div className="form-control-static">{detail[valuesNames.NAME]}</div>
                </div>
              </div>
              : null
            }
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

          <FormSectionList title={valuesLabels.TITLE_FACILITY}>
            <FormSection>
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
            </FormSection>
          </FormSectionList>

          <FormSectionList title={valuesLabels.TITLE_PATIENT_INDENTIFIER}>
            <FormSection>
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
                  { detail[valuesNames.PI_DISCHARGING] ?
                    <div className={classNames({'col-expand-left': !detail[valuesNames.PI_SOURCE], 'col-expand-right': detail[valuesNames.PI_SOURCE]})}>
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.PI_DISCHARGING}</label>
                        <div className="form-control-static">{detail[valuesNames.PI_DISCHARGING]}</div>
                      </div>
                    </div>
                    : null
                  }
                </div>

                <div className="row-expand">
                  { detail[valuesNames.PI_DISCHARGING_DATE] ?
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.PI_DISCHARGING_DATE}</label>
                        <div className="form-control-static">{dischargingDate}</div>
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
            </FormSection>
          </FormSectionList>

          { detail[valuesNames.DIAGNOSIS] ?
            <FormSectionList title={valuesLabels.TITLE_DIAGNOSIS}>
              {detail[valuesNames.DIAGNOSIS].map((item, index) => {
                return (<FormSection
                  key={index}
                  title={`${valuesLabels.DG_PROBLEM}: ${item[valuesNames.DG_PROBLEM]}`}
                  isImportBtn
                  isAccordion
                  isBordered
                  onImportClick={importHandler(DIAGNOSIS_TYPE, item)}
                  theme='primary'
                >
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
                </FormSection>)
              })}
            </FormSectionList>
            : null
          }
        </div>
      </div>
    )
  }
}