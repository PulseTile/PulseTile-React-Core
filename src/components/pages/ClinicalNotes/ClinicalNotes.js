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
import ClinicalNotesCreateForm from './ClinicalNotesCreate/ClinicalNotesCreateForm';
import { columnsConfig, defaultColumnsSelected } from './table-columns.config'
import { valuesNames } from './forms.config';
import { fetchPatientClinicalNotesRequest } from './ducks/fetch-patient-clinical-notes.duck';
import { fetchPatientClinicalNotesDetailRequest } from './ducks/fetch-patient-clinical-notes-detail.duck';
import { fetchPatientClinicalNotesDetailEditRequest } from './ducks/fetch-patient-clinical-notes-detail-edit.duck';
import { fetchPatientClinicalNotesCreateRequest } from './ducks/fetch-patient-clinical-notes-create.duck';
import { fetchPatientClinicalNotesOnMount } from '../../../utils/HOCs/fetch-patients.utils';
import { patientClinicalNotesSelector, patientClinicalNotesDetailSelector, clinicalNotePanelFormSelector, clinicalCreateFormStateSelector } from './selectors';
import { clientUrls } from '../../../config/client-urls.constants';
import ClinicalNotesDetail from './ClinicalNotesDetail/ClinicalNotesDetail';
import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';
import { checkIsValidateForm } from '../../../utils/plugin-helpers.utils';

const CLINICAL_NOTES_MAIN = 'clinicalNotesMain';
const CLINICAL_NOTES_DETAIL = 'clinicalNotesDetail';
const CLINICAL_NOTES_CREATE = 'clinicalNotesCreate';
const CLINICAL_NOTES_PANEL = 'clinicalNotesPanel';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientClinicalNotesRequest, fetchPatientClinicalNotesDetailRequest, fetchPatientClinicalNotesDetailEditRequest, fetchPatientClinicalNotesCreateRequest }, dispatch) });

@connect(patientClinicalNotesSelector, mapDispatchToProps)
@connect(patientClinicalNotesDetailSelector, mapDispatchToProps)
@connect(clinicalNotePanelFormSelector)
@connect(clinicalCreateFormStateSelector)
@compose(lifecycle(fetchPatientClinicalNotesOnMount))
export default class ClinicalNotes extends PureComponent {
  static propTypes = {
    allClinicalNotes: PropTypes.arrayOf(PropTypes.object),
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
  };

  state = {
    nameShouldInclude: '',
    selectedColumns: defaultColumnsSelected,
    openedPanel: CLINICAL_NOTES_PANEL,
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
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.CLINICAL_NOTES}/${sourceId}` && sourceId !== undefined) {
      this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.CLINICAL_NOTES}/create`) {
      this.setState({ isSecondPanel: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: true, openedPanel: CLINICAL_NOTES_CREATE, isDetailPanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.CLINICAL_NOTES}`) {
      this.setState({ isSecondPanel: false, isBtnExpandVisible: false, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: CLINICAL_NOTES_PANEL, isDetailPanelVisible: false })
    }

    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 500)
  }

  handleExpand = (name, currentPanel) => {
    if (currentPanel === CLINICAL_NOTES_MAIN) {
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

  handleDetailClinicalNotesClick = (sourceId) => {
    const { actions, userId } = this.props;
    this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: CLINICAL_NOTES_PANEL, editedPanel: {}, expandedPanel: 'all', isLoading: true });
    actions.fetchPatientClinicalNotesDetailRequest({ userId, sourceId });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.CLINICAL_NOTES}/${sourceId}`);
  };

  filterAndSortClinicalNotes = (clinicalNotes) => {
    const { columnNameSortBy, sortingOrder, nameShouldInclude } = this.state;
    const filterByClinicalNotesTypePredicate = _.flow(_.get(valuesNames.TYPE), _.toLower, _.includes(nameShouldInclude));
    const filterByAuthorPredicate = _.flow(_.get(valuesNames.AUTHOR), _.toLower, _.includes(nameShouldInclude));
    const filterByDatePredicate = _.flow(_.get(`${valuesNames.DATE_CREATED}Convert`), _.toLower, _.includes(nameShouldInclude));
    const filterBySourcePredicate = _.flow(_.get(valuesNames.SOURCE), _.toLower, _.includes(nameShouldInclude));

    const reverseIfDescOrder = _.cond([
      [_.isEqual('desc'), () => _.reverse],
      [_.stubTrue, () => v => v],
    ])(sortingOrder);

    if (clinicalNotes !== undefined) {
      clinicalNotes.map((item) => {
        item[`${valuesNames.DATE_CREATED}Convert`] = getDDMMMYYYY(item[valuesNames.DATE_CREATED]);
      });
    }

    const filterByClinicalNotesType = _.flow(_.sortBy([item => item[columnNameSortBy].toString().toLowerCase()]), reverseIfDescOrder, _.filter(filterByClinicalNotesTypePredicate))(clinicalNotes);
    const filterByAuthor = _.flow(_.sortBy([item => item[columnNameSortBy].toString().toLowerCase()]), reverseIfDescOrder, _.filter(filterByAuthorPredicate))(clinicalNotes);
    const filterByDate = _.flow(_.sortBy([item => item[columnNameSortBy]]), reverseIfDescOrder, _.filter(filterByDatePredicate))(clinicalNotes);
    const filterBySource = _.flow(_.sortBy([columnNameSortBy].toString().toLowerCase()), reverseIfDescOrder, _.filter(filterBySourcePredicate))(clinicalNotes);

    const filteredAndSortedClinicalNotes = [filterByClinicalNotesType, filterByAuthor, filterByDate, filterBySource].filter((item) => {
      return _.size(item) !== 0;
    });

    if (columnNameSortBy === valuesNames.DATE_CREATED) {
      return filterByDate
    }
    return _.head(filteredAndSortedClinicalNotes)
  };

  handleSetOffset = offset => this.setState({ offset });

  handleCreate = () => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: CLINICAL_NOTES_CREATE, isSecondPanel: true, isDetailPanelVisible: false, isBtnExpandVisible: true, expandedPanel: 'all', isSubmit: false, isLoading: true });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.CLINICAL_NOTES}/create`);
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

  handleClinicalNotesDetailCancel = (name) => {
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
    const { actions, clinicalNoteFormState } = this.props;
    if (checkIsValidateForm(clinicalNoteFormState)) {
      actions.fetchPatientClinicalNotesDetailEditRequest(this.formValuesToString(formValues, 'edit'));
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
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: CLINICAL_NOTES_PANEL, isSecondPanel: false, isBtnExpandVisible: false, expandedPanel: 'all', isSubmit: false, isLoading: true });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.CLINICAL_NOTES}`);
  };

  handleSaveSettingsCreateForm = (formValues) => {
    const { actions, userId, clinicalCreateFormState } = this.props;
    if (checkIsValidateForm(clinicalCreateFormState)) {
      actions.fetchPatientClinicalNotesCreateRequest(this.formValuesToString(formValues, 'create'));
      this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.CLINICAL_NOTES}`);
      this.hideCreateForm();
      this.setState({ isLoading: true });
    } else {
      this.setState({ isSubmit: true });
    }
  };

  formValuesToString = (formValues, formName) => {
    const { userId, clinicalNoteDetail } = this.props;
    const sendData = {};

    sendData.userId = userId;
    sendData[valuesNames.TYPE] = formValues[valuesNames.TYPE];
    sendData[valuesNames.NOTE] = formValues[valuesNames.NOTE];
    sendData[valuesNames.AUTHOR] = formValues[valuesNames.AUTHOR];

    if (formName === 'edit') {
      sendData[valuesNames.DATE] = formValues[valuesNames.DATE];
      sendData[valuesNames.SOURCE_ID] = clinicalNoteDetail[valuesNames.SOURCE_ID];
      sendData[valuesNames.SOURCE] = clinicalNoteDetail[valuesNames.SOURCE];
    }

    if (formName === 'create') {
      sendData[valuesNames.SOURCE] = formValues[valuesNames.SOURCE];
    }

    return sendData;
  };

  hideCreateForm = () => {
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: CLINICAL_NOTES_PANEL, isSecondPanel: false, expandedPanel: 'all', isBtnExpandVisible: false })
  };

  render() {
    const { selectedColumns, columnNameSortBy, sortingOrder, isSecondPanel, isDetailPanelVisible, isBtnExpandVisible, expandedPanel, openedPanel, isBtnCreateVisible, isCreatePanelVisible, editedPanel, offset, isSubmit, isLoading } = this.state;
    const { allClinicalNotes, clinicalNoteDetail, clinicalNoteFormState, clinicalCreateFormState } = this.props;

    const isPanelDetails = (expandedPanel === CLINICAL_NOTES_DETAIL || expandedPanel === CLINICAL_NOTES_PANEL);
    const isPanelMain = (expandedPanel === CLINICAL_NOTES_MAIN);
    const isPanelCreate = (expandedPanel === CLINICAL_NOTES_CREATE);

    const columnsToShowConfig = columnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);

    const filteredClinicalNotes = this.filterAndSortClinicalNotes(allClinicalNotes);

    let sourceId;
    if (!_.isEmpty(clinicalNoteDetail)) {
      sourceId = clinicalNoteDetail[valuesNames.SOURCE_ID];
    }

    return (<section className="page-wrapper">
      <div className={classNames('section', { 'full-panel full-panel-main': isPanelMain, 'full-panel full-panel-details': (isPanelDetails || isPanelCreate) })}>
        <Row>
          {(isPanelMain || expandedPanel === 'all') ? <Col xs={12} className={classNames({ 'col-panel-main': isSecondPanel })}>
            <div className="panel panel-primary">
              <PluginListHeader
                onFilterChange={this.handleFilterChange}
                panelTitle="Clinical Notes"
                isBtnExpandVisible={isBtnExpandVisible}
                isBtnTableVisible
                name={CLINICAL_NOTES_MAIN}
                onExpand={this.handleExpand}
                currentPanel={CLINICAL_NOTES_MAIN}
              />
              <PluginMainPanel
                headers={columnsToShowConfig}
                resourceData={allClinicalNotes}
                emptyDataMessage="No clinical notes"
                onHeaderCellClick={this.handleHeaderCellClick}
                onCellClick={this.handleDetailClinicalNotesClick}
                columnNameSortBy={columnNameSortBy}
                sortingOrder={sortingOrder}
                table="clinicalNotes"
                filteredData={filteredClinicalNotes}
                totalEntriesAmount={_.size(allClinicalNotes)}
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
            <ClinicalNotesDetail
              onExpand={this.handleExpand}
              name={CLINICAL_NOTES_DETAIL}
              openedPanel={openedPanel}
              expandedPanel={expandedPanel}
              currentPanel={CLINICAL_NOTES_DETAIL}
              detail={clinicalNoteDetail}
              onEdit={this.handleEdit}
              editedPanel={editedPanel}
              onCancel={this.handleClinicalNotesDetailCancel}
              onSaveSettings={this.handleSaveSettingsDetailForm}
              clinicalNoteFormValues={clinicalNoteFormState.values}
              isSubmit={isSubmit}
            />
          </Col> : null}
          {(expandedPanel === 'all' || isPanelCreate) && isCreatePanelVisible && !isDetailPanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <PluginCreate
              onExpand={this.handleExpand}
              name={CLINICAL_NOTES_CREATE}
              openedPanel={openedPanel}
              onShow={this.handleShow}
              expandedPanel={expandedPanel}
              currentPanel={CLINICAL_NOTES_CREATE}
              onSaveSettings={this.handleSaveSettingsCreateForm}
              formValues={clinicalCreateFormState.values}
              onCancel={this.handleCreateCancel}
              isCreatePanelVisible={isCreatePanelVisible}
              componentForm={
                <ClinicalNotesCreateForm isSubmit={isSubmit} />
              }
              title="Create Clinical Note"
            />
          </Col> : null}
        </Row>
      </div>
    </section>)
  }
}
