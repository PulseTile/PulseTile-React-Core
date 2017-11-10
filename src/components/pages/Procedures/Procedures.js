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

import { columnsConfig, defaultColumnsSelected } from './table-columns.config'
import { valuesNames } from './forms.config';
import { fetchPatientProceduresRequest } from './ducks/fetch-patient-procedures.duck';
import { fetchPatientProceduresCreateRequest } from './ducks/fetch-patient-procedures-create.duck';
import { fetchPatientProceduresDetailRequest } from './ducks/fetch-patient-procedures-detail.duck';
import { fetchPatientProceduresDetailEditRequest } from './ducks/fetch-patient-procedures-detail-edit.duck';
import { fetchPatientProceduresOnMount, fetchPatientProceduresDetailOnMount } from '../../../utils/HOCs/fetch-patients.utils';
import { patientProceduresSelector, proceduresDetailFormStateSelector, proceduresCreateFormStateSelector, metaPanelFormStateSelector, patientProceduresDetailSelector } from './selectors';
import { clientUrls } from '../../../config/client-urls.constants';
import { checkIsValidateForm } from '../../../utils/plugin-helpers.utils';
import ProceduresDetail from './ProceduresDetail/ProceduresDetail';
import PluginCreate from '../../plugin-page-component/PluginCreate';
import ProceduresCreateForm from './ProceduresCreate/ProceduresCreateForm'

const PROCEDURES_MAIN = 'proceduresMain';
const PROCEDURES_DETAIL = 'proceduresDetail';
const PROCEDURES_CREATE = 'proceduresCreate';
const CONTACT_PANEL = 'procedurePanel';
const META_PANEL = 'metaPanel';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientProceduresRequest, fetchPatientProceduresCreateRequest, fetchPatientProceduresDetailRequest, fetchPatientProceduresDetailEditRequest }, dispatch) });

@connect(patientProceduresSelector, mapDispatchToProps)
@connect(patientProceduresDetailSelector, mapDispatchToProps)
@connect(proceduresDetailFormStateSelector)
@connect(proceduresCreateFormStateSelector)
@connect(metaPanelFormStateSelector)
@compose(lifecycle(fetchPatientProceduresOnMount), lifecycle(fetchPatientProceduresDetailOnMount))

export default class Procedures extends PureComponent {
  static propTypes = {
    allProcedures: PropTypes.arrayOf(PropTypes.object),
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
  };

  state = {
    nameShouldInclude: '',
    selectedColumns: defaultColumnsSelected,
    openedPanel: CONTACT_PANEL,
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
  };

  componentWillReceiveProps() {
    const sourceId = this.context.router.route.match.params.sourceId;
    const userId = this.context.router.route.match.params.userId;
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.PROCEDURES}/${sourceId}` && sourceId !== undefined) {
      this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false })
    }
  }

  handleExpand = (name, currentPanel) => {
    if (currentPanel === PROCEDURES_MAIN) {
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

  handleDetailProceduresClick = (id, name, sourceId) => {
    const { actions, userId } = this.props;
    this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: CONTACT_PANEL, editedPanel: {} })
    actions.fetchPatientProceduresDetailRequest({ userId, sourceId });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.PROCEDURES}/${sourceId}`);
  };

  filterAndSortProcedures = (procedures) => {
    const { columnNameSortBy, sortingOrder, nameShouldInclude } = this.state;

    const filterByNamePredicate = _.flow(_.get('name'), _.toLower, _.includes(nameShouldInclude));
    const filterByDatePredicate = _.flow(_.get('date'), _.toLower, _.includes(nameShouldInclude));
    const filterByTimePredicate = _.flow(_.get('time'), _.toLower, _.includes(nameShouldInclude));
    const filterBySourcePredicate = _.flow(_.get('source'), _.toLower, _.includes(nameShouldInclude));

    const reverseIfDescOrder = _.cond([
      [_.isEqual('desc'), () => _.reverse],
      [_.stubTrue, () => v => v],
    ])(sortingOrder);

    const filterByName = _.flow(_.sortBy([item => item[columnNameSortBy].toString().toLowerCase()]), reverseIfDescOrder, _.filter(filterByNamePredicate))(procedures);
    const filterByDate = _.flow(_.sortBy([item => item[columnNameSortBy].toString().toLowerCase()]), reverseIfDescOrder, _.filter(filterByDatePredicate))(procedures);
    const filterByTime = _.flow(_.sortBy([item => item[columnNameSortBy].toString().toLowerCase()]), reverseIfDescOrder, _.filter(filterByTimePredicate))(procedures);
    const filterBySource = _.flow(_.sortBy([item => item[columnNameSortBy].toString().toLowerCase()]), reverseIfDescOrder, _.filter(filterBySourcePredicate))(procedures);

    const filteredAndSortedProcedures = [filterByName, filterByDate, filterByTime, filterBySource].filter((item) => {
      return _.size(item) !== 0;
    });

    return _.head(filteredAndSortedProcedures)
  };

  handleSetOffset = offset => this.setState({ offset });

  handleCreate = () => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: PROCEDURES_CREATE, isSecondPanel: true, isDetailPanelVisible: false, isSubmit: false })
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.PROCEDURES}/create`);
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

  handleProcedureDetailCancel = (name) => {
    this.setState(prevState => ({
      editedPanel: {
        ...prevState.editedPanel,
        [name]: false,
      },
      isSubmit: false,
    }))
  };

  handleSaveSettingsDetailForm = (formValues, name) => {
    const { actions, procedureDetail, userId, proceduresDetailFormState } = this.props;
    const sourceId = procedureDetail.sourceId;
    if (checkIsValidateForm(proceduresDetailFormState)) {
      actions.fetchPatientProceduresDetailEditRequest(this.formValuesToString(formValues, 'edit'));
      setTimeout(() => {
        actions.fetchPatientProceduresRequest({ userId });
        actions.fetchPatientProceduresDetailRequest({ userId, sourceId });
      }, 1000);
      this.setState(prevState => ({
        editedPanel: {
          ...prevState.editedPanel,
          [name]: false,
        },
        isSubmit: false,
      }))
    } else {
      this.setState({ isSubmit: true });
    }
  };

  handleCreateCancel = () => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: CONTACT_PANEL, isSecondPanel: false });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.PROCEDURES}`);
  };

  handleSaveSettingsCreateForm = (formValues) => {
    const { actions, userId, proceduresCreateFormState } = this.props;

    if (checkIsValidateForm(proceduresCreateFormState)) {
      actions.fetchPatientProceduresCreateRequest(this.formValuesToString(formValues, 'create'));
      setTimeout(() => actions.fetchPatientProceduresRequest({ userId }), 1000);
      this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.PROCEDURES}`);
      this.hideCreateForm();
      this.setState({ isSubmit: false });
    } else {
      this.setState({ isSubmit: true });
    }
  };

  formValuesToString = (formValues, formName) => {
    const { userId, procedureDetail } = this.props;
    const sendData = {};

    sendData.userId = userId;
    // sendData[valuesNames.NAME] = formValues[valuesNames.NAME];
    // sendData[valuesNames.NEXT_OF_KIN] = formValues[valuesNames.NEXT_OF_KIN] || false;
    // sendData[valuesNames.CONTACT_INFORMATION] = formValues[valuesNames.CONTACT_INFORMATION];
    // sendData[valuesNames.NOTES] = formValues[valuesNames.NOTES];
    // sendData[valuesNames.AUTHOR] = formValues[valuesNames.AUTHOR];
    sendData.dateSubmitted = new Date();
    sendData.source = 'ethercis';

    if (formName === 'edit') {
      sendData.sourceId = procedureDetail.sourceId;
    }

    return sendData;
  };

  hideCreateForm = () => {
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: CONTACT_PANEL, isSecondPanel: false })
  };

  handleShow = (name) => {
    this.setState({ openedPanel: name })
  };

 render() {
   const { selectedColumns, columnNameSortBy, sortingOrder, isSecondPanel, isDetailPanelVisible, isBtnExpandVisible, expandedPanel, openedPanel, isBtnCreateVisible, isCreatePanelVisible, editedPanel, offset, isSubmit } = this.state;
   const { allProcedures, proceduresDetailFormState, proceduresCreateFormState, metaPanelFormState, procedureDetail, proceduresPerPageAmount } = this.props;

   const isPanelDetails = (expandedPanel === PROCEDURES_DETAIL || expandedPanel === CONTACT_PANEL || expandedPanel === META_PANEL);
   const isPanelMain = (expandedPanel === PROCEDURES_MAIN);
   const isPanelCreate = (expandedPanel === PROCEDURES_CREATE);

   const columnsToShowConfig = columnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);

   const filteredProcedures = this.filterAndSortProcedures(allProcedures);

   return (<section className="page-wrapper">
     <div className={classNames('section', { 'full-panel full-panel-main': isPanelMain, 'full-panel full-panel-details': (isPanelDetails || isPanelCreate) })}>
       <Row>
         {(isPanelMain || expandedPanel === 'all') ? <Col xs={12} className={classNames({ 'col-panel-main': isSecondPanel })}>
           <div className="panel panel-primary">
             <PluginListHeader
               onFilterChange={this.handleFilterChange}
               panelTitle="Procedures"
               isBtnExpandVisible={isBtnExpandVisible}
               isBtnTableVisible={false}
               name={PROCEDURES_MAIN}
               onExpand={this.handleExpand}
               currentPanel={PROCEDURES_MAIN}
             />
             <PluginMainPanel
               headers={columnsToShowConfig}
               resourceData={allProcedures}
               emptyDataMessage="No procedures"
               onHeaderCellClick={this.handleHeaderCellClick}
               onCellClick={this.handleDetailProceduresClick}
               columnNameSortBy={columnNameSortBy}
               sortingOrder={sortingOrder}
               table="procedures"

               filteredData={filteredProcedures}
               totalEntriesAmount={_.size(allProcedures)}
               offset={offset}
               setOffset={this.handleSetOffset}
               isBtnCreateVisible={isBtnCreateVisible}
               onCreate={this.handleCreate}
             />
           </div>
         </Col> : null}
         {(expandedPanel === 'all' || isPanelDetails) && isDetailPanelVisible && !isCreatePanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
           <ProceduresDetail
             onExpand={this.handleExpand}
             name={PROCEDURES_DETAIL}
             openedPanel={openedPanel}
             onShow={this.handleShow}
             expandedPanel={expandedPanel}
             currentPanel={PROCEDURES_DETAIL}
             detail={procedureDetail}
             onEdit={this.handleEdit}
             editedPanel={editedPanel}
             onCancel={this.handleProcedureDetailCancel}
             onSaveSettings={this.handleSaveSettingsDetailForm}
             proceduresDetailFormValues={proceduresDetailFormState.values}
             metaPanelFormValues={metaPanelFormState.values}
             isSubmit={isSubmit}
           />
         </Col> : null}
         {(expandedPanel === 'all' || isPanelCreate) && isCreatePanelVisible && !isDetailPanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
           <PluginCreate
             title="Create Procedure"
             onExpand={this.handleExpand}
             name={PROCEDURES_CREATE}
             openedPanel={openedPanel}
             onShow={this.handleShow}
             expandedPanel={expandedPanel}
             currentPanel={PROCEDURES_CREATE}
             onSaveSettings={this.handleSaveSettingsCreateForm}
             formValues={proceduresCreateFormState.values}
             onCancel={this.handleCreateCancel}
             isCreatePanelVisible={isCreatePanelVisible}
             componentForm={
               <ProceduresCreateForm isSubmit={isSubmit} />
             }
           />
         </Col> : null}
       </Row>
     </div>
   </section>)
 }
}
