import React, { PureComponent } from 'react';
import FormSectionList from '../../../form-fields/FormSectionList';
import FormSection from '../../../form-fields/FormSection';

import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import { valuesNames, valuesLabels } from '../forms.config';

const ALLERGIES_TYPE = 'allergies';
const MEDICATIONS_TYPE = 'medications';

export default class DocumentsDetailReferral extends PureComponent {

  render() {
    let { detail, importHandler } = this.props;
    detail = detail || {};

    const date = getDDMMMYYYY(detail[valuesNames.DATE]);
    const referralDate = getDDMMMYYYY(detail[valuesNames.REFERRAL_DATE]);

    return (
      <div className="form">
        <div className="form-group-wrapper">
          <div className="row-expand">
            <div className="col-expand-left">
              <div className="form-group">
                <label className="control-label">{valuesLabels.COMPOSER_NAME}</label>
                <div className="form-control-static">{detail[valuesNames.COMPOSER_NAME]}</div>
              </div>
            </div>
            <div className="col-expand-right">
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
                  <div className="col-expand-right">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.FACILITY_PROVIDER_ID}</label>
                      <div className="form-control-static">{detail[valuesNames.FACILITY_PROVIDER_ID]}</div>
                    </div>
                  </div>
                </div>
              </div>
            </FormSection>
          </FormSectionList>

          <FormSectionList title={valuesLabels.TITLE_REFERRAL}>
            <FormSection>
              <div className="form-group-wrapper">
                <div className="row-expand">
                  <div className="col-expand-left">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.REFERRAL_DATE}</label>
                      <div className="form-control-static">{referralDate}</div>
                    </div>
                  </div>
                  <div className="col-expand-right">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.REFERRAL_TYPE}</label>
                      <div className="form-control-static">{detail[valuesNames.REFERRAL_TYPE]}</div>
                    </div>
                  </div>
                </div>

                <div className="row-expand">
                  <div className="col-expand-left">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.REFERRAL_STATUS}</label>
                      <div className="form-control-static">{detail[valuesNames.REFERRAL_STATUS]}</div>
                    </div>
                  </div>
                  <div className="col-expand-right">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.REFERRAL_REF}</label>
                      <div className="form-control-static">{detail[valuesNames.REFERRAL_REF]}</div>
                    </div>
                  </div>
                </div>

                <div className="row-expand">
                  <div className="col-expand-left">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.REFERRAL_FROM}</label>
                      <div className="form-control-static">{detail[valuesNames.REFERRAL_FROM]}</div>
                    </div>
                  </div>
                  <div className="col-expand-right">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.REFERRAL_TO}</label>
                      <div className="form-control-static">{detail[valuesNames.REFERRAL_TO]}</div>
                    </div>
                  </div>
                </div>

                <div className="row-expand">
                  <div className="col-expand-left">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.REFERRAL_COMMENTS}</label>
                      <div className="form-control-static">{detail[valuesNames.REFERRAL_COMMENTS]}</div>
                    </div>
                  </div>
                </div>

                { detail[valuesNames.REFERRAL_REASONS] && detail[valuesNames.REFERRAL_REASONS].length ?
                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.REFERRAL_COMMENTS}</label>
                        { detail[valuesNames.REFERRAL_REASONS].map((item, index) => {
                          return (<div className="form-control-static" key={index}>
                            {item[valuesNames.REFERRAL_REASON]}
                          </div>)
                        })}
                      </div>
                    </div>
                  </div>
                  : null
                }
              </div>
            </FormSection>
          </FormSectionList>

          <FormSectionList title={valuesLabels.TITLE_PROVIDER}>
            <FormSection>
              <div className="form-group-wrapper">
                <div className="row-expand">
                  <div className="col-expand-left">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.PROVIDER_NAME}</label>
                      <div className="form-control-static">{detail[valuesNames.PROVIDER_NAME]}</div>
                    </div>
                  </div>
                  <div className="col-expand-right">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.PROVIDER_ID}</label>
                      <div className="form-control-static">{detail[valuesNames.PROVIDER_ID]}</div>
                    </div>
                  </div>
                </div>

                <div className="row-expand">
                  <div className="col-expand-left">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.PROVIDER_WORK_PHONE}</label>
                      <div className="form-control-static">{detail[valuesNames.PROVIDER_WORK_PHONE]}</div>
                    </div>
                  </div>
                  <div className="col-expand-right">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.PROVIDER_EMERGENCY_PHONE}</label>
                      <div className="form-control-static">{detail[valuesNames.PROVIDER_EMERGENCY_PHONE]}</div>
                    </div>
                  </div>
                </div>

                <div className="row-expand">
                  <div className="col-expand-left">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.PROVIDER_EMAIL_PHONE}</label>
                      <div className="form-control-static">{detail[valuesNames.PROVIDER_EMAIL_PHONE]}</div>
                    </div>
                  </div>
                </div>
              </div>
            </FormSection>
          </FormSectionList>

          <FormSectionList title={valuesLabels.TITLE_STATUS}>
            <FormSection>
              <div className="form-group-wrapper">
                <div className="row-expand">
                  <div className="col-expand-left">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.STATUS}</label>
                      <div className="form-control-static">{detail[valuesNames.STATUS]}</div>
                    </div>
                  </div>
                  <div className="col-expand-right">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.STATUS_ORIGINAL_CODE}</label>
                      <div className="form-control-static">{detail[valuesNames.STATUS_ORIGINAL_CODE]}</div>
                    </div>
                  </div>
                </div>

                <div className="row-expand">
                  <div className="col-expand-left">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.STATUS_CODE}</label>
                      <div className="form-control-static">{detail[valuesNames.STATUS_CODE]}</div>
                    </div>
                  </div>
                </div>
              </div>
            </FormSection>
          </FormSectionList>

          <FormSectionList title={valuesLabels.TITLE_SYNOPSIS}>
            <FormSection>
              <div className="form-group-wrapper">
                <div className="row-expand">
                  <div className="col-expand-left">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.SYNOPSIS_NARRATIVE}</label>
                      <div className="form-control-static">{detail[valuesNames.SYNOPSIS_NARRATIVE]}</div>
                    </div>
                  </div>
                  <div className="col-expand-right">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.SYNOPSIS_ILLNESS}</label>
                      <div className="form-control-static">{detail[valuesNames.SYNOPSIS_ILLNESS]}</div>
                    </div>
                  </div>
                </div>

                <div className="row-expand">
                  <div className="col-expand-left">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.SYNOPSIS_COMMENTS}</label>
                      <div className="form-control-static">{detail[valuesNames.SYNOPSIS_COMMENTS]}</div>
                    </div>
                  </div>
                  <div className="col-expand-right">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.SYNOPSIS_HOSPITAL}</label>
                      <div className="form-control-static">{detail[valuesNames.SYNOPSIS_HOSPITAL]}</div>
                    </div>
                  </div>
                </div>
              </div>
            </FormSection>
          </FormSectionList>

          {detail[valuesNames.PAST_I_HYPERTENSION] ?
            <FormSectionList title={valuesLabels.TITLE_PAST_ILLNESS}>
              <FormSection>
                <div className="form-group-wrapper">
                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.PAST_I_HYPERTENSION}</label>
                        { detail[valuesNames.PAST_I_HYPERTENSION].map((item, index) => {
                          return (<div className="form-control-static form-control-static--item row" key={index}>
                            <label className="control-label col-lg-4">{item[valuesNames.PAST_I_HYPERTENSION_VALUE]}:</label>
                            <div className="col-lg-8">
                              <div className="form-control-static">{getDDMMMYYYY(item[valuesNames.PAST_I_HYPERTENSION_DATE])}</div>
                            </div>
                          </div>)
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </FormSection>
            </FormSectionList>
            : null
          }

          {detail[valuesNames.SP_CONCLUSION] ?
            <FormSectionList title={valuesLabels.TITLE_SURGICAL_PROCEDURES}>
              <FormSection>
                <div className="form-group-wrapper">
                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.SP_CONCLUSION}</label>
                        { detail[valuesNames.SP_CONCLUSION].map((item, index) => {
                          return (<div className="form-control-static form-control-static--item row" key={index}>
                            <label className="control-label col-lg-4">{item[valuesNames.SP_CONCLUSION_VALUE]}:</label>
                            <div className="col-lg-8">
                              <div className="form-control-static">{getDDMMMYYYY(item[valuesNames.SP_CONCLUSION_DATE])}</div>
                            </div>
                          </div>)
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </FormSection>
            </FormSectionList>
            : null
          }

          {detail[valuesNames.MEDICATIONS] ?
            <FormSectionList title={valuesLabels.TITLE_MEDICATIONS}>
              <div>
                {detail[valuesNames.MEDICATIONS].map((item, index) => {
                  return (<FormSection
                      key={index}
                      title={`${valuesLabels.M_NAME}: ${item[valuesNames.M_NAME]}`}
                      isImportBtn
                      isAccordion
                      isBordered
                      onImportClick={importHandler(MEDICATIONS_TYPE, item)}
                      theme='primary'
                    >
                      <div className="form-group-wrapper">
                        <div className="row-expand">
                          <div className="col-expand-left">
                            <div className="form-group">
                              <label className="control-label">{valuesLabels.M_NAME}</label>
                              <div className="form-control-static">{item[valuesNames.M_NAME]}</div>
                            </div>
                          </div>
                        </div>

                        <div className="row-expand">
                          <div className="col-expand-left">
                            <div className="form-group">
                              <label className="control-label">{valuesLabels.M_START_DATE}</label>
                              <div className="form-control-static">{getDDMMMYYYY(item[valuesNames.M_START_DATE])}</div>
                            </div>
                          </div>
                          <div className="col-expand-right">
                            <div className="form-group">
                              <label className="control-label">{valuesLabels.M_TIME}</label>
                              <div className="form-control-static">{getDDMMMYYYY(item[valuesNames.M_TIME])}</div>
                            </div>
                          </div>
                        </div>

                        <div className="row-expand">
                          <div className="col-expand-left">
                            <div className="form-group">
                              <label className="control-label">{valuesLabels.M_DOSE_A}</label>
                              <div className="form-control-static">{item[valuesNames.M_DOSE_A]}</div>
                            </div>
                          </div>
                          <div className="col-expand-right">
                            <div className="form-group">
                              <label className="control-label">{valuesLabels.M_DOSE_D}</label>
                              <div className="form-control-static">{item[valuesNames.M_DOSE_D]}</div>
                            </div>
                          </div>
                        </div>

                        <div className="row-expand">
                          <div className="col-expand-left">
                            <div className="form-group">
                              <label className="control-label">{valuesLabels.M_DOSE_T}</label>
                              <div className="form-control-static">{item[valuesNames.M_DOSE_T]}</div>
                            </div>
                          </div>
                          <div className="col-expand-right">
                            <div className="form-group">
                              <label className="control-label">{valuesLabels.M_ROUTE}</label>
                              <div className="form-control-static">{item[valuesNames.M_ROUTE]}</div>
                            </div>
                          </div>
                        </div>

                        <div className="row-expand">
                          <div className="col-expand-left">
                            <div className="form-group">
                              <label className="control-label">{valuesLabels.M_TERMINOLOGY}</label>
                              <div className="form-control-static">{item[valuesNames.M_TERMINOLOGY]}</div>
                            </div>
                          </div>
                        </div>

                        <div className="row-expand">
                          <div className="col-expand-left">
                            <div className="form-group">
                              <label className="control-label">{valuesLabels.M_CODE}</label>
                              <div className="form-control-static">{item[valuesNames.M_CODE]}</div>
                            </div>
                          </div>
                        </div>

                        <div className="row-expand">
                          <div className="col-expand-left">
                            <div className="form-group">
                              <label className="control-label">{valuesLabels.M_AUTHOR}</label>
                              <div className="form-control-static">{item[valuesNames.M_AUTHOR]}</div>
                            </div>
                          </div>
                          <div className="col-expand-right">
                            <div className="form-group">
                              <label className="control-label">{valuesLabels.DATE}</label>
                              <div className="form-control-static">{getDDMMMYYYY(item[valuesNames.DATE])}</div>
                            </div>
                          </div>
                        </div>

                        <div className="row-expand">
                          <div className="col-expand-left">
                            <div className="form-group">
                              <label className="control-label">{valuesLabels.M_SOURCE}</label>
                              <div className="form-control-static">{item[valuesNames.M_SOURCE]}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </FormSection>)
                })}
              </div>
            </FormSectionList>
            : null
          }

          <div className="row-expand">
            <div className="col-expand-left">
              <div className="form-group">
                <label className="control-label">{valuesLabels.M_USE}</label>
                <div className="form-control-static">{detail[valuesNames.M_USE]}</div>
              </div>
            </div>
          </div>

          {detail[valuesNames.ALLERGIES] ?
            <FormSectionList title={valuesLabels.TITLE_ALLERGIES}>
              {detail[valuesNames.ALLERGIES].map((item, index) => {
                return (
                  <FormSection
                    key={index}
                    title={`${valuesLabels.A_NAME}: ${item[valuesNames.A_NAME]}`}
                    isImportBtn
                    isAccordion
                    isBordered
                    onImportClick={importHandler(ALLERGIES_TYPE, item)}
                    theme='primary'
                  >
                    <div className="form-group-wrapper">
                      <div className="row-expand">
                        <div className="col-expand-left">
                          <div className="form-group">
                            <label className="control-label">{valuesLabels.A_NAME}</label>
                            <div className="form-control-static">{item[valuesNames.A_NAME]}</div>
                          </div>
                        </div>
                      </div>

                      <div className="row-expand">
                        <div className="col-expand-left">
                          <div className="form-group">
                            <label className="control-label">{valuesLabels.A_STATUS}</label>
                            <div className="form-control-static">{item[valuesNames.A_STATUS]}</div>
                          </div>
                        </div>
                        <div className="col-expand-right">
                          <div className="form-group">
                            <label className="control-label">{valuesLabels.A_TAKEN}</label>
                            <div className="form-control-static">{getDDMMMYYYY(item[valuesNames.A_TAKEN])}</div>
                          </div>
                        </div>
                      </div>

                      <div className="row-expand">
                        <div className="col-expand-left">
                          <div className="form-group">
                            <label className="control-label">{valuesLabels.A_TERMINOLOGY}</label>
                            <div className="form-control-static">{item[valuesNames.A_TERMINOLOGY]}</div>
                          </div>
                        </div>
                        <div className="col-expand-right">
                          <div className="form-group">
                            <label className="control-label">{valuesLabels.A_TERMINOLOGY_CODE}</label>
                            <div className="form-control-static">{item[valuesNames.A_TERMINOLOGY_CODE]}</div>
                          </div>
                        </div>
                      </div>

                      <div className="row-expand">
                        <div className="col-expand-left">
                          <div className="form-group">
                            <label className="control-label">{valuesLabels.A_AUTHOR}</label>
                            <div className="form-control-static">{item[valuesNames.A_AUTHOR]}</div>
                          </div>
                        </div>
                        <div className="col-expand-right">
                          <div className="form-group">
                            <label className="control-label">{valuesLabels.A_DATE_CREATED}</label>
                            <div className="form-control-static">{getDDMMMYYYY(item[valuesNames.DATE_CREATED])}</div>
                          </div>
                        </div>
                      </div>

                      <div className="row-expand">
                        <div className="col-expand-left">
                          <div className="form-group">
                            <label className="control-label">{valuesLabels.A_SOURCE}</label>
                            <div className="form-control-static">{item[valuesNames.A_SOURCE]}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FormSection>

                )
              })}
            </FormSectionList>
            : null
          }

          <div className="row-expand">
            <div className="col-expand-left">
              <div className="form-group">
                <label className="control-label">{valuesLabels.USE_TOBACCO}</label>
                <div className="form-control-static">{detail[valuesNames.USE_TOBACCO]}</div>
              </div>
            </div>
            <div className="col-expand-right">
              <div className="form-group">
                <label className="control-label">{valuesLabels.USE_ALCOHOL}</label>
                <div className="form-control-static">{detail[valuesNames.USE_ALCOHOL]}</div>
              </div>
            </div>
          </div>

          <div className="row-expand">
            <div className="col-expand-left">
              <div className="form-group">
                <label className="control-label">{valuesLabels.PHYSICAL_I}</label>
                <div className="form-control-static">{detail[valuesNames.PHYSICAL_I]}</div>
              </div>
            </div>
          </div>

          <FormSectionList title={valuesLabels.TITLE_VITALS}>
            <FormSection>
              <div className="form-group-wrapper">
                <div className="row-expand">
                  <div className="col-expand-left">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.V_SBP}</label>
                      <div className="form-control-static">{detail[valuesNames.V_SBP]}</div>
                    </div>
                  </div>
                  <div className="col-expand-right">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.V_SBPU}</label>
                      <div className="form-control-static">{detail[valuesNames.V_SBPU]}</div>
                    </div>
                  </div>
                </div>

                <div className="row-expand">
                  <div className="col-expand-left">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.V_DBP}</label>
                      <div className="form-control-static">{detail[valuesNames.V_DBP]}</div>
                    </div>
                  </div>
                  <div className="col-expand-right">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.V_DBPU}</label>
                      <div className="form-control-static">{detail[valuesNames.V_DBPU]}</div>
                    </div>
                  </div>
                </div>

                <div className="row-expand">
                  <div className="col-expand-left">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.V_P}</label>
                      <div className="form-control-static">{detail[valuesNames.V_P]}</div>
                    </div>
                  </div>
                  <div className="col-expand-right">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.V_PU}</label>
                      <div className="form-control-static">{detail[valuesNames.V_PU]}</div>
                    </div>
                  </div>
                </div>

                <div className="row-expand">
                  <div className="col-expand-left">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.V_H}</label>
                      <div className="form-control-static">{detail[valuesNames.V_H]}</div>
                    </div>
                  </div>
                  <div className="col-expand-right">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.V_HU}</label>
                      <div className="form-control-static">{detail[valuesNames.V_HU]}</div>
                    </div>
                  </div>
                </div>

                <div className="row-expand">
                  <div className="col-expand-left">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.V_W}</label>
                      <div className="form-control-static">{detail[valuesNames.V_W]}</div>
                    </div>
                  </div>
                  <div className="col-expand-right">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.V_WU}</label>
                      <div className="form-control-static">{detail[valuesNames.V_WU]}</div>
                    </div>
                  </div>
                </div>

                <div className="row-expand">
                  <div className="col-expand-left">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.V_BM}</label>
                      <div className="form-control-static">{detail[valuesNames.V_BM]}</div>
                    </div>
                  </div>
                  <div className="col-expand-right">
                    <div className="form-group">
                      <label className="control-label">{valuesLabels.V_BMU}</label>
                      <div className="form-control-static">{detail[valuesNames.V_BMU]}</div>
                    </div>
                  </div>
                </div>
              </div>
            </FormSection>
          </FormSectionList>

          <div className="row-expand">
            <div className="col-expand-left">
              <div className="form-group">
                <label className="control-label">{valuesLabels.OTHER_EXAM}</label>
                <div className="form-control-static">{detail[valuesNames.OTHER_EXAM]}</div>
              </div>
            </div>
            <div className="col-expand-right">
              <div className="form-group">
                <label className="control-label">{valuesLabels.DOC_ORIGINAL_SOURCE}</label>
                <div className="form-control-static">{detail[valuesNames.DOC_ORIGINAL_SOURCE]}</div>
              </div>
            </div>
          </div>

        </div>

        <div className="row-expand">
          <div className="col-expand-left">
            <div className="form-group">
              <label className="control-label">{valuesLabels.SOURCE}</label>
              <div className="form-control-static">{detail[valuesNames.SOURCE]}</div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}