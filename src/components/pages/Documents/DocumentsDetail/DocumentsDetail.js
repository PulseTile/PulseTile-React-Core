import React, { PureComponent } from 'react';

import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel';
import DocumentsDetailDischarge from './DocumentsDetailDischarge';
import DocumentsDetailReferral from './DocumentsDetailReferral';
import ConfirmationModal from '../../../ui-elements/ConfirmationModal/ConfirmationModal';
import {valuesLabels, valuesNames} from '../forms.config';

const DOCUMENT_PANEL = 'documentPanel';
const DOCUMENT_TYPE_DISCHARGE = 'discharge';
const DOCUMENT_TYPE_REFERRAL = 'referral';

export default class DocumentsDetail extends PureComponent {

  state = {
    isOpenModal: false,
    typeImportData: ''
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

    console.log('typeOfDocument', typeOfDocument);
    return typeOfDocument;
  };

  openModal = () => {this.setState({isOpenModal: true})};

  closeModal = () => {this.setState({isOpenModal: false})};

  importHandler = (typeImportData, importData) => () => {
    this.openModal();
    this.setState({typeImportData});
    console.log('data for import', importData);
  };

  onOkModal = () => {
    this.closeModal();
  };

  render() {
    const { onExpand, onShow, openedPanel, expandedPanel, currentPanel, onEdit, editedPanel, onCancel, onSaveSettings, testResultsDetailFormValues } = this.props;
    let { detail } = this.props;
    const { isOpenModal } = this.state;
    const typeOfDocument = this.getTypeOfDocument();
    detail = detail || {};

    const detail3 = {
      source: 'source',
      author_name: 'author_name',
      facility: 'facility',
      providerContact_id: '156',
      composerName: 'composerName',
      referralDateTime: 1515493787482,
      referralType: 'referralType',
      referralStatus_value: 'referralStatus_value',
      referralReferenceNumber: 'referralReferenceNumber',
      referredFrom: 'referredFrom',
      referredTo: 'referredTo',
      referralComments: 'referralComments',
      reasonForReferral: [{
        reason: '1'
      }, {
        reason: '2'
      }],
      providerContact_organisationName: 'providerContact_organisationName',
      providerContact_workNumber: 'providerContact_workNumber',
      providerContact_emergencyNumber: 'providerContact_emergencyNumber',
      providerContact_email: 'providerContact_email',
      referralStatus_originalCode: 'referralStatus_originalCode',
      referralStatus_code: 'referralStatus_code',
      clinicalNarrative: 'clinicalNarrative',
      presentIllness: 'presentIllness',
      clinicalSynopsisComments: 'clinicalSynopsisComments',
      previousHospitalAttendance: 'previousHospitalAttendance',
      pastIllensses: [{
        value: 1,
        date: 1515493787482
      }, {
        value: 2,
        date: 2515493787482
      }, {
        value: 3,
        date: 3515493787482
      }],
      conclusion: [{
        value: 1,
        date: 1515493787482
      }, {
        value: 2,
        date: 2515493787482
      }, {
        value: 3,
        date: 3515493787482
      }],
      medications: [{
        name: 'name',
        startDate: 1515493787482,
        startTime: 1515493787482,
        doseAmount: 'doseAmount',
        doseDirections: 'doseDirections',
        doseTiming: 'doseTiming',
        route: 'route',
        termonology: 'termonology',
        code: 'code',
        author_name: 'author_name',
        source: 'source',
      }],
      medication_anticoagulation_use: 'medication_anticoagulation_use',
      allergies: [{
        testName: 'testName',
        status: 'status',
        sampleTaken: 1515493787482,
        conclusion: 'conclusion',
        author: 'author',
        dateCreated: 1515493787482,
        source: 'source',
      }],
      tobaccoUse: 'tobaccoUse',
      alcoholUse: 'alcoholUse',
      physicalImparement: 'physicalImparement',
      systolicBP: 'systolicBP',
      systolicBP_units: 'systolicBP_units',
      diastolicBP: 'diastolicBP',
      diastolicBP_units: 'diastolicBP_units',
      pulse: 'pulse',
      pulse_units: 'pulse_units',
      height: 'height',
      height_units: 'height_units',
      weight: 'weight',
      weight_units: 'weight_units',
      bodyMass: 'bodyMass',
      bodyMass_units: 'bodyMass_units',
      otherExaminationFindings: 'otherExaminationFindings',
      documentOriginalSource: 'documentOriginalSource',
    };

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