import React, { PureComponent } from 'react';

import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel';
import DocumentsDetailDischarge from './DocumentsDetailDischarge';
import DocumentsDetailReferral from './DocumentsDetailReferral';
import ConfirmationModal from '../../../ui-elements/ConfirmationModal/ConfirmationModal';
import {valuesNames} from '../forms.config';
import PropTypes from "prop-types";
import {clientUrls} from "../../../../config/client-urls.constants";

const DOCUMENT_PANEL = 'documentPanel';
const DOCUMENT_TYPE_DISCHARGE = 'discharge';
const DOCUMENT_TYPE_REFERRAL = 'referral';

export default class DocumentsDetail extends PureComponent {
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
    history: PropTypes.object,
  };

  state = {
    isOpenModal: false,
    typeImportData: '',
    importData: null
  };

  getTypeOfDocument = () => {
    let { detail } = this.props;
    let typeOfDocument = null;
    detail = detail || {};

    if (detail[valuesNames.TYPE]) {
      const documentType = detail[valuesNames.TYPE].toLowerCase();

      if (documentType.indexOf(DOCUMENT_TYPE_DISCHARGE) >= 0) {
        typeOfDocument = DOCUMENT_TYPE_DISCHARGE;
      }
      if (documentType.indexOf(DOCUMENT_TYPE_REFERRAL) >= 0) {
        typeOfDocument = DOCUMENT_TYPE_REFERRAL;
      }
    }

    return typeOfDocument;
  };

  openModal = () => {this.setState({isOpenModal: true})};

  closeModal = () => {this.setState({isOpenModal: false})};

  importHandler = (typeImportData, importData) => () => {
    this.openModal();
    this.setState({typeImportData, importData});
  };

  onOkModal = () => {
    const { userId } = this.props;
    const { typeImportData, importData } = this.state;

    this.closeModal();

    importData.isImport = true;
    importData.originalSource = location.href;
    importData.originalComposition = this.getTypeOfDocument();

    this.context.router.history.push({
      pathname: `${clientUrls.PATIENTS}/${userId}/${typeImportData}/create`,
      state: { importData }
    });
  };

  render() {
    const { onExpand, onShow, openedPanel, expandedPanel, currentPanel, onEdit, editedPanel, onCancel, onSaveSettings, testResultsDetailFormValues } = this.props;
    let { detail } = this.props;
    const { isOpenModal } = this.state;
    const typeOfDocument = this.getTypeOfDocument();
    detail = detail || {};

    return (
      <div className="section-detail">
        <div className="panel-group accordion">
          {(expandedPanel === DOCUMENT_PANEL || expandedPanel === 'all') ? <PluginDetailPanel
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
              { typeOfDocument === DOCUMENT_TYPE_DISCHARGE ?
                <DocumentsDetailDischarge
                  detail={detail}
                  importHandler={this.importHandler}
                />
                : typeOfDocument === DOCUMENT_TYPE_REFERRAL ?
                  <DocumentsDetailReferral
                    detail={detail}
                    importHandler={this.importHandler}
                  />
                  : <div className="form">
                    <div className="form-group-wrapper">
                      <div className="form-group">
                        <div className="form-control-static">No Data</div>
                      </div>
                    </div>
                  </div>
              }
            </div>
          </PluginDetailPanel> : null}
        </div>
        {isOpenModal && <ConfirmationModal
          title={'Documents Import Access Disclaimer'}
          isShow={true}
          onOk={this.onOkModal}
          onHide={this.closeModal}
          onCancel={this.closeModal}
          isShowOkButton
          isShowCancelButton
          textOkButton='Agree'
          textCancelButton='Decline'
        >
          <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec lobortis elit. Aenean mi nunc, feugiat ut aliquet non, iaculis vel tellus. Donec semper felis placerat, posuere nisi a, suscipit turpis. Integer sit amet lacus pellentesque, vestibulum libero id, sagittis nisi. Phasellus eleifend, neque eget vulputate semper, enim dui dictum neque, non iaculis felis augue at nunc.</span>
        </ConfirmationModal>}
      </div>
    )
  }
}