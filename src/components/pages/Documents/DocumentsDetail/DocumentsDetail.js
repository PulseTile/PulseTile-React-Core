import React, { PureComponent } from 'react';
import _ from 'lodash/fp';

import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel';
import DocumentsDetailDisharge from './DocumentsDetailDisharge';

const DOCUMENT_PANEL = 'documentPanel';
const DOCUMENT_TYPE_DISHARGE = 'disharge';
const DOCUMENT_TYPE_REFERRAL = 'referral';

export default class DocumentsDetail extends PureComponent {

  getTypeOfDocument = () => {
    let { documentsList, detail } = this.props;
    let typeOfDocument = null;
    documentsList = documentsList || [];
    detail = detail || {};

    if (documentsList.length && detail.sourceId) {
      // const documentsItem = _.find(documentsList, {sourceId: detail.sourceId});
      // const documentType = documentsItem.documentType.toLowerCase();
      // TODO: to change find of documentType after add this field to Data from BackEnd;
      const documentType = DOCUMENT_TYPE_DISHARGE;

      if (documentType.indexOf(DOCUMENT_TYPE_DISHARGE) >= 0) {
        typeOfDocument = DOCUMENT_TYPE_DISHARGE;
      }
      if (documentType.indexOf(DOCUMENT_TYPE_REFERRAL) >= 0) {
        typeOfDocument = DOCUMENT_TYPE_REFERRAL;
      }
    }

    console.log('typeOfDocument', typeOfDocument);
    return typeOfDocument;
  };

  render() {
    const { onExpand, onShow, openedPanel, expandedPanel, currentPanel, onEdit, editedPanel, onCancel, onSaveSettings, testResultsDetailFormValues } = this.props;
    let { detail } = this.props;
    const typeOfDocument = this.getTypeOfDocument();
    detail = detail || {};

    return (
      <div className="section-detail">
        <div className="panel-group accordion">
          {(expandedPanel === DOCUMENT_PANEL || expandedPanel === 'all') && !editedPanel[DOCUMENT_PANEL] ? <PluginDetailPanel
            onExpand={onExpand}
            name={DOCUMENT_PANEL}
            title="Document Details"
            onShow={onShow}
            isOpen={openedPanel === DOCUMENT_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            onCancel={onCancel}
            onSaveSettings={onSaveSettings}
            formValues={testResultsDetailFormValues}
            isBtnShowPanel={false}
            isShowControlPanel={false}
          >
            <div className="panel-body-inner">
              { typeOfDocument === DOCUMENT_TYPE_DISHARGE ?
                <DocumentsDetailDisharge
                  detail={detail}
                />
                : typeOfDocument === DOCUMENT_TYPE_REFERRAL ?
                  <DocumentsDetailDisharge
                    detail={detail}
                  />
                  : null
              }
            </div>
          </PluginDetailPanel> : null}
        </div>
      </div>
    )
  }
}