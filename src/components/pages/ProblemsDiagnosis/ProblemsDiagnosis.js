import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import _ from 'lodash/fp';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lifecycle, compose } from 'recompose';
import moment from 'moment';

import PluginListHeader from '../../plugin-page-component/PluginListHeader';
import PluginMainPanel from '../../plugin-page-component/PluginMainPanel';
import { columnsConfig, defaultColumnsSelected } from './table-columns.config'
import { valuesNames } from './forms.config';
import { fetchPatientDiagnosesRequest } from './ducks/fetch-patient-diagnoses.duck';
import { fetchPatientDiagnosesDetailRequest } from './ducks/fetch-patient-diagnoses-detail.duck';
import { fetchPatientDiagnosesDetailEditRequest } from './ducks/fetch-patient-diagnoses-detail-edit.duck';
import { fetchPatientDiagnosesCreateRequest } from './ducks/fetch-patient-diagnoses-create.duck';
import { fetchPatientDiagnosesOnMount, fetchPatientDiagnosesDetailOnMount } from '../../../utils/HOCs/fetch-patients.utils';
import { patientDiagnosesSelector, patientDiagnosesDetailSelector, diagnosisPanelFormSelector, diagnosesCreateFormStateSelector } from './selectors';
import { clientUrls } from '../../../config/client-urls.constants';
import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';
import { checkIsValidateForm, operationsOnCollection } from '../../../utils/plugin-helpers.utils';
import ProblemsDiagnosisDetail from './ProblemsDiagnosisDetail/ProblemsDiagnosisDetail';
import PluginCreate from '../../plugin-page-component/PluginCreate';
import ProblemsDiagnosisCreateForm from './ProblemsDiagnosisCreate/ProblemsDiagnosisCreateForm'

const DIAGNOSES_MAIN = 'diagnosesMain';
const DIAGNOSES_DETAIL = 'diagnosesDetail';
const DIAGNOSES_CREATE = 'diagnosesCreate';
const DIAGNOSES_PANEL = 'diagnosesPanel';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientDiagnosesRequest, fetchPatientDiagnosesDetailRequest, fetchPatientDiagnosesDetailEditRequest, fetchPatientDiagnosesCreateRequest }, dispatch) });

@connect(patientDiagnosesSelector, mapDispatchToProps)
@connect(patientDiagnosesDetailSelector, mapDispatchToProps)
@connect(diagnosisPanelFormSelector)
@connect(diagnosesCreateFormStateSelector)
@compose(lifecycle(fetchPatientDiagnosesOnMount), lifecycle(fetchPatientDiagnosesDetailOnMount))
export default class ProblemsDiagnosis extends PureComponent {
  static propTypes = {
    allDiagnoses: PropTypes.arrayOf(PropTypes.object),
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
  };

  state = {
    nameShouldInclude: '',
    selectedColumns: defaultColumnsSelected,
    openedPanel: DIAGNOSES_PANEL,
    columnNameSortBy: valuesNames.PROBLEM,
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
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.DIAGNOSES}/${sourceId}` && sourceId !== undefined) {
      this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.DIAGNOSES}/create`) {
      this.setState({ isSecondPanel: true, isBtnExpandVisible: true, isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: DIAGNOSES_CREATE, isDetailPanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.DIAGNOSES}`) {
      this.setState({ isSecondPanel: false, isBtnExpandVisible: false, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: DIAGNOSES_PANEL, isDetailPanelVisible: false, expandedPanel: 'all' })
    }

    /* istanbul ignore next */
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 500)
  }

  handleExpand = (name, currentPanel) => {
    if (currentPanel === DIAGNOSES_MAIN) {
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

  handleDetailDiagnosesClick = (sourceId) => {
    const { actions, userId } = this.props;
    this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: DIAGNOSES_PANEL, editedPanel: {}, expandedPanel: 'all', isLoading: true });
    actions.fetchPatientDiagnosesDetailRequest({ userId, sourceId });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.DIAGNOSES}/${sourceId}`);
  };

  handleSetOffset = offset => this.setState({ offset });

  handleCreate = () => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: DIAGNOSES_CREATE, isSecondPanel: true, isDetailPanelVisible: false, isBtnExpandVisible: true, expandedPanel: 'all', isSubmit: false, isLoading: true });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.DIAGNOSES}/create`);
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

  handleDiagnosisDetailCancel = (name) => {
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
    const { actions, diagnosisPanelFormState } = this.props;
    if (checkIsValidateForm(diagnosisPanelFormState)) {
      actions.fetchPatientDiagnosesDetailEditRequest(this.formValuesToString(formValues, 'edit'));
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
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: DIAGNOSES_PANEL, isSecondPanel: false, isBtnExpandVisible: false, expandedPanel: 'all', isSubmit: false, isLoading: true });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.DIAGNOSES}`);
  };

  handleSaveSettingsCreateForm = (formValues) => {
    const { actions, userId, diagnosisCreateFormState } = this.props;

    if (checkIsValidateForm(diagnosisCreateFormState)) {
      actions.fetchPatientDiagnosesCreateRequest(this.formValuesToString(formValues, 'create'));
      this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.DIAGNOSES}`);
      this.setState({ isSubmit: false, isLoading: true });
      this.hideCreateForm();
    } else {
      this.setState({ isSubmit: true });
    }
  };

  formValuesToString = (formValues, formName) => {
    const { userId, diagnosisDetail } = this.props;
    const sendData = {};

    sendData.userId = userId;
    sendData[valuesNames.PROBLEM] = formValues[valuesNames.PROBLEM];
    sendData[valuesNames.DESCRIPTION] = formValues[valuesNames.DESCRIPTION];
    sendData[valuesNames.TERMINOLOGY] = formValues[valuesNames.TERMINOLOGY];
    sendData[valuesNames.CODE] = formValues[valuesNames.CODE];
    sendData[valuesNames.DATE_OF_ONSET] = moment(formValues[valuesNames.DATE_OF_ONSET]).format('YYYY-MM-DD');

    if (formName === 'create') {
      sendData[valuesNames.ISIMPORT] = formValues[valuesNames.ISIMPORT];
      sendData[valuesNames.SOURCE_ID] = formValues[valuesNames.SOURCE_ID];

      // add data about source from documentations
      if (sendData[valuesNames.ISIMPORT]) {
        sendData[valuesNames.IMPORT] = formValues[valuesNames.IMPORT];
        sendData[valuesNames.ORIGINAL_SOURCE] = formValues[valuesNames.ORIGINAL_SOURCE];
        sendData[valuesNames.ORIGINAL_COMPOSITION] = formValues[valuesNames.ORIGINAL_COMPOSITION];
      }
    }

    if (formName === 'edit') {
      sendData[valuesNames.SOURCE] = 'ethercis';
      sendData[valuesNames.SOURCE_ID] = diagnosisDetail[valuesNames.SOURCE_ID];
    }

    operationsOnCollection.propsToString(sendData, valuesNames.DATE_OF_ONSET);
    return sendData;
  };

  hideCreateForm = () => {
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: DIAGNOSES_PANEL, isSecondPanel: false, expandedPanel: 'all', isBtnExpandVisible: false })
  };

  goBack = () => {
    this.context.router.history.goBack();
  };

  formToShowCollection = (collection) => {
    const {columnNameSortBy, sortingOrder, nameShouldInclude} = this.state;

    collection = operationsOnCollection.modificate(collection, [{
      keyFrom: valuesNames.DATE_OF_ONSET,
      keyTo: `${valuesNames.DATE_OF_ONSET}Convert`,
      fn: getDDMMMYYYY
    }]);

    return operationsOnCollection.filterAndSort({
      collection: collection,
      filterBy: nameShouldInclude,
      sortingByKey: columnNameSortBy,
      sortingByOrder: sortingOrder,
      filterKeys: [valuesNames.PROBLEM, `${valuesNames.DATE_OF_ONSET}Convert`, valuesNames.SOURCE]
    });
  };

  render() {
    const { selectedColumns, columnNameSortBy, sortingOrder, isSecondPanel, isDetailPanelVisible, isBtnExpandVisible, expandedPanel, openedPanel, isBtnCreateVisible, isCreatePanelVisible, editedPanel, offset, isSubmit, isLoading } = this.state;
    const { allDiagnoses, diagnosisDetail, diagnosisPanelFormState, diagnosisCreateFormState } = this.props;

    const isPanelDetails = (expandedPanel === DIAGNOSES_DETAIL || expandedPanel === DIAGNOSES_PANEL);
    const isPanelMain = (expandedPanel === DIAGNOSES_MAIN);
    const isPanelCreate = (expandedPanel === DIAGNOSES_CREATE);

    const columnsToShowConfig = columnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);

    const filteredDiagnoses = this.formToShowCollection(allDiagnoses);

    let sourceId;
    if (!_.isEmpty(diagnosisDetail)) {
      sourceId = diagnosisDetail[valuesNames.SOURCE_ID];
    }

    const historyState = this.context.router.history.location.state;
    const isImportFromDocuments = historyState && historyState.importData;

    return (<section className="page-wrapper">
      <div className={classNames('section', { 'full-panel full-panel-main': isPanelMain, 'full-panel full-panel-details': (isPanelDetails || isPanelCreate) })}>
        <Row>
          {(isPanelMain || expandedPanel === 'all') ? <Col xs={12} className={classNames({ 'col-panel-main': isSecondPanel })}>
            <div className="panel panel-primary">
              <PluginListHeader
                onFilterChange={this.handleFilterChange}
                panelTitle="Problems / Diagnoses"
                isBtnExpandVisible={isBtnExpandVisible}
                isBtnTableVisible={false}
                name={DIAGNOSES_MAIN}
                onExpand={this.handleExpand}
                currentPanel={DIAGNOSES_MAIN}
              />
              <PluginMainPanel
                headers={columnsToShowConfig}
                resourceData={allDiagnoses}
                emptyDataMessage="No diagnoses"
                onHeaderCellClick={this.handleHeaderCellClick}
                onCellClick={this.handleDetailDiagnosesClick}
                columnNameSortBy={columnNameSortBy}
                sortingOrder={sortingOrder}
                table="diagnoses"
                filteredData={filteredDiagnoses}
                totalEntriesAmount={_.size(filteredDiagnoses)}
                offset={offset}
                setOffset={this.handleSetOffset}
                isBtnCreateVisible={isBtnCreateVisible}
                onCreate={this.handleCreate}
                id={sourceId}
                isLoading={isLoading}
              />
            </div>
          </Col> : null }
          {(expandedPanel === 'all' || isPanelDetails) && isDetailPanelVisible && !isCreatePanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <ProblemsDiagnosisDetail
              onExpand={this.handleExpand}
              name={DIAGNOSES_DETAIL}
              openedPanel={openedPanel}
              expandedPanel={expandedPanel}
              currentPanel={DIAGNOSES_DETAIL}
              detail={diagnosisDetail}
              onEdit={this.handleEdit}
              editedPanel={editedPanel}
              onCancel={this.handleDiagnosisDetailCancel}
              onSaveSettings={this.handleSaveSettingsDetailForm}
              diagnosisPanelFormValues={diagnosisPanelFormState.values}
              isSubmit={isSubmit}
            />
          </Col> : null}
          {(expandedPanel === 'all' || isPanelCreate) && isCreatePanelVisible && !isDetailPanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <PluginCreate
              title="Create Problem and Diagnosis"
              onExpand={this.handleExpand}
              name={DIAGNOSES_CREATE}
              openedPanel={openedPanel}
              onShow={this.handleShow}
              expandedPanel={expandedPanel}
              currentPanel={DIAGNOSES_CREATE}
              onSaveSettings={this.handleSaveSettingsCreateForm}
              formValues={diagnosisCreateFormState.values}
              onCancel={this.handleCreateCancel}
              isCreatePanelVisible={isCreatePanelVisible}
              isImport={isImportFromDocuments}
              onGoBack={this.goBack}
              componentForm={
                <ProblemsDiagnosisCreateForm isSubmit={isSubmit} />
              }
            />
          </Col> : null}
        </Row>
      </div>
    </section>)
  }
}
