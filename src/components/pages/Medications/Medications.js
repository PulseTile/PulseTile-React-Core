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

import { medicationsColumnsConfig, defaultColumnsSelected } from './medications-table-columns.config'
import { fetchPatientMedicationsRequest } from './ducks/fetch-patient-medications.duck';
import { fetchPatientMedicationsCreateRequest } from './ducks/fetch-patient-medications-create.duck';
import { fetchPatientMedicationsDetailRequest } from './ducks/fetch-patient-medications-detail.duck';
import { fetchPatientMedicationsDetailEditRequest } from './ducks/fetch-patient-medications-detail-edit.duck';
import { fetchPatientMedicationsOnMount, fetchPatientMedicationsDetailOnMount } from '../../../utils/HOCs/fetch-patients.utils';
import { patientMedicationsSelector, medicationsDetailFormStateSelector, medicationsCreateFormStateSelector, metaPanelFormStateSelector, patientMedicationsDetailSelector } from './selectors';
import { clientUrls } from '../../../config/client-urls.constants';
import { checkIsValidateForm } from '../../../utils/plugin-helpers.utils';
import MedicationsDetail from './MedicationsDetail/MedicationsDetail';
import PluginCreate from '../../plugin-page-component/PluginCreate';
import MedicationsCreateForm from './MedicationsCreate/MedicationsCreateForm/MedicationsCreateForm'
import { valuesNames } from './MedicationsCreate/MedicationsCreateForm/values-names.config';

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
@connect(metaPanelFormStateSelector)
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
    columnNameSortBy: 'name',
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
  };

  componentWillReceiveProps() {
    const sourceId = this.context.router.route.match.params.sourceId;
    const userId = this.context.router.route.match.params.userId;
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.MEDICATIONS}/${sourceId}` && sourceId !== undefined) {
      this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false })
    }
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

  handleDetailMedicationsClick = (id, name, sourceId) => {
    const { actions, userId } = this.props;
    this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: MEDICATION_PANEL, editedPanel: {} })
    actions.fetchPatientMedicationsDetailRequest({ userId, sourceId });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.MEDICATIONS}/${sourceId}`);
  };

  filterAndSortMedications = (medications) => {
    const { columnNameSortBy, sortingOrder, nameShouldInclude } = this.state;

    const filterByNamePredicate = _.flow(_.get('name'), _.toLower, _.includes(nameShouldInclude));
    const filterByRelationshipPredicate = _.flow(_.get('relationship'), _.toLower, _.includes(nameShouldInclude));
    const filterByNextOfKinPredicate = _.flow(_.get('nextOfKin'), _.toLower, _.includes(nameShouldInclude));
    const filterBySourcePredicate = _.flow(_.get('source'), _.toLower, _.includes(nameShouldInclude));

    const reverseIfDescOrder = _.cond([
      [_.isEqual('desc'), () => _.reverse],
      [_.stubTrue, () => v => v],
    ])(sortingOrder);

    const filterByName = _.flow(_.sortBy([item => item[columnNameSortBy].toString().toLowerCase()]), reverseIfDescOrder, _.filter(filterByNamePredicate))(medications);
    const filterByRelationship = _.flow(_.sortBy([item => item[columnNameSortBy].toString().toLowerCase()]), reverseIfDescOrder, _.filter(filterByRelationshipPredicate))(medications);
    const filterByNextOfKin = _.flow(_.sortBy([item => item[columnNameSortBy].toString().toLowerCase()]), reverseIfDescOrder, _.filter(filterByNextOfKinPredicate))(medications);
    const filterBySource = _.flow(_.sortBy([item => item[columnNameSortBy].toString().toLowerCase()]), reverseIfDescOrder, _.filter(filterBySourcePredicate))(medications);

    const filteredAndSortedMedications = [filterByName, filterByRelationship, filterByNextOfKin, filterBySource].filter((item) => {
      return _.size(item) !== 0;
    });

    return _.head(filteredAndSortedMedications)
  };

 handleSetOffset = offset => this.setState({ offset });

  handleCreate = () => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: MEDICATIONS_CREATE, isSecondPanel: true, isDetailPanelVisible: false, isSubmit: false })
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
   }))
 };

 handleSaveSettingsDetailForm = (formValues, name) => {
   const { actions } = this.props;

   actions.fetchPatientMedicationsDetailEditRequest(this.formValuesToString(formValues, 'edit'));
   this.setState(prevState => ({
     editedPanel: {
       ...prevState.editedPanel,
       [name]: false,
     },
     isSubmit: false,
   }))
 };

 handleCreateCancel = () => {
   const { userId } = this.props;
   this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: MEDICATION_PANEL, isSecondPanel: false });
   this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.MEDICATIONS}`);
 };

 handleSaveSettingsCreateForm = (formValues) => {
   const { actions, userId, medicationsCreateFormState } = this.props;

   if (checkIsValidateForm(medicationsCreateFormState)) {
     actions.fetchPatientMedicationsCreateRequest(this.formValuesToString(formValues, 'create'));
     setTimeout(() => actions.fetchPatientMedicationsRequest({ userId }), 1000);
     this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.MEDICATIONS}`);
     this.hideCreateForm();
     this.setState({ isSubmit: false });
   } else {
     this.setState({ isSubmit: true });
   }
 };

 formValuesToString = (formValues, formName) => {
   const { userId } = this.props;

   const name = _.get(valuesNames.NAME)(formValues);
   let nextOfKin = _.get(valuesNames.NEXT_OF_KIN)(formValues);
   nextOfKin = nextOfKin || false;
   const relationship = _.get(valuesNames.REALATIONSHIP)(formValues);
   const relationshipType = _.get(valuesNames.REALATIONSHIP_TYPE)(formValues);
   const relationshipCode = _.get(valuesNames.REALATIONSHIP_CODE)(formValues);
   const relationshipTerminology = _.get(valuesNames.REALATIONSHIP_TERMINOLOGY)(formValues);
   const medicationInformation = _.get(valuesNames.MEDICATION_INFORMATION)(formValues);
   const notes = _.get(valuesNames.NOTES)(formValues);
   const author = _.get(valuesNames.AUTHOR)(formValues);
   const dateSubmitted = new Date();
   const source = 'ethercis';

   if (formName === 'create') {
     return ({ userId, name, relationship, nextOfKin, relationshipType, relationshipCode, relationshipTerminology, medicationInformation, notes, author, dateSubmitted, source });
   }
   if (formName === 'edit') {
     const sourceId = _.get(valuesNames.SOURCEID)(formValues);
     return ({ userId, name, relationship, nextOfKin, relationshipType, relationshipCode, relationshipTerminology, medicationInformation, notes, author, dateSubmitted, source, sourceId });
   }
 };

  hideCreateForm = () => {
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: MEDICATION_PANEL, isSecondPanel: false })
  };

 handleShow = (name) => {
   this.setState({ openedPanel: name })
 };

 toggleHourlySchedule = () => this.setState(prevState => ({ isOpenHourlySchedule: !prevState.isOpenHourlySchedule }));

 render() {
   const { selectedColumns, columnNameSortBy, sortingOrder, isSecondPanel, isDetailPanelVisible, isBtnExpandVisible, expandedPanel, openedPanel, isBtnCreateVisible, isCreatePanelVisible, editedPanel, offset, isSubmit, isOpenHourlySchedule } = this.state;
   const { allMedications, medicationsDetailFormState, medicationsCreateFormState, metaPanelFormState, medicationDetail } = this.props;

   const isPanelDetails = (expandedPanel === MEDICATIONS_DETAIL || expandedPanel === MEDICATION_PANEL || expandedPanel === PRESCRIPTION_PANEL || expandedPanel === WARNINGS_PANEL || expandedPanel === CHANGE_HISTORY_PANEL);
   const isPanelMain = (expandedPanel === MEDICATIONS_MAIN);
   const isPanelCreate = (expandedPanel === MEDICATIONS_CREATE);

   const columnsToShowConfig = medicationsColumnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);

   const filteredMedications = this.filterAndSortMedications(allMedications);

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
               totalEntriesAmount={_.size(allMedications)}
               offset={offset}
               setOffset={this.handleSetOffset}
               isBtnCreateVisible={isBtnCreateVisible}
               onCreate={this.handleCreate}
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
             metaPanelFormValues={metaPanelFormState.values}
             isSubmit={isSubmit}
             toggleHourlySchedule={this.toggleHourlySchedule}
             isOpenHourlySchedule={isOpenHourlySchedule}
           />
         </Col> : null}
         {(expandedPanel === 'all' || isPanelCreate) && isCreatePanelVisible && !isDetailPanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
           <PluginCreate
             title="Create Medications"
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
