import React, { PureComponent } from 'react';

import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel'
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import { valuesNames, valuesLabels } from '../forms.config';

const DOCUMENT_PANEL = 'testResultPanel';
const META_PANEL = 'metaPanel';

export default class DocumentsDetail extends PureComponent {
  getListOfResult(list) {
    if (!list) { return null };
    const resultList = [];

    list.forEach((item, index, list) => {
      if (index % 2 === 0) {
        const listItem = [item];

        if (list[index + 1]) {
          listItem.push(list[index + 1]);
        }

        resultList.push(listItem);
      }
    });

    return resultList;
  };

  render() {
    const { onExpand, onShow, openedPanel, expandedPanel, currentPanel, onEdit, editedPanel, onCancel, onSaveSettings, testResultsDetailFormValues } = this.props;
    let { detail } = this.props;
    detail = detail || {};
    const sampleTaken = getDDMMMYYYY(detail[valuesNames.TAKEN]);
    const dateCreated = getDDMMMYYYY(detail[valuesNames.DATE]);
    const listOfResults = this.getListOfResult(detail[valuesNames.TR]);

    return (
      <div className="section-detail">
        <div className="panel-group accordion">
          {(expandedPanel === DOCUMENT_PANEL || expandedPanel === 'all') && !editedPanel[DOCUMENT_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={DOCUMENT_PANEL}
            title="Test Result"
            onShow={onShow}
            isOpen={openedPanel === DOCUMENT_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={testResultsDetailFormValues}
            isBtnShowPanel
            isShowControlPanel={false}
          >
            <div className="panel-body-inner">
              <div className="form">
                <div className="form-group-wrapper">
                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.NAME}</label>
                        <div className="form-control-static">{detail[valuesNames.NAME]}</div>
                      </div>
                    </div>
                  </div>

                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.STATUS}</label>
                        <div className="form-control-static">{detail[valuesNames.STATUS]}</div>
                      </div>
                    </div>
                    <div className="col-expand-right">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.TAKEN}</label>
                        <div className="form-control-static">{sampleTaken}</div>
                      </div>
                    </div>
                  </div>

                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.CONCLUSION}</label>
                        <div className="form-control-static">{detail[valuesNames.CONCLUSION]}</div>
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
                    <div className="col-expand-right">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.DATE}</label>
                        <div className="form-control-static">{dateCreated}</div>
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
              </div>
            </div>
          </PluginDetailPanel> : null}

          {(expandedPanel === META_PANEL || expandedPanel === 'all') ? <PluginDetailPanel
            onExpand={onExpand}
            name={META_PANEL}
            title={`Results (${(detail[valuesNames.TR] && (detail[valuesNames.TR].length)) || 0})`}
            isOpen={openedPanel === META_PANEL}
            onShow={onShow}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues
            isBtnShowPanel
            isShowControlPanel={false}
          >
            <div className="panel-expand-wrapper">
              {listOfResults && listOfResults.length
                ? listOfResults.map((results, i) => (
                    <div className="panel-expand-row" key={`row-${i}`}>
                      {results.map((item, i) => (
                        <div className="panel-expand-item" key={`row-${i}`}>
                          <div className="panel-body-inner">
                            <div className="form">
                              <div className="form-group-wrapper">
                                <div className="form-group">
                                  <label className="control-label">{valuesLabels.TR_RESULT}</label>
                                  <div className="form-control-static">{item[valuesNames.TR_RESULT]}</div>
                                </div>
                                <div className="form-group">
                                  <label className="control-label">{valuesLabels.TR_VALUE}</label>
                                  <div className="form-control-static">{item[valuesNames.TR_VALUE]}</div>
                                </div>
                                <div className="form-group">
                                  <label className="control-label">{valuesLabels.TR_UNIT}</label>
                                  <div className="form-control-static">{item[valuesNames.TR_UNIT]}</div>
                                </div>
                                <div className="form-group">
                                  <label className="control-label">{valuesLabels.TR_NORMAL}</label>
                                  <div className="form-control-static">{item[valuesNames.TR_NORMAL]}</div>
                                </div>
                                { item[valuesNames.TR_COMMENT]
                                  ? <div className="form-group" >
                                    <label className="control-label">{valuesLabels.TR_COMMENT}</label>
                                    <div className="form-control-static">{item[valuesNames.TR_COMMENT]}</div>
                                  </div>
                                  : null
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                ))
                : <div className="panel-body-inner">
                    <div className="form">
                      <div className="form-group-wrapper">
                        <div className="form-group">
                          <div className="form-control-static">No results</div>
                        </div>
                      </div>
                    </div>
                  </div>
              }
            </div>
          </PluginDetailPanel> : null}
        </div>
      </div>
    )
  }
}