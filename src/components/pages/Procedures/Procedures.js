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
import { checkIsValidateForm, operationsOnCollection } from '../../../utils/plugin-helpers.utils';
import ProceduresDetail from './ProceduresDetail/ProceduresDetail';
import PluginCreate from '../../plugin-page-component/PluginCreate';
import ProceduresCreateForm from './ProceduresCreate/ProceduresCreateForm'
import { getDDMMMYYYY, getHHmm } from '../../../utils/time-helpers.utils';

const PROCEDURES_MAIN = 'proceduresMain';
const PROCEDURES_DETAIL = 'proceduresDetail';
const PROCEDURES_CREATE = 'proceduresCreate';
const PROCEDURE_PANEL = 'procedurePanel';
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
    openedPanel: PROCEDURE_PANEL,
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
    isLoading: true,
  };

  componentWillReceiveProps() {
    const sourceId = this.context.router.route.match.params.sourceId;
    const userId = this.context.router.route.match.params.userId;

    //TODO should be implemented common function, and the state stored in the store Redux
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.PROCEDURES}/${sourceId}` && sourceId !== undefined) {
      this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.PROCEDURES}/create`) {
      this.setState({ isSecondPanel: true, isBtnExpandVisible: true, isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: PROCEDURES_CREATE, isDetailPanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.PROCEDURES}`) {
      this.setState({ isSecondPanel: false, isBtnExpandVisible: false, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: PROCEDURE_PANEL, isDetailPanelVisible: false, expandedPanel: 'all' })
    }

    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 500)
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

  handleDetailProceduresClick = (sourceId) => {
    const { actions, userId } = this.props;
    this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: PROCEDURE_PANEL, editedPanel: {}, expandedPanel: 'all', isLoading: true })
    actions.fetchPatientProceduresDetailRequest({ userId, sourceId });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.PROCEDURES}/${sourceId}`);
  };

  handleSetOffset = offset => this.setState({ offset });

  handleCreate = () => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: PROCEDURES_CREATE, isSecondPanel: true, isDetailPanelVisible: false, isSubmit: false, isLoading: true })
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
      isLoading: true,
    }))
  };

  handleSaveSettingsDetailForm = (formValues, name) => {
    const { actions, proceduresDetailFormState } = this.props;
    if (checkIsValidateForm(proceduresDetailFormState)) {
      actions.fetchPatientProceduresDetailEditRequest(this.formValuesToString(formValues, 'edit'));
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
  };

  handleCreateCancel = () => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: PROCEDURE_PANEL, isSecondPanel: false, isBtnExpandVisible: false, expandedPanel: 'all', isSubmit: false, isLoading: true });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.PROCEDURES}`);
  };

  handleSaveSettingsCreateForm = (formValues) => {
    const { actions, userId, proceduresCreateFormState } = this.props;

    if (checkIsValidateForm(proceduresCreateFormState)) {
      actions.fetchPatientProceduresCreateRequest(this.formValuesToString(formValues, 'create'));
      this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.PROCEDURES}`);
      this.hideCreateForm();
      this.setState({ isSubmit: false, isLoading: true });
    } else {
      this.setState({ isSubmit: true });
    }
  };

  formValuesToString = (formValues, formName) => {
    const { userId, procedureDetail } = this.props;
    const sendData = {};
    const currentDate = new Date();
    const currentTime = currentDate - new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    sendData.userId = userId;

    sendData[valuesNames.NAME] = formValues[valuesNames.NAME];
    sendData[valuesNames.DATE_OF_PROCEDURE] = formValues[valuesNames.DATE_OF_PROCEDURE];
    sendData[valuesNames.PERFORMER] = formValues[valuesNames.PERFORMER];
    sendData[valuesNames.NOTES] = formValues[valuesNames.NOTES];
    sendData[valuesNames.TERMINOLOGY] = formValues[valuesNames.TERMINOLOGY];
    sendData[valuesNames.CODE] = formValues[valuesNames.CODE];
    sendData[valuesNames.AUTHOR] = formValues[valuesNames.AUTHOR];
    sendData[valuesNames.PROCEDURE_NAME] = formValues[valuesNames.NAME];
    sendData[valuesNames.TIME] = currentTime;

    sendData[valuesNames.DATE] = currentDate;
    sendData[valuesNames.SOURCE] = 'ethercis';

    if (formName === 'edit') {
      sendData[valuesNames.SOURCE_ID] = procedureDetail[valuesNames.SOURCE_ID];

      sendData[valuesNames.STATUS] = procedureDetail[valuesNames.STATUS];
      sendData[valuesNames.ORIGINAL_COMPOSITION] = procedureDetail[valuesNames.ORIGINAL_COMPOSITION];
      sendData[valuesNames.ORIGINAL_SOURCE] = procedureDetail[valuesNames.ORIGINAL_SOURCE];
    }

    if (formName === 'create') {
      sendData[valuesNames.STATUS] = '';
      sendData[valuesNames.ORIGINAL_COMPOSITION] = '';
      sendData[valuesNames.ORIGINAL_SOURCE] = '';
    }

    return sendData;
  };

  hideCreateForm = () => {
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: PROCEDURE_PANEL, isSecondPanel: false })
  };

  handleShow = (name) => {
    this.setState({ openedPanel: name })
  };

  formToShowCollection = (collection) => {
    const {columnNameSortBy, sortingOrder, nameShouldInclude} = this.state;

    collection = operationsOnCollection.modificate(collection, [{
      keyFrom: valuesNames.DATE_OF_PROCEDURE,
      keyTo: `${valuesNames.DATE_OF_PROCEDURE}Convert`,
      fn: getDDMMMYYYY
    }, {
      keyFrom: valuesNames.TIME,
      keyTo: `${valuesNames.TIME}Convert`,
      fn: getHHmm
    }]);

    return operationsOnCollection.filterAndSort({
      collection: collection,
      filterBy: nameShouldInclude,
      sortingByKey: columnNameSortBy,
      sortingByOrder: sortingOrder,
      filterKeys: [valuesNames.NAME, `${valuesNames.DATE_OF_PROCEDURE}Convert`, `${valuesNames.TIME}Convert`, valuesNames.SOURCE]
    });
  };

  render() {
    const { selectedColumns, columnNameSortBy, sortingOrder, isSecondPanel, isDetailPanelVisible, isBtnExpandVisible, expandedPanel, openedPanel, isBtnCreateVisible, isCreatePanelVisible, editedPanel, offset, isSubmit, isLoading } = this.state;
    const { allProcedures, proceduresDetailFormState, proceduresCreateFormState, metaPanelFormState, procedureDetail, proceduresPerPageAmount } = this.props;

    const isPanelDetails = (expandedPanel === PROCEDURES_DETAIL || expandedPanel === PROCEDURE_PANEL || expandedPanel === META_PANEL);
    const isPanelMain = (expandedPanel === PROCEDURES_MAIN);
    const isPanelCreate = (expandedPanel === PROCEDURES_CREATE);

    const columnsToShowConfig = columnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);

    const filteredProcedures = this.formToShowCollection(allProcedures);

    let sourceId;
    if (!_.isEmpty(procedureDetail)) {
      sourceId = procedureDetail.sourceId;
    }

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
                totalEntriesAmount={_.size(filteredProcedures)}
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
