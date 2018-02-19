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
import { defaultFormValues } from './ClinicalStatementsCreate/default-values.config';

import { fetchPatientClinicalStatementsRequest } from './ducks/fetch-patient-clinical-statements.duck';
import { fetchPatientClinicalStatementsCreateRequest } from './ducks/fetch-patient-clinical-statements-create.duck';
import { fetchPatientClinicalStatementsDetailRequest } from './ducks/fetch-patient-clinical-statements-detail.duck';
import { fetchPatientClinicalStatementsOnMount, fetchPatientClinicalStatementsDetailOnMount } from '../../../utils/HOCs/fetch-patients.utils';
import { patientClinicalStatementsSelector, clinicalStatementsCreateFormStateSelector, patientClinicalStatementsDetailSelector } from './selectors';
import { clientUrls } from '../../../config/client-urls.constants';
import { checkIsValidateForm, operationsOnCollection } from '../../../utils/plugin-helpers.utils';
import ClinicalStatementsDetail from './ClinicalStatementsDetail/ClinicalStatementsDetail';
import PluginCreate from '../../plugin-page-component/PluginCreate';
import ClinicalStatementsCreateForm from './ClinicalStatementsCreate/ClinicalStatementsCreateForm'
import {getDDMMMYYYY} from "../../../utils/time-helpers.utils";

const CLINICAL_STATEMENTS_MAIN = 'clinicalStatementsMain';
const CLINICAL_STATEMENTS_DETAIL = 'clinicalStatementsDetail';
const CLINICAL_STATEMENTS_CREATE = 'clinicalStatementsCreate';
const CLINICAL_STATEMENT_PANEL = 'clinicalStatementPanel';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientClinicalStatementsRequest, fetchPatientClinicalStatementsCreateRequest, fetchPatientClinicalStatementsDetailRequest }, dispatch) });

@connect(patientClinicalStatementsSelector, mapDispatchToProps)
@connect(patientClinicalStatementsDetailSelector)
@connect(clinicalStatementsCreateFormStateSelector)
@compose(lifecycle(fetchPatientClinicalStatementsOnMount), lifecycle(fetchPatientClinicalStatementsDetailOnMount))
export default class ClinicalStatements extends PureComponent {
  static propTypes = {
    allClinicalStatements: PropTypes.arrayOf(PropTypes.object),
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
  };

  state = {
    nameShouldInclude: '',
    selectedColumns: defaultColumnsSelected,
    openedPanel: CLINICAL_STATEMENT_PANEL,
    columnNameSortBy: valuesNames.TYPE,
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
    clickOnCreate: false
  };

  componentWillReceiveProps() {
    const sourceId = this.context.router.route.match.params.sourceId;
    const userId = this.context.router.route.match.params.userId;

    //TODO should be implemented common function, and the state stored in the store Redux
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.CLINICAL_STATEMENTS}/${sourceId}` && sourceId !== undefined) {
      this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.CLINICAL_STATEMENTS}/create`) {
      this.setState({ isSecondPanel: true, isBtnExpandVisible: true, isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: CLINICAL_STATEMENTS_CREATE, isDetailPanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.CLINICAL_STATEMENTS}`) {
      this.setState({ isSecondPanel: false, isBtnExpandVisible: false, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: CLINICAL_STATEMENT_PANEL, isDetailPanelVisible: false, expandedPanel: 'all' })
    }

    /* istanbul ignore next */
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 500)
  }

  handleExpand = (name, currentPanel) => {
    if (currentPanel === CLINICAL_STATEMENTS_MAIN) {
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

  handleDetailClinicalStatementsClick = (sourceId) => {
    const { actions, userId } = this.props;
    this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: CLINICAL_STATEMENT_PANEL, editedPanel: {}, expandedPanel: 'all', isLoading: true })
    actions.fetchPatientClinicalStatementsDetailRequest({ userId, sourceId });
    this.context.router.history.push(`${clientUrls.PATIENTS}/${userId}/${clientUrls.CLINICAL_STATEMENTS}/${sourceId}`);
  };

  handleSetOffset = offset => this.setState({ offset });

  handleCreate = () => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: CLINICAL_STATEMENTS_CREATE, isSecondPanel: true, isDetailPanelVisible: false, isSubmit: false, isLoading: true })
    this.context.router.history.push(`${clientUrls.PATIENTS}/${userId}/${clientUrls.CLINICAL_STATEMENTS}/create`);
  };

  handleEdit = () => {};

  handleClinicalStatementDetailCancel = (name) => {
    this.setState(prevState => ({
      editedPanel: {
        ...prevState.editedPanel,
        [name]: false,
      },
      isSubmit: false,
      isLoading: true,
    }))
  };

  handleSaveSettingsDetailForm = () => {};

  handleCreateCancel = () => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: CLINICAL_STATEMENT_PANEL, isSecondPanel: false, isBtnExpandVisible: false, expandedPanel: 'all', isSubmit: false, isLoading: true });
    this.context.router.history.push(`${clientUrls.PATIENTS}/${userId}/${clientUrls.CLINICAL_STATEMENTS}`);
  };

  handleSaveSettingsCreateForm = (formValues) => {
    const { actions, userId, clinicalStatementsCreateFormState } = this.props;
    const { clickOnCreate } = this.state;


    if (checkIsValidateForm(clinicalStatementsCreateFormState)) {
      actions.fetchPatientClinicalStatementsCreateRequest(this.formValuesToString(formValues, 'create'));
      this.context.router.history.push(`${clientUrls.PATIENTS}/${userId}/${clientUrls.CLINICAL_STATEMENTS}`);
      this.hideCreateForm();
      this.setState({ clickOnCreate: !clickOnCreate, isSubmit: false, isLoading: true });
    } else {
      this.setState({ clickOnCreate: !clickOnCreate, isSubmit: true });
    }
  };

  formValuesToString = (formValues, formName) => {
    const { userId} = this.props;
    const sendData = {};

    sendData.userId = userId;
    sendData[valuesNames.TYPE] = formValues[valuesNames.TYPE];
    sendData[valuesNames.NOTE_CONTENT] = formValues[valuesNames.NOTE][valuesNames.NOTE_CONTENT];
    sendData[valuesNames.NOTE_TEXT] = formValues[valuesNames.NOTE][valuesNames.NOTE_TEXT];
    sendData[valuesNames.AUTHOR] = formValues[valuesNames.AUTHOR];
    sendData[valuesNames.DATE_CREATED] = new Date().getTime();
    sendData[valuesNames.SOURCE] = 'ethercis';

    operationsOnCollection.propsToString(sendData, valuesNames.DATE_CREATED);
    return sendData;
  };

  hideCreateForm = () => {
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: CLINICAL_STATEMENT_PANEL, isSecondPanel: false })
  };

  handleShow = (name) => {
    this.setState({ openedPanel: name })
  };

  formToShowCollection = (collection) => {
    const { columnNameSortBy, sortingOrder, nameShouldInclude } = this.state;

    collection = operationsOnCollection.modificate(collection, [{
      keyFrom: valuesNames.DATE_CREATED,
      keyTo: `${valuesNames.DATE_CREATED}Convert`,
      fn: getDDMMMYYYY
    }]);

    return operationsOnCollection.filterAndSort({
      collection,
      filterBy: nameShouldInclude,
      sortingByKey: columnNameSortBy,
      sortingByOrder: sortingOrder,
      filterKeys: [valuesNames.TYPE, `${valuesNames.DATE_CREATED}Convert`, valuesNames.AUTHOR, valuesNames.SOURCE],
    });
  };

  render() {
      const { selectedColumns, columnNameSortBy, sortingOrder, isSecondPanel, isDetailPanelVisible, isBtnExpandVisible, expandedPanel, openedPanel,
        isBtnCreateVisible, isCreatePanelVisible, editedPanel, offset, isSubmit, isLoading, clickOnCreate } = this.state;
      const { allClinicalStatements, clinicalStatementsCreateFormState, clinicalStatementDetail, match } = this.props;

      const isPanelDetails = (expandedPanel === CLINICAL_STATEMENTS_DETAIL || expandedPanel === CLINICAL_STATEMENT_PANEL);
      const isPanelMain = (expandedPanel === CLINICAL_STATEMENTS_MAIN);
      const isPanelCreate = (expandedPanel === CLINICAL_STATEMENTS_CREATE);

      const filteredClinicalStatements = this.formToShowCollection(allClinicalStatements);

      const columnsToShowConfig = columnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);

      let sourceId;
      if (isDetailPanelVisible && !_.isEmpty(clinicalStatementDetail)) {
        sourceId = clinicalStatementDetail[valuesNames.SOURCE_ID];
      }

      return (<section className="page-wrapper">
        <div className={classNames('section', { 'full-panel full-panel-main': isPanelMain, 'full-panel full-panel-details': (isPanelDetails || isPanelCreate) })}>
          <Row>
            {(isPanelMain || expandedPanel === 'all') ? <Col xs={12} className={classNames({ 'col-panel-main': isSecondPanel })}>
              <div className="panel panel-primary">
                <PluginListHeader
                  onFilterChange={this.handleFilterChange}
                  panelTitle="Clinical Statements"
                  isBtnExpandVisible={isBtnExpandVisible}
                  isBtnTableVisible={false}
                  name={CLINICAL_STATEMENTS_MAIN}
                  onExpand={this.handleExpand}
                  currentPanel={CLINICAL_STATEMENTS_MAIN}
                />
                <PluginMainPanel
                  headers={columnsToShowConfig}
                  resourceData={allClinicalStatements}
                  emptyDataMessage="No clinical statements"
                  onHeaderCellClick={this.handleHeaderCellClick}
                  onCellClick={this.handleDetailClinicalStatementsClick}
                  columnNameSortBy={columnNameSortBy}
                  sortingOrder={sortingOrder}
                  table="clinicalStatements"
                  filteredData={filteredClinicalStatements}
                  totalEntriesAmount={_.size(filteredClinicalStatements)}
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
              <ClinicalStatementsDetail
                onExpand={this.handleExpand}
                name={CLINICAL_STATEMENTS_DETAIL}
                openedPanel={openedPanel}
                onShow={this.handleShow}
                expandedPanel={expandedPanel}
                currentPanel={CLINICAL_STATEMENTS_DETAIL}
                detail={clinicalStatementDetail}
                onEdit={this.handleEdit}
                editedPanel={editedPanel}
                onCancel={this.handleClinicalStatementDetailCancel}
                onSaveSettings={this.handleSaveSettingsDetailForm}
                isSubmit={isSubmit}
              />
            </Col> : null}
            {(expandedPanel === 'all' || isPanelCreate) && isCreatePanelVisible && !isDetailPanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
              <PluginCreate
                title="Create Clinical Statement"
                onExpand={this.handleExpand}
                name={CLINICAL_STATEMENTS_CREATE}
                openedPanel={openedPanel}
                onShow={this.handleShow}
                expandedPanel={expandedPanel}
                currentPanel={CLINICAL_STATEMENTS_CREATE}
                onSaveSettings={this.handleSaveSettingsCreateForm}
                formValues={clinicalStatementsCreateFormState.values}
                onCancel={this.handleCreateCancel}
                isCreatePanelVisible={isCreatePanelVisible}
                componentForm={
                  <ClinicalStatementsCreateForm isSubmit={isSubmit} match={match} clickOnCreate={clickOnCreate}/>
                }
              />
            </Col> : null}
          </Row>
        </div>
      </section>)
    }
}
