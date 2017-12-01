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
import PersonalNotesCreateForm from './PersonalNotesCreate/PersonalNotesCreateForm';
import { columnsConfig, defaultColumnsSelected } from './table-columns.config'
import { valuesNames } from './forms.config';
import { fetchPatientPersonalNotesRequest } from './ducks/fetch-patient-personal-notes.duck';
import { fetchPatientPersonalNotesDetailRequest } from './ducks/fetch-patient-personal-notes-detail.duck';
import { fetchPatientPersonalNotesDetailEditRequest } from './ducks/fetch-patient-personal-notes-detail-edit.duck';
import { fetchPatientPersonalNotesCreateRequest } from './ducks/fetch-patient-personal-notes-create.duck';
import { fetchPatientPersonalNotesOnMount, fetchPatientPersonalNotesDetailOnMount } from '../../../utils/HOCs/fetch-patients.utils';
import { patientPersonalNotesSelector, patientPersonalNotesDetailSelector, personalNotePanelFormSelector, personalCreateFormStateSelector } from './selectors';
import { clientUrls } from '../../../config/client-urls.constants';
import PersonalNotesDetail from './PersonalNotesDetail/PersonalNotesDetail';
import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';
import { checkIsValidateForm, operationsOnCollection } from '../../../utils/plugin-helpers.utils';

const PERSONAL_NOTES_MAIN = 'personalNotesMain';
const PERSONAL_NOTES_DETAIL = 'personalNotesDetail';
const PERSONAL_NOTES_CREATE = 'personalNotesCreate';
const PERSONAL_NOTES_PANEL = 'personalNotesPanel';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientPersonalNotesRequest, fetchPatientPersonalNotesDetailRequest, fetchPatientPersonalNotesDetailEditRequest, fetchPatientPersonalNotesCreateRequest }, dispatch) });

@connect(patientPersonalNotesSelector, mapDispatchToProps)
@connect(patientPersonalNotesDetailSelector, mapDispatchToProps)
@connect(personalNotePanelFormSelector)
@connect(personalCreateFormStateSelector)
@compose(lifecycle(fetchPatientPersonalNotesOnMount), lifecycle(fetchPatientPersonalNotesDetailOnMount))
export default class PersonalNotes extends PureComponent {
  static propTypes = {
    allPersonalNotes: PropTypes.arrayOf(PropTypes.object),
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
  };

  state = {
    nameShouldInclude: '',
    selectedColumns: defaultColumnsSelected,
    openedPanel: PERSONAL_NOTES_PANEL,
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
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.PERSONAL_NOTES}/${sourceId}` && sourceId !== undefined) {
      this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.PERSONAL_NOTES}/create`) {
      this.setState({ isSecondPanel: true, isBtnExpandVisible: true, isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: PERSONAL_NOTES_CREATE, isDetailPanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.PERSONAL_NOTES}`) {
      this.setState({ isSecondPanel: false, isBtnExpandVisible: false, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: PERSONAL_NOTES_PANEL, isDetailPanelVisible: false })
    }

    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 500)
  }

  handleExpand = (name, currentPanel) => {
    if (currentPanel === PERSONAL_NOTES_MAIN) {
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

  handleDetailPersonalNotesClick = (sourceId) => {
    const { actions, userId } = this.props;
    this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: PERSONAL_NOTES_PANEL, editedPanel: {}, expandedPanel: 'all', isLoading: true });
    actions.fetchPatientPersonalNotesDetailRequest({ userId, sourceId });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.PERSONAL_NOTES}/${sourceId}`);
  };

  handleSetOffset = offset => this.setState({ offset });

  handleCreate = () => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: PERSONAL_NOTES_CREATE, isSecondPanel: true, isDetailPanelVisible: false, isBtnExpandVisible: true, expandedPanel: 'all', isSubmit: false, isLoading: true });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.PERSONAL_NOTES}/create`);
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

  handlePersonalNotesDetailCancel = (name) => {
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
    const { actions, personalNoteFormState } = this.props;
    if (checkIsValidateForm(personalNoteFormState)) {
      actions.fetchPatientPersonalNotesDetailEditRequest(this.formValuesToString(formValues, 'edit'));
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
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: PERSONAL_NOTES_PANEL, isSecondPanel: false, isBtnExpandVisible: false, expandedPanel: 'all', isSubmit: false, isLoading: true });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.PERSONAL_NOTES}`);
  };

  handleSaveSettingsCreateForm = (formValues) => {
    const { actions, userId, personalCreateFormState } = this.props;
    if (checkIsValidateForm(personalCreateFormState)) {
      actions.fetchPatientPersonalNotesCreateRequest(this.formValuesToString(formValues, 'create'));
      this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.PERSONAL_NOTES}`);
      this.hideCreateForm();
      this.setState({ isLoading: true });
    } else {
      this.setState({ isSubmit: true });
    }
  };

  formValuesToString = (formValues, formName) => {
    const { userId, personalNoteDetail } = this.props;
    const sendData = {};
    const currentDate = new Date();

    sendData.userId = userId;
    sendData[valuesNames.TYPE] = formValues[valuesNames.TYPE];
    sendData[valuesNames.NOTES] = formValues[valuesNames.NOTES];
    sendData[valuesNames.AUTHOR] = formValues[valuesNames.AUTHOR];

    if (formName === 'edit') {
      sendData[valuesNames.DATE] = formValues[valuesNames.DATE];
      sendData[valuesNames.SOURCE_ID] = personalNoteDetail[valuesNames.SOURCE_ID];
      sendData[valuesNames.SOURCE] = personalNoteDetail[valuesNames.SOURCE];
    }

    if (formName === 'create') {
      sendData[valuesNames.DATE] = currentDate.getTime();
      sendData[valuesNames.SOURCE] = formValues[valuesNames.SOURCE];
    }

    return sendData;
  };

  hideCreateForm = () => {
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: PERSONAL_NOTES_PANEL, isSecondPanel: false, expandedPanel: 'all', isBtnExpandVisible: false })
  };

  formToShowCollection = (collection) => {
    const { columnNameSortBy, sortingOrder, nameShouldInclude } = this.state;

    collection = operationsOnCollection.modificate(collection, [{
      keyFrom: valuesNames.DATE,
      keyTo: `${valuesNames.DATE}Convert`,
      fn: getDDMMMYYYY,
    }]);

    return operationsOnCollection.filterAndSort({
      collection,
      filterBy: nameShouldInclude,
      sortingByKey: columnNameSortBy,
      sortingByOrder: sortingOrder,
      filterKeys: [valuesNames.TYPE, valuesNames.AUTHOR, `${valuesNames.DATE}Convert`, valuesNames.SOURCE],
    });
  };

  render() {
    const { selectedColumns, columnNameSortBy, sortingOrder, isSecondPanel, isDetailPanelVisible, isBtnExpandVisible, expandedPanel, openedPanel, isBtnCreateVisible, isCreatePanelVisible, editedPanel, offset, isSubmit, isLoading } = this.state;
    const { allPersonalNotes, personalNoteDetail, personalNoteFormState, personalCreateFormState } = this.props;

    const isPanelDetails = (expandedPanel === PERSONAL_NOTES_DETAIL || expandedPanel === PERSONAL_NOTES_PANEL);
    const isPanelMain = (expandedPanel === PERSONAL_NOTES_MAIN);
    const isPanelCreate = (expandedPanel === PERSONAL_NOTES_CREATE);

    const columnsToShowConfig = columnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);

    const filteredPersonalNotes = this.formToShowCollection(allPersonalNotes);

    let sourceId;
    if (!_.isEmpty(personalNoteDetail)) {
      sourceId = personalNoteDetail[valuesNames.SOURCE_ID];
    }

    return (<section className="page-wrapper">
      <div className={classNames('section', { 'full-panel full-panel-main': isPanelMain, 'full-panel full-panel-details': (isPanelDetails || isPanelCreate) })}>
        <Row>
          {(isPanelMain || expandedPanel === 'all') ? <Col xs={12} className={classNames({ 'col-panel-main': isSecondPanel })}>
            <div className="panel panel-primary">
              <PluginListHeader
                onFilterChange={this.handleFilterChange}
                panelTitle="Personal Notes"
                isBtnExpandVisible={isBtnExpandVisible}
                name={PERSONAL_NOTES_MAIN}
                onExpand={this.handleExpand}
                currentPanel={PERSONAL_NOTES_MAIN}
              />
              <PluginMainPanel
                headers={columnsToShowConfig}
                resourceData={allPersonalNotes}
                emptyDataMessage="No personal notes"
                onHeaderCellClick={this.handleHeaderCellClick}
                onCellClick={this.handleDetailPersonalNotesClick}
                columnNameSortBy={columnNameSortBy}
                sortingOrder={sortingOrder}
                table="personalNotes"
                filteredData={filteredPersonalNotes}
                totalEntriesAmount={_.size(filteredPersonalNotes)}
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
            <PersonalNotesDetail
              onExpand={this.handleExpand}
              name={PERSONAL_NOTES_DETAIL}
              openedPanel={openedPanel}
              expandedPanel={expandedPanel}
              currentPanel={PERSONAL_NOTES_DETAIL}
              detail={personalNoteDetail}
              onEdit={this.handleEdit}
              editedPanel={editedPanel}
              onCancel={this.handlePersonalNotesDetailCancel}
              onSaveSettings={this.handleSaveSettingsDetailForm}
              personalNoteFormValues={personalNoteFormState.values}
              isSubmit={isSubmit}
            />
          </Col> : null}
          {(expandedPanel === 'all' || isPanelCreate) && isCreatePanelVisible && !isDetailPanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <PluginCreate
              onExpand={this.handleExpand}
              name={PERSONAL_NOTES_CREATE}
              openedPanel={openedPanel}
              onShow={this.handleShow}
              expandedPanel={expandedPanel}
              currentPanel={PERSONAL_NOTES_CREATE}
              onSaveSettings={this.handleSaveSettingsCreateForm}
              formValues={personalCreateFormState.values}
              onCancel={this.handleCreateCancel}
              isCreatePanelVisible={isCreatePanelVisible}
              componentForm={
                <PersonalNotesCreateForm isSubmit={isSubmit} />
              }
              title="Create Personal Note"
            />
          </Col> : null}
        </Row>
      </div>
    </section>)
  }
}
