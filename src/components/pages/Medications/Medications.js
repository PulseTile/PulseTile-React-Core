import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import _ from 'lodash/fp';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lifecycle, compose } from 'recompose';

import PluginListHeader from '../../plugin-page-component/PluginListHeader';
import PluginMainPanel from '../../plugin-page-component/PluginMainPanel';

import { columnsConfig, defaultColumnsSelected } from './medications-table-columns.config'
import { fetchPatientMedicationsRequest } from './ducks/fetch-patient-medications.duck';
import { fetchPatientMedicationsCreateRequest } from './ducks/fetch-patient-medications-create.duck';
import { fetchPatientMedicationsDetailRequest } from './ducks/fetch-patient-medications-detail.duck';
import { fetchPatientMedicationsDetailEditRequest } from './ducks/fetch-patient-medications-detail-edit.duck';
import { fetchPatientMedicationsOnMount, fetchPatientMedicationsDetailOnMount } from '../../../utils/HOCs/fetch-patients.utils';
import { patientMedicationsSelector, medicationsDetailFormStateSelector, medicationsCreateFormStateSelector, prescriptionPanelFormStateSelector, patientMedicationsDetailSelector } from './selectors';
import { clientUrls } from '../../../config/client-urls.constants';
import { checkIsValidateForm, operationsOnCollection } from '../../../utils/plugin-helpers.utils';
import MedicationsDetail from './MedicationsDetail/MedicationsDetail';
import PluginCreate from '../../plugin-page-component/PluginCreate';
import MedicationsCreateForm from './MedicationsCreate/MedicationsCreateForm'
import { valuesNames } from './forms.config';
import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';

const MEDICATIONS_MAIN = 'medicationsMain';
const MEDICATIONS_DETAIL = 'medicationsDetail';
const MEDICATIONS_CREATE = 'medicationsCreate';
const MEDICATION_PANEL = 'medicationPanel';
const PRESCRIPTION_PANEL = 'prescriptionPanel';
const WARNINGS_PANEL = 'warningsPanel';
const CHANGE_HISTORY_PANEL = 'changeHistoryPanel';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientMedicationsRequest, fetchPatientMedicationsCreateRequest, fetchPatientMedicationsDetailRequest, fetchPatientMedicationsDetailEditRequest }, dispatch) });

@connect(patientMedicationsSelector, mapDispatchToProps)
@connect(patientMedicationsDetailSelector, mapDispatchToProps)
@connect(medicationsDetailFormStateSelector)
@connect(medicationsCreateFormStateSelector)
@connect(prescriptionPanelFormStateSelector)
@compose(lifecycle(fetchPatientMedicationsOnMount), lifecycle(fetchPatientMedicationsDetailOnMount))

export default class Medications extends PureComponent {
  static propTypes = {
    allMedications: PropTypes.arrayOf(PropTypes.object),
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
  };

  state = {
    nameShouldInclude: '',
    selectedColumns: defaultColumnsSelected,
    openedPanel: MEDICATION_PANEL,
    columnNameSortBy: valuesNames.NAME,
    sortingOrder: 'asc',
    expandedPanel: 'all',
    isBtnCreateVisible: true,
    isBtnExpandVisible: false,
    isAllPanelsVisible: false,
    isDetailPanelVisible: false,
    isSecondPanel: false,
    isCreatePanelVisible: false,
    editedPanel: {},
    offset: 0,
    isSubmit: false,
    isOpenHourlySchedule: true,
    isLoading: true,
  };

  componentWillReceiveProps() {
    const sourceId = this.context.router.route.match.params.sourceId;
    const userId = this.context.router.route.match.params.userId;

    //TODO should be implemented common function, and the state stored in the store Redux
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.MEDICATIONS}/${sourceId}` && sourceId !== undefined) {
      this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.MEDICATIONS}/create`) {
      this.setState({ isSecondPanel: true, isBtnExpandVisible: true, isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: MEDICATIONS_CREATE, isDetailPanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.MEDICATIONS}`) {
      this.setState({ isSecondPanel: false, isBtnExpandVisible: false, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: MEDICATION_PANEL, isDetailPanelVisible: false })
    }

    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 500)
  }

 handleExpand = (name, currentPanel) => {
   if (currentPanel === MEDICATIONS_MAIN) {
     if (this.state.expandedPanel === 'all') {
       this.setState({ expandedPanel: name });
     } else {
       this.setState({ expandedPanel: 'all' });
     }
   } else if (this.state.expandedPanel === 'all') {
     this.setState({ expandedPanel: name, openedPanel: name });
   } else {
     this.setState({ expandedPanel: 'all' });
   }
 };

  handleFilterChange = ({ target: { value } }) => this.setState({ nameShouldInclude: _.toLower(value) });

  handleHeaderCellClick = (e, { name, sortingOrder }) => this.setState({ columnNameSortBy: name, sortingOrder });

  handleDetailMedicationsClick = (sourceId) => {
    const { actions, userId } = this.props;
    this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: MEDICATION_PANEL, editedPanel: {}, expandedPanel: 'all', isOpenHourlySchedule: true, isLoading: true })
    actions.fetchPatientMedicationsDetailRequest({ userId, sourceId });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.MEDICATIONS}/${sourceId}`);
  };

  handleSetOffset = offset => this.setState({ offset });

  handleCreate = () => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: MEDICATIONS_CREATE, isSecondPanel: true, isDetailPanelVisible: false, isSubmit: false, isLoading: true })
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.MEDICATIONS}/create`);
  };

  handleEdit = (name) => {
    this.setState(prevState => ({
      editedPanel: {
        ...prevState.editedPanel,
        [name]: true,
      },
      isSubmit: false,
    }))
  };

 handleContactDetailCancel = (name) => {
   this.setState(prevState => ({
     editedPanel: {
       ...prevState.editedPanel,
       [name]: false,
     },
     isSubmit: false,
     isLoading: true,
   }))
 };

 handleSaveSettingsDetailForm = (formValues, name) => {
   const { actions, medicationsDetailFormState } = this.props;
   if (name === MEDICATION_PANEL) {
     if (checkIsValidateForm(medicationsDetailFormState)) {
       actions.fetchPatientMedicationsDetailEditRequest(this.formValuesToString(formValues, 'edit'));
       this.setState(prevState => ({
         editedPanel: {
           ...prevState.editedPanel,
           [name]: false,
         },
         isSubmit: false,
         isLoading: true,
       }))
     } else {
       this.setState({ isSubmit: true });
     }
   } else {
     this.setState(prevState => ({
       editedPanel: {
         ...prevState.editedPanel,
         [name]: false,
       },
       isSubmit: false,
       isLoading: true,
     }))
   }
 };

 handleCreateCancel = () => {
   const { userId } = this.props;
   this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: MEDICATION_PANEL, isSecondPanel: false, isBtnExpandVisible: false, expandedPanel: 'all', isSubmit: false, isLoading: true });
   this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.MEDICATIONS}`);
 };

 handleSaveSettingsCreateForm = (formValues) => {
   const { actions, userId, medicationsCreateFormState } = this.props;

   if (checkIsValidateForm(medicationsCreateFormState)) {
     actions.fetchPatientMedicationsCreateRequest(this.formValuesToString(formValues, 'create'));
     this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.MEDICATIONS}`);
     this.hideCreateForm();
     this.setState({ isSubmit: false, isLoading: true });
   } else {
     this.setState({ isSubmit: true });
   }
 };

  formValuesToString = (formValues, formName) => {
    const { userId, medicationDetail } = this.props;
    const sendData = {};
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startTime = now - today;

    sendData.userId = userId;
    sendData[valuesNames.NAME] = formValues[valuesNames.NAME];
    sendData[valuesNames.DOSE_AMOUNT] = formValues[valuesNames.DOSE_AMOUNT];
    sendData[valuesNames.DOSE_TIMING] = formValues[valuesNames.DOSE_TIMING];
    sendData[valuesNames.DOSE_DIRECTIONS] = formValues[valuesNames.DOSE_DIRECTIONS];
    sendData[valuesNames.MEDICATION_CODE] = formValues[valuesNames.MEDICATION_CODE];
    sendData[valuesNames.ROUTE] = formValues[valuesNames.ROUTE];
    sendData[valuesNames.AUTHOR] = formValues[valuesNames.AUTHOR];
    sendData[valuesNames.START_DATE] = new Date().getTime();
    sendData[valuesNames.START_TIME] = startTime;

    if (formName === 'edit') {
      sendData[valuesNames.DATE_CREATED] = new Date(medicationDetail[valuesNames.DATE_CREATED]);
      sendData[valuesNames.MEDICATION_TERMINOLOGY] = formValues[valuesNames.MEDICATION_TERMINOLOGY];
      sendData[valuesNames.SOURCE_ID] = medicationDetail[valuesNames.SOURCE_ID];
    }

    if (formName === 'create') {
      sendData[valuesNames.SOURCE_ID] = '';
      sendData[valuesNames.ISIMPORT] = false;
    }

    return sendData;
  };

  hideCreateForm = () => {
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: MEDICATION_PANEL, isSecondPanel: false })
  };

  handleShow = (name) => {
    this.setState({ openedPanel: name })
    if (this.state.expandedPanel !== 'all') {
      this.setState({ expandedPanel: name })
    }
  };

  toggleHourlySchedule = () => this.setState(prevState => ({ isOpenHourlySchedule: !prevState.isOpenHourlySchedule }));

  formToShowCollection = (collection) => {
    const { columnNameSortBy, sortingOrder, nameShouldInclude } = this.state;

    collection = operationsOnCollection.modificate(collection, [{
      keyFrom: valuesNames.DATE_CREATED,
      keyTo: `${valuesNames.DATE_CREATED}Convert`,
      fn: getDDMMMYYYY,
    }]);

    return operationsOnCollection.filterAndSort({
      collection,
      filterBy: nameShouldInclude,
      sortingByKey: columnNameSortBy,
      sortingByOrder: sortingOrder,
      filterKeys: [valuesNames.NAME, valuesNames.DOSE_AMOUNT, `${valuesNames.DATE_CREATED}Convert`, valuesNames.SOURCE],
    });
  };

  render() {
    const { selectedColumns, columnNameSortBy, sortingOrder, isSecondPanel, isDetailPanelVisible, isBtnExpandVisible, expandedPanel, openedPanel, isBtnCreateVisible, isCreatePanelVisible, editedPanel, offset, isSubmit, isOpenHourlySchedule, isLoading } = this.state;
    const { allMedications, medicationsDetailFormState, medicationsCreateFormState, prescriptionPanelFormState, medicationDetail } = this.props;

    const isPanelDetails = (expandedPanel === MEDICATIONS_DETAIL || expandedPanel === MEDICATION_PANEL || expandedPanel === PRESCRIPTION_PANEL || expandedPanel === WARNINGS_PANEL || expandedPanel === CHANGE_HISTORY_PANEL);
    const isPanelMain = (expandedPanel === MEDICATIONS_MAIN);
    const isPanelCreate = (expandedPanel === MEDICATIONS_CREATE);

    const columnsToShowConfig = columnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);

    if (allMedications !== undefined) {
      if (allMedications[0]) {
        allMedications[0].warning = true;
      }
      if (allMedications[1]) {
        allMedications[1].danger = true;
      }
    }

    const filteredMedications = this.formToShowCollection(allMedications);

    let sourceId;
    if (!_.isEmpty(medicationDetail)) {
      sourceId = medicationDetail[valuesNames.SOURCE_ID];
    }

    return (<section className="page-wrapper">
      <div className={classNames('section', { 'full-panel full-panel-main': isPanelMain, 'full-panel full-panel-details': (isPanelDetails || isPanelCreate) })}>
        <Row>
          {(isPanelMain || expandedPanel === 'all') ? <Col xs={12} className={classNames({ 'col-panel-main': isSecondPanel })}>
            <div className="panel panel-primary">
              <PluginListHeader
                onFilterChange={this.handleFilterChange}
                panelTitle="All Medications"
                isBtnExpandVisible={isBtnExpandVisible}
                isBtnTableVisible={false}
                name={MEDICATIONS_MAIN}
                onExpand={this.handleExpand}
                currentPanel={MEDICATIONS_MAIN}
              />
              <PluginMainPanel
                headers={columnsToShowConfig}
                resourceData={allMedications}
                emptyDataMessage="No medications"
                onHeaderCellClick={this.handleHeaderCellClick}
                onCellClick={this.handleDetailMedicationsClick}
                columnNameSortBy={columnNameSortBy}
                sortingOrder={sortingOrder}
                table="medications"
                filteredData={filteredMedications}
                totalEntriesAmount={_.size(filteredMedications)}
                offset={offset}
                setOffset={this.handleSetOffset}
                isBtnCreateVisible={isBtnCreateVisible}
                onCreate={this.handleCreate}
                id={sourceId}
                isLoading={isLoading}
              />
            </div>
          </Col> : null}
          {(expandedPanel === 'all' || isPanelDetails) && isDetailPanelVisible && !isCreatePanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <MedicationsDetail
              onExpand={this.handleExpand}
              name={MEDICATIONS_DETAIL}
              openedPanel={openedPanel}
              onShow={this.handleShow}
              expandedPanel={expandedPanel}
              currentPanel={MEDICATIONS_DETAIL}
              detail={medicationDetail}
              onEdit={this.handleEdit}
              editedPanel={editedPanel}
              onCancel={this.handleContactDetailCancel}
              onSaveSettings={this.handleSaveSettingsDetailForm}
              medicationsDetailFormValues={medicationsDetailFormState.values}
              prescriptionPanelFormValues={prescriptionPanelFormState.values}
              isSubmit={isSubmit}
              toggleHourlySchedule={this.toggleHourlySchedule}
              isOpenHourlySchedule={isOpenHourlySchedule}
            />
          </Col> : null}
          {(expandedPanel === 'all' || isPanelCreate) && isCreatePanelVisible && !isDetailPanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <PluginCreate
              title="Create Medication"
              onExpand={this.handleExpand}
              name={MEDICATIONS_CREATE}
              openedPanel={openedPanel}
              onShow={this.handleShow}
              expandedPanel={expandedPanel}
              currentPanel={MEDICATIONS_CREATE}
              onSaveSettings={this.handleSaveSettingsCreateForm}
              formValues={medicationsCreateFormState.values}
              onCancel={this.handleCreateCancel}
              isCreatePanelVisible={isCreatePanelVisible}
              componentForm={
                <MedicationsCreateForm isSubmit={isSubmit} />
              }
            />
          </Col> : null}
        </Row>
      </div>
    </section>)
  }
}
