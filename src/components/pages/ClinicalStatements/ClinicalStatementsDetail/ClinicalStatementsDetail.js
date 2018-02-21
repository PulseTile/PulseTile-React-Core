import React, { PureComponent } from 'react';

import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel';
import { Tag, TagList } from '../../../ui-elements/Tag/Tag';
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import { valuesNames, valuesLabels } from '../forms.config';

const CLINICAL_STATEMENT_PANEL = 'clinicalStatementPanel';

export default class ClinicalStatementsDetail extends PureComponent {
  getTagList = (tags) => {
    const tagList = [];
    for (let key in tags) {
      tagList.push(<Tag key={`tag-${key}`} style="success">{key}</Tag>)
    }
    return tagList;
  };

  render() {
    const { onExpand, onShow, openedPanel, expandedPanel, currentPanel, onEdit, editedPanel, onCancel, onSaveSettings, clinicalStatementsDetailFormValues, metaPanelFormValues, isSubmit } = this.props;
    let { detail } = this.props;
    detail = detail || {};

    if (detail[valuesNames.STATEMENT]) {
      detail[valuesNames.STATEMENT] = detail[valuesNames.STATEMENT].replace(/fa-close|tag|editable|display: block;|display|block/gi, '');
    }
    const dateCreated = getDDMMMYYYY(detail[valuesNames.DATE_CREATED]);

    return (
      <div className="section-detail">
        <div className="panel-group accordion">
          {(expandedPanel === CLINICAL_STATEMENT_PANEL || expandedPanel === 'all') && !editedPanel[CLINICAL_STATEMENT_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={CLINICAL_STATEMENT_PANEL}
            title="Clinical Statement"
            onShow={onShow}
            isOpen={openedPanel === CLINICAL_STATEMENT_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={clinicalStatementsDetailFormValues}
            isBtnShowPanel={false}
            isShowControlPanel={false}
          >
            <div className="panel-body-inner">
              <div className="form">
                <div className="form-group-wrapper">
                  <div className="form-group">
                    <label className="control-label">{valuesLabels.TYPE}</label>
                    <div className="form-control-static">{detail[valuesNames.TYPE]}</div>
                  </div>

                  <div className="form-group">
                    <label className="control-label">{valuesLabels.STATEMENT}</label>
                    <div className="form-control-static" dangerouslySetInnerHTML={{ __html: detail[valuesNames.STATEMENT] }} />
                  </div>

                  <div className="form-group">
                    <label className="control-label">{valuesLabels.TAGS}</label>
                    <div className="form-control-static">
                      <TagList>
                        {this.getTagList(detail[valuesNames.TAGS])}
                      </TagList>
                     </div>
                  </div>

                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.DATE}</label>
                        <div className="form-control-static">{dateCreated}</div>
                      </div>
                    </div>
                    <div className="col-expand-right">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.AUTHOR}</label>
                        <div className="form-control-static">{detail[valuesNames.AUTHOR]}</div>
                      </div>
                    </div>
                  </div>


                  <div className="form-group">
                    <label className="control-label">{valuesLabels.SOURCE}</label>
                    <div className="form-control-static">{detail[valuesNames.SOURCE]}</div>
                  </div>
                </div>
              </div>
            </div>
          </PluginDetailPanel> : null}
        </div>
      </div>
    )
  }
}
