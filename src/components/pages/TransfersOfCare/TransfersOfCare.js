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

import { fetchPatientTransfersOfCareRequest } from './ducks/fetch-patient-transfers-of-care.duck';
import { fetchPatientTransfersOfCareCreateRequest } from './ducks/fetch-patient-transfers-of-care-create.duck';
import { fetchPatientTransfersOfCareDetailRequest } from './ducks/fetch-patient-transfers-of-care-detail.duck';
import { fetchPatientTransfersOfCareDetailEditRequest } from './ducks/fetch-patient-transfers-of-care-detail-edit.duck';
import { fetchPatientTransfersOfCareOnMount, fetchPatientTransfersOfCareDetailOnMount } from '../../../utils/HOCs/fetch-patients.utils';
import { patientTransfersOfCareSelector, transfersOfCareDetailFormStateSelector, transfersOfCareCreateFormStateSelector, patientTransfersOfCareDetailSelector } from './selectors';
import { clientUrls } from '../../../config/client-urls.constants';
import { checkIsValidateForm, operationsOnCollection } from '../../../utils/plugin-helpers.utils';
import TransfersOfCareDetail from './TransfersOfCareDetail/TransfersOfCareDetail';
import PluginCreate from '../../plugin-page-component/PluginCreate';
import TransfersOfCareCreateForm from './TransfersOfCareCreate/TransfersOfCareCreateForm'
import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';

const TRANSFERS_OF_CARE_MAIN = 'transfersOfCareMain';
const TRANSFERS_OF_CARE_DETAIL = 'transfersOfCareDetail';
const TRANSFERS_OF_CARE_CREATE = 'transfersOfCareCreate';
const TRANSFER_OF_CARE_PANEL = 'transferOfCarePanel';
const META_PANEL = 'metaPanel';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchPatientTransfersOfCareRequest,
    fetchPatientTransfersOfCareCreateRequest,
    fetchPatientTransfersOfCareDetailRequest,
    fetchPatientTransfersOfCareDetailEditRequest,
  }, dispatch) });

@connect(patientTransfersOfCareSelector, mapDispatchToProps)
@connect(patientTransfersOfCareDetailSelector)
@connect(transfersOfCareDetailFormStateSelector)
@connect(transfersOfCareCreateFormStateSelector)
@compose(lifecycle(fetchPatientTransfersOfCareOnMount), lifecycle(fetchPatientTransfersOfCareDetailOnMount))

export default class TransfersOfCare extends PureComponent {
  static propTypes = {
    allTransfersOfCare: PropTypes.arrayOf(PropTypes.object),
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
  };

  state = {
    nameShouldInclude: '',
    selectedColumns: defaultColumnsSelected,
    openedPanel: TRANSFER_OF_CARE_PANEL,
    columnNameSortBy: valuesNames.NUMBER_TEXT,
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
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.TRANSFERS_OF_CARE}/${sourceId}` && sourceId !== undefined) {
      this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.TRANSFERS_OF_CARE}/create`) {
      this.setState({ isSecondPanel: true, isBtnExpandVisible: true, isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: TRANSFERS_OF_CARE_CREATE, isDetailPanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.TRANSFERS_OF_CARE}`) {
      this.setState({ isSecondPanel: false, isBtnExpandVisible: false, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: TRANSFER_OF_CARE_PANEL, isDetailPanelVisible: false, expandedPanel: 'all' })
    }

    /* istanbul ignore next */
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 500)
  }

  handleExpand = (name, currentPanel) => {
    if (currentPanel === TRANSFERS_OF_CARE_MAIN) {
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

  handleDetailTransfersOfCareClick = (sourceId) => {
    const { actions, userId } = this.props;
    this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: TRANSFER_OF_CARE_PANEL, editedPanel: {}, expandedPanel: 'all', isLoading: true })
    actions.fetchPatientTransfersOfCareDetailRequest({ userId, sourceId });
    this.context.router.history.push(`${clientUrls.PATIENTS}/${userId}/${clientUrls.TRANSFERS_OF_CARE}/${sourceId}`);
  };

  handleSetOffset = offset => this.setState({ offset });

  handleCreate = () => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: TRANSFERS_OF_CARE_CREATE, isSecondPanel: true, isDetailPanelVisible: false, isSubmit: false, isLoading: true })
    this.context.router.history.push(`${clientUrls.PATIENTS}/${userId}/${clientUrls.TRANSFERS_OF_CARE}/create`);
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

  handleTransferOfCareDetailCancel = (name) => {
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
    const { actions, transfersOfCareDetailFormState } = this.props;
    if (checkIsValidateForm(transfersOfCareDetailFormState)) {
      actions.fetchPatientTransfersOfCareDetailEditRequest(this.formValuesToString(formValues, 'edit'));
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
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: TRANSFER_OF_CARE_PANEL, isSecondPanel: false, isBtnExpandVisible: false, expandedPanel: 'all', isSubmit: false, isLoading: true });
    this.context.router.history.push(`${clientUrls.PATIENTS}/${userId}/${clientUrls.TRANSFERS_OF_CARE}`);
  };

  handleSaveSettingsCreateForm = (formValues) => {
    const { actions, userId, transfersOfCareCreateFormState } = this.props;

    if (checkIsValidateForm(transfersOfCareCreateFormState)) {
      actions.fetchPatientTransfersOfCareCreateRequest(this.formValuesToString(formValues, 'create'));
      this.context.router.history.push(`${clientUrls.PATIENTS}/${userId}/${clientUrls.TRANSFERS_OF_CARE}`);
      this.hideCreateForm();
      this.setState({ isSubmit: false, isLoading: true });
    } else {
      this.setState({ isSubmit: true });
    }
  };

  formValuesToString = (formValues, formName) => {
    const { userId, transferOfCareDetail } = this.props;
    const sendData = {};
    const currentDate = new Date().getTime();

    sendData.userId = userId;
    sendData[valuesNames.FROM] = formValues[valuesNames.FROM];
    sendData[valuesNames.TO] = formValues[valuesNames.TO];
    sendData[valuesNames.RECORDS] = formValues[valuesNames.RECORDS];
    sendData[valuesNames.CLINICAL] = formValues[valuesNames.CLINICAL];
    sendData[valuesNames.REASON] = formValues[valuesNames.REASON];
    sendData[valuesNames.DATE_TIME] = new Date(formValues[valuesNames.DATE_TIME]).getTime();
    sendData[valuesNames.DATE_CREATED] = currentDate;

    if (formName === 'edit') {
      sendData[valuesNames.SOURCE_ID] = transferOfCareDetail[valuesNames.SOURCE_ID];
    }

    operationsOnCollection.propsToString(sendData, valuesNames.RECORDS, valuesNames.DATE_TIME, valuesNames.DATE_CREATED);
    return sendData;
  };

  hideCreateForm = () => {
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: TRANSFER_OF_CARE_PANEL, isSecondPanel: false })
  };

  handleShow = (name) => {
    this.setState({ openedPanel: name })
  };

  formToShowCollection = (collection) => {
    const { columnNameSortBy, sortingOrder, nameShouldInclude } = this.state;

    collection = operationsOnCollection.modificate(collection, [{
      keyFrom: valuesNames.DATE_TIME,
      keyTo: `${valuesNames.DATE_TIME}Convert`,
      fn: getDDMMMYYYY,
    }]);

    return operationsOnCollection.filterAndSort({
      collection,
      filterBy: nameShouldInclude,
      sortingByKey: columnNameSortBy,
      sortingByOrder: sortingOrder,
      filterKeys: [valuesNames.NUMBER_TEXT, valuesNames.FROM, valuesNames.TO, `${valuesNames.DATE_TIME}Convert`, valuesNames.SOURCE],
      modeSorting: {
        replacement: [{
          instead: valuesNames.NUMBER_TEXT,
          to: valuesNames.NUMBER,
        }],
        number: [valuesNames.NUMBER, valuesNames.DATE_TIME],
      },
    });
  };

  render() {
    const { selectedColumns, columnNameSortBy, sortingOrder, isSecondPanel, isDetailPanelVisible, isBtnExpandVisible,
      expandedPanel, openedPanel, isBtnCreateVisible, isCreatePanelVisible, editedPanel, offset, isSubmit, isLoading } = this.state;
    const { allTransfersOfCare, transfersOfCareDetailFormState,
      transfersOfCareCreateFormState, transferOfCareDetail, match } = this.props;

    const isPanelDetails = (expandedPanel === TRANSFERS_OF_CARE_DETAIL || expandedPanel === TRANSFER_OF_CARE_PANEL || expandedPanel === META_PANEL);
    const isPanelMain = (expandedPanel === TRANSFERS_OF_CARE_MAIN);
    const isPanelCreate = (expandedPanel === TRANSFERS_OF_CARE_CREATE);

    const filteredTransfersOfCare = this.formToShowCollection(allTransfersOfCare);

    const columnsToShowConfig = columnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);

    let sourceId;
    if (isDetailPanelVisible && !_.isEmpty(transferOfCareDetail)) {
      if (transferOfCareDetail[valuesNames.SOURCE_ID]) {
        sourceId = transferOfCareDetail[valuesNames.SOURCE_ID];
      } else if (this.context.router.route.match.params.sourceId) {
        sourceId = this.context.router.route.match.params.sourceId;
        transferOfCareDetail[valuesNames.SOURCE_ID] = sourceId;
      }
    }

    return (<section className="page-wrapper">
      <div className={classNames('section', { 'full-panel full-panel-main': isPanelMain, 'full-panel full-panel-details': (isPanelDetails || isPanelCreate) })}>
        <Row>
          {(isPanelMain || expandedPanel === 'all') ? <Col xs={12} className={classNames({ 'col-panel-main': isSecondPanel })}>
            <div className="panel panel-primary">
              <PluginListHeader
                onFilterChange={this.handleFilterChange}
                panelTitle="Transfers of Care"
                isBtnExpandVisible={isBtnExpandVisible}
                isBtnTableVisible={false}
                name={TRANSFERS_OF_CARE_MAIN}
                onExpand={this.handleExpand}
                currentPanel={TRANSFERS_OF_CARE_MAIN}
              />
              <PluginMainPanel
                headers={columnsToShowConfig}
                resourceData={allTransfersOfCare}
                emptyDataMessage="No transfers of care"
                onHeaderCellClick={this.handleHeaderCellClick}
                onCellClick={this.handleDetailTransfersOfCareClick}
                columnNameSortBy={columnNameSortBy}
                sortingOrder={sortingOrder}
                table="transfersOfCare"
                filteredData={filteredTransfersOfCare}
                totalEntriesAmount={_.size(filteredTransfersOfCare)}
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
            <TransfersOfCareDetail
              onExpand={this.handleExpand}
              name={TRANSFERS_OF_CARE_DETAIL}
              openedPanel={openedPanel}
              onShow={this.handleShow}
              expandedPanel={expandedPanel}
              currentPanel={TRANSFERS_OF_CARE_DETAIL}
              detail={transferOfCareDetail}
              onEdit={this.handleEdit}
              editedPanel={editedPanel}
              onCancel={this.handleTransferOfCareDetailCancel}
              onSaveSettings={this.handleSaveSettingsDetailForm}
              transfersOfCareDetailFormValues={transfersOfCareDetailFormState.values}
              isSubmit={isSubmit}
              match={match}
            />
          </Col> : null}
          {(expandedPanel === 'all' || isPanelCreate) && isCreatePanelVisible && !isDetailPanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <PluginCreate
              title="Create Transfer Of Care"
              onExpand={this.handleExpand}
              name={TRANSFERS_OF_CARE_CREATE}
              openedPanel={openedPanel}
              onShow={this.handleShow}
              expandedPanel={expandedPanel}
              currentPanel={TRANSFERS_OF_CARE_CREATE}
              onSaveSettings={this.handleSaveSettingsCreateForm}
              formValues={transfersOfCareCreateFormState.values}
              onCancel={this.handleCreateCancel}
              isCreatePanelVisible={isCreatePanelVisible}
              componentForm={
                <TransfersOfCareCreateForm isSubmit={isSubmit} match={match} />
              }
            />
          </Col> : null}
        </Row>
      </div>
    </section>)
  }
}
