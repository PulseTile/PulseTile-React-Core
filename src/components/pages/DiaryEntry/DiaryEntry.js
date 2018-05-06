import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import _ from 'lodash/fp';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lifecycle, compose } from 'recompose';

import PluginListHeader from '../../plugin-page-component/PluginListHeader';
import PluginCreate from '../../plugin-page-component/PluginCreate';
import PluginMainPanel from '../../plugin-page-component/PluginMainPanel';
import DiaryEntryCreateForm from './DiaryEntryCreate/DiaryEntryCreateForm';
import { columnsConfig, defaultColumnsSelected } from './table-columns.config'
import { fetchPatientDiaryEntryRequest } from './ducks/fetch-patient-diary-entry.duck';
import { fetchPatientDiaryEntryDetailRequest } from './ducks/fetch-patient-diary-entry-detail.duck';
import { fetchPatientDiaryEntryDetailEditRequest } from './ducks/fetch-patient-diary-entry-detail-edit.duck';
import { fetchPatientDiaryEntryCreateRequest } from './ducks/fetch-patient-diary-entry-create.duck';
import { fetchPatientDiaryEntryOnMount, fetchPatientDiaryEntryDetailOnMount } from '../../../utils/HOCs/fetch-patients.utils';
import { patientDiaryEntrySelector, patientDiaryEntryDetailSelector, diaryEntryDetailFormSelector, diaryEntryCreateFormStateSelector } from './selectors';
import { clientUrls } from '../../../config/client-urls.constants';
import DiaryEntryDetail from './DiaryEntryDetail/DiaryEntryDetail';
import { valuesNames } from './forms.config';
import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';
import { checkIsValidateForm, operationsOnCollection } from '../../../utils/plugin-helpers.utils';

const DIARY_ENTRY_MAIN = 'diaryEntriesMain';
const DIARY_ENTRY_DETAIL = 'diaryEntriesDetail';
const DIARY_ENTRY_CREATE = 'diaryEntriesCreate';
const DIARY_ENTRY_PANEL = 'diaryEntriesPanel';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientDiaryEntryRequest, fetchPatientDiaryEntryDetailRequest, fetchPatientDiaryEntryDetailEditRequest, fetchPatientDiaryEntryCreateRequest }, dispatch) });

@connect(patientDiaryEntrySelector, mapDispatchToProps)
@connect(patientDiaryEntryDetailSelector, mapDispatchToProps)
@connect(diaryEntryDetailFormSelector)
@connect(diaryEntryCreateFormStateSelector)
@compose(lifecycle(fetchPatientDiaryEntryOnMount), lifecycle(fetchPatientDiaryEntryDetailOnMount))
export default class DiaryEntry extends PureComponent {
  static propTypes = {
    allDiaryEntry: PropTypes.arrayOf(PropTypes.object),
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
  };

  state = {
    nameShouldInclude: '',
    selectedColumns: defaultColumnsSelected,
    openedPanel: DIARY_ENTRY_PANEL,
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
  };

  componentWillReceiveProps() {
    const sourceId = this.context.router.route.match.params.sourceId;
    const userId = this.context.router.route.match.params.userId;

    //TODO should be implemented common function, and the state stored in the store Redux
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.DIARY_ENTRY}/${sourceId}` && sourceId !== undefined) {
      this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.DIARY_ENTRY}/create`) {
      this.setState({ isSecondPanel: true, isBtnExpandVisible: true, isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: DIARY_ENTRY_CREATE, isDetailPanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.DIARY_ENTRY}`) {
      this.setState({ isSecondPanel: false, isBtnExpandVisible: false, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: DIARY_ENTRY_PANEL, isDetailPanelVisible: false, expandedPanel: 'all' })
    }

    /* istanbul ignore next */
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 500)
  }

  handleExpand = (name, currentPanel) => {
    if (currentPanel === DIARY_ENTRY_MAIN) {
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

  handleDetailDiaryEntryClick = (sourceId) => {
    const { actions, userId } = this.props;
    this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: DIARY_ENTRY_PANEL, editedPanel: {}, expandedPanel: 'all', isLoading: true });
    actions.fetchPatientDiaryEntryDetailRequest({ userId, sourceId });
    this.context.router.history.push(`${clientUrls.PATIENTS}/${userId}/${clientUrls.DIARY_ENTRY}/${sourceId}`);
  };

  handleSetOffset = offset => this.setState({ offset });

  handleCreate = () => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: DIARY_ENTRY_CREATE, isSecondPanel: true, isDetailPanelVisible: false, isBtnExpandVisible: true, expandedPanel: 'all', isSubmit: false, isLoading: true });
    this.context.router.history.push(`${clientUrls.PATIENTS}/${userId}/${clientUrls.DIARY_ENTRY}/create`);
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

  handleDiaryEntryDetailCancel = (name) => {
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
    const { actions, diaryEntryFormState } = this.props;
    if (checkIsValidateForm(diaryEntryFormState)) {
      actions.fetchPatientDiaryEntryDetailEditRequest(this.formValuesToString(formValues, 'edit'));
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
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: DIARY_ENTRY_PANEL, isSecondPanel: false, isBtnExpandVisible: false, expandedPanel: 'all', isSubmit: false, isLoading: true });
    this.context.router.history.push(`${clientUrls.PATIENTS}/${userId}/${clientUrls.DIARY_ENTRY}`);
  };

  handleSaveSettingsCreateForm = (formValues) => {
    const { actions, userId, diaryEntryCreateFormState } = this.props;
    if (checkIsValidateForm(diaryEntryCreateFormState)) {
      actions.fetchPatientDiaryEntryCreateRequest(this.formValuesToString(formValues, 'create'));
      this.context.router.history.push(`${clientUrls.PATIENTS}/${userId}/${clientUrls.DIARY_ENTRY}`);
      this.hideCreateForm();
      this.setState({ isLoading: true });
    } else {
      this.setState({ isSubmit: true });
    }
  };

  formValuesToString = (formValues, formName) => {
    const { userId, diaryEntryDetail } = this.props;
    const sendData = {};

    sendData.userId = userId;
    sendData[valuesNames.TYPE] = formValues[valuesNames.TYPE];
    sendData[valuesNames.NOTE] = formValues[valuesNames.NOTE];
    sendData[valuesNames.AUTHOR] = formValues[valuesNames.AUTHOR];

    if (formName === 'edit') {
      sendData[valuesNames.DATE] = formValues[valuesNames.DATE];
      sendData[valuesNames.SOURCE_ID] = diaryEntryDetail[valuesNames.SOURCE_ID];
      sendData[valuesNames.SOURCE] = diaryEntryDetail[valuesNames.SOURCE];
    }

    if (formName === 'create') {
      sendData[valuesNames.SOURCE] = formValues[valuesNames.SOURCE];
    }

    operationsOnCollection.propsToString(sendData, valuesNames.DATE);
    return sendData;
  };

  hideCreateForm = () => {
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: DIARY_ENTRY_PANEL, isSecondPanel: false, expandedPanel: 'all', isBtnExpandVisible: false })
  };

  formToShowCollection = (collection) => {
    const {columnNameSortBy, sortingOrder, nameShouldInclude} = this.state;

    collection = operationsOnCollection.modificate(collection, [{
      keyFrom: valuesNames.DATE_CREATED,
      keyTo: `${valuesNames.DATE_CREATED}Convert`,
      fn: getDDMMMYYYY
    }]);

    return operationsOnCollection.filterAndSort({
      collection: collection,
      filterBy: nameShouldInclude,
      sortingByKey: columnNameSortBy,
      sortingByOrder: sortingOrder,
      filterKeys: [valuesNames.TYPE, valuesNames.AUTHOR, `${valuesNames.DATE_CREATED}Convert`, valuesNames.SOURCE]
    });
  };

  render() {
    const { selectedColumns, columnNameSortBy, sortingOrder, isSecondPanel, isDetailPanelVisible, isBtnExpandVisible, expandedPanel, openedPanel, isBtnCreateVisible, isCreatePanelVisible, editedPanel, offset, isSubmit, isLoading } = this.state;
    const { allDiaryEntry, diaryEntryDetail, diaryEntryFormState, diaryEntryCreateFormState } = this.props;

    const isPanelDetails = (expandedPanel === DIARY_ENTRY_DETAIL || expandedPanel === DIARY_ENTRY_PANEL);
    const isPanelMain = (expandedPanel === DIARY_ENTRY_MAIN);
    const isPanelCreate = (expandedPanel === DIARY_ENTRY_CREATE);

    const columnsToShowConfig = columnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);

    const filteredDiaryEntry = this.formToShowCollection(allDiaryEntry);

    let sourceId;
    if (isDetailPanelVisible && !_.isEmpty(diaryEntryDetail)) {
      sourceId = diaryEntryDetail[valuesNames.SOURCE_ID];
    }

    return (<section className="page-wrapper">
      <div className={classNames('section', { 'full-panel full-panel-main': isPanelMain, 'full-panel full-panel-details': (isPanelDetails || isPanelCreate) })}>
        <Row>
          {(isPanelMain || expandedPanel === 'all') ? <Col xs={12} className={classNames({ 'col-panel-main': isSecondPanel })}>
            <div className="panel panel-primary">
              <PluginListHeader
                onFilterChange={this.handleFilterChange}
                panelTitle="Diary Entry List"
                isBtnExpandVisible={isBtnExpandVisible}
                isBtnTableVisible
                name={DIARY_ENTRY_MAIN}
                onExpand={this.handleExpand}
                currentPanel={DIARY_ENTRY_MAIN}
              />
              <PluginMainPanel
                headers={columnsToShowConfig}
                resourceData={allDiaryEntry}
                emptyDataMessage="No Diary Entry List"
                onHeaderCellClick={this.handleHeaderCellClick}
                onCellClick={this.handleDetailDiaryEntryClick}
                columnNameSortBy={columnNameSortBy}
                sortingOrder={sortingOrder}
                table="diaryEntries"
                filteredData={filteredDiaryEntry}
                totalEntriesAmount={_.size(filteredDiaryEntry)}
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
            <DiaryEntryDetail
              onExpand={this.handleExpand}
              name={DIARY_ENTRY_DETAIL}
              openedPanel={openedPanel}
              expandedPanel={expandedPanel}
              currentPanel={DIARY_ENTRY_DETAIL}
              detail={diaryEntryDetail}
              onEdit={this.handleEdit}
              editedPanel={editedPanel}
              onCancel={this.handleDiaryEntryDetailCancel}
              onSaveSettings={this.handleSaveSettingsDetailForm}
              diaryEntryFormValues={diaryEntryFormState.values}
              isSubmit={isSubmit}
            />
          </Col> : null}
          {(expandedPanel === 'all' || isPanelCreate) && isCreatePanelVisible && !isDetailPanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <PluginCreate
              onExpand={this.handleExpand}
              name={DIARY_ENTRY_CREATE}
              openedPanel={openedPanel}
              onShow={this.handleShow}
              expandedPanel={expandedPanel}
              currentPanel={DIARY_ENTRY_CREATE}
              onSaveSettings={this.handleSaveSettingsCreateForm}
              formValues={diaryEntryCreateFormState.values}
              onCancel={this.handleCreateCancel}
              isCreatePanelVisible={isCreatePanelVisible}
              componentForm={
                <DiaryEntryCreateForm isSubmit={isSubmit} />
              }
              title="Create Diary Entry"
            />
          </Col> : null}
        </Row>
      </div>
    </section>)
  }
}
