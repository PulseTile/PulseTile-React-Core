import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import _ from 'lodash/fp';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lifecycle, compose } from 'recompose';

import PluginListHeader from '../../plugin-page-component/PluginListHeader';
import { columnsConfig, defaultColumnsSelected } from './table-columns.config'
import { valuesNames } from './forms.config';
import { fetchPatientAllergiesRequest } from './ducks/fetch-patient-allergies.duck';
import { fetchPatientAllergiesCreateRequest } from './ducks/fetch-patient-allergies-create.duck';
import { fetchPatientAllergiesDetailRequest } from './ducks/fetch-patient-allergies-detail.duck';
import { fetchPatientAllergiesDetailEditRequest } from './ducks/fetch-patient-allergies-detail-edit.duck';
import { fetchPatientAllergiesOnMount, fetchPatientAllergiesDetailOnMount } from '../../../utils/HOCs/fetch-patients.utils';
import { patientAllergiesSelector, allergiePanelFormStateSelector, allergiesCreateFormStateSelector, metaPanelFormStateSelector, patientAllergiesDetailSelector } from './selectors';
import AllergiesDetail from './AllergiesDetail/AllergiesDetail';
import PluginCreate from '../../plugin-page-component/PluginCreate';
import { clientUrls } from '../../../config/client-urls.constants';
import AllergiesCreateForm from './AllergiesCreate/AllergiesCreateForm'
import PluginMainPanel from '../../plugin-page-component/PluginMainPanel';
import { checkIsValidateForm } from '../../../utils/plugin-helpers.utils';

const ALLERGIES_MAIN = 'allergiesMain';
const ALLERGIES_DETAIL = 'allergiesDetail';
const ALLERGIES_CREATE = 'allergiesCreate';
const ALLERGIE_PANEL = 'allergiePanel';
const META_PANEL = 'metaPanel';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientAllergiesRequest, fetchPatientAllergiesCreateRequest, fetchPatientAllergiesDetailRequest, fetchPatientAllergiesDetailEditRequest }, dispatch) });

@connect(patientAllergiesSelector, mapDispatchToProps)
@connect(patientAllergiesDetailSelector, mapDispatchToProps)
@connect(allergiePanelFormStateSelector)
@connect(allergiesCreateFormStateSelector)
@connect(metaPanelFormStateSelector)
@compose(lifecycle(fetchPatientAllergiesOnMount), lifecycle(fetchPatientAllergiesDetailOnMount))
export default class Allergies extends PureComponent {
  static propTypes = {
    allAllergies: PropTypes.arrayOf(PropTypes.object),
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
  };

  state = {
    nameShouldInclude: '',
    selectedColumns: defaultColumnsSelected,
    openedPanel: ALLERGIE_PANEL,
    columnNameSortBy: 'cause',
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
    isLoading: true,
    isSubmit: false,
  };

  componentWillReceiveProps() {
    this.setState({ isLoading: true });
    const sourceId = this.context.router.route.match.params.sourceId;
    const userId = this.context.router.route.match.params.userId;
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.ALLERGIES}/${sourceId}` && sourceId !== undefined) {
      this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, isLoading: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.ALLERGIES}`) {
      this.setState({ isLoading: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.ALLERGIES}/create`) {
      this.setState({ isLoading: false })
    }
  }

  handleExpand = (name, currentPanel) => {
    if (currentPanel === ALLERGIES_MAIN) {
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

  handleDetailAllergiesClick = (id, name, sourceId) => {
    const { actions, userId } = this.props;
    this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: ALLERGIE_PANEL, editedPanel: {}, isLoading: true, expandedPanel: 'all' })
    actions.fetchPatientAllergiesDetailRequest({ userId, sourceId });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.ALLERGIES}/${sourceId}`);
  };

  filterAndSortAllergies = (allergies) => {
    const { columnNameSortBy, sortingOrder, nameShouldInclude } = this.state;
    const filterByCausePredicate = _.flow(_.get('cause'), _.toLower, _.includes(nameShouldInclude));
    const filterByReactionPredicate = _.flow(_.get('reaction'), _.toLower, _.includes(nameShouldInclude));
    const filterBySourcePredicate = _.flow(_.get('source'), _.toLower, _.includes(nameShouldInclude));
    const reverseIfDescOrder = _.cond([
      [_.isEqual('desc'), () => _.reverse],
      [_.stubTrue, () => v => v],
    ])(sortingOrder);

    const filterByCause = _.flow(_.sortBy([item => item[columnNameSortBy].toString().toLowerCase()]), reverseIfDescOrder, _.filter(filterByCausePredicate))(allergies);
    const filterByReaction = _.flow(_.sortBy([item => item[columnNameSortBy].toString().toLowerCase()]), reverseIfDescOrder, _.filter(filterByReactionPredicate))(allergies);
    const filterBySource = _.flow(_.sortBy([columnNameSortBy]), reverseIfDescOrder, _.filter(filterBySourcePredicate))(allergies);

    const filteredAndSortedAllergies = [filterByCause, filterByReaction, filterBySource].filter((item) => {
      return _.size(item) !== 0;
    });

    return _.head(filteredAndSortedAllergies)
  };

  handleSetOffset = offset => this.setState({ offset });

  handleCreate = () => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: ALLERGIES_CREATE, isSecondPanel: true, isDetailPanelVisible: false, isLoading: true, isBtnExpandVisible: true, expandedPanel: 'all', isSubmit: false });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.ALLERGIES}/create`);
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

  handleAllergieDetailCancel = (name) => {
    this.setState(prevState => ({
      editedPanel: {
        ...prevState.editedPanel,
        [name]: false,
      },
      isSubmit: false,
    }))
  };

  handleSaveSettingsDetailForm = (formValues, name) => {
    const { allergieDetail, actions, allergiePanelFormState } = this.props;
    formValues.causeCode = allergieDetail.causeCode;
    if (name === ALLERGIE_PANEL) {
      allergieDetail.cause = formValues.cause;
      allergieDetail.reaction = formValues.reaction;
      formValues.causeTerminology = allergieDetail.causeTerminology;
    }
    if (name === META_PANEL) {
      allergieDetail.causeTerminology = formValues.causeTerminology;
      formValues.cause = allergieDetail.cause;
      formValues.reaction = allergieDetail.reaction;
    }
    if (checkIsValidateForm(allergiePanelFormState)) {
      actions.fetchPatientAllergiesDetailEditRequest(this.formValuesToString(formValues, 'edit'));
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
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: ALLERGIE_PANEL, isSecondPanel: false, isBtnExpandVisible: false, expandedPanel: 'all', isSubmit: false, isLoading: true });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.ALLERGIES}`);
  };

  handleSaveSettingsCreateForm = (formValues) => {
    const { actions, userId, allergiesCreateFormState } = this.props;
    if (checkIsValidateForm(allergiesCreateFormState)) {
      actions.fetchPatientAllergiesCreateRequest(this.formValuesToString(formValues, 'create'));
      this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.ALLERGIES}`);
      this.hideCreateForm();
      this.setState({ isLoading: true });
    } else {
      this.setState({ isSubmit: true });
    }
  };

  formValuesToString = (formValues, formName) => {
    const { userId, allergieDetail } = this.props;
    const sendData = {};

    sendData.userId = userId;
    sendData[valuesNames.CAUSE] = formValues[valuesNames.CAUSE];
    sendData[valuesNames.REACTION] = formValues[valuesNames.REACTION];
    sendData[valuesNames.TERMINOLOGY] = formValues[valuesNames.TERMINOLOGY];
    sendData[valuesNames.CAUSECODE] = formValues[valuesNames.CAUSECODE];

    if (formName === 'edit') {
      sendData.sourceId = allergieDetail.sourceId;
      sendData.source = 'ethercis';
    }

    if (formName === 'create') {
      sendData.sourceId = '';
      sendData[valuesNames.ISIMPORT] = formValues[valuesNames.ISIMPORT];
    }

    return sendData;
  };


  hideCreateForm = () => {
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: ALLERGIE_PANEL, isSecondPanel: false, expandedPanel: 'all', isBtnExpandVisible: false })
  };

  handleShow = (name) => {
    this.setState({ openedPanel: name })
  };

  render() {
    const { selectedColumns, columnNameSortBy, sortingOrder, isSecondPanel, isDetailPanelVisible, isBtnExpandVisible, expandedPanel, openedPanel, isBtnCreateVisible, isCreatePanelVisible, editedPanel, offset, isLoading, isSubmit } = this.state;
    const { allAllergies, allergiePanelFormState, allergiesCreateFormState, metaPanelFormState, allergieDetail } = this.props;

    const isPanelDetails = (expandedPanel === ALLERGIES_DETAIL || expandedPanel === ALLERGIE_PANEL || expandedPanel === META_PANEL);
    const isPanelMain = (expandedPanel === ALLERGIES_MAIN);
    const isPanelCreate = (expandedPanel === ALLERGIES_CREATE);

    const columnsToShowConfig = columnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);

    const filteredAllergies = this.filterAndSortAllergies(allAllergies);

    return (<section className="page-wrapper">
      <div className={classNames('section', { 'full-panel full-panel-main': isPanelMain, 'full-panel full-panel-details': (isPanelDetails || isPanelCreate) })}>
        <Row>
          {(isPanelMain || expandedPanel === 'all') ? <Col xs={12} className={classNames({ 'col-panel-main': isSecondPanel })}>
            <div className="panel panel-primary">
              <PluginListHeader
                onFilterChange={this.handleFilterChange}
                panelTitle="Allergies"
                isBtnExpandVisible={isBtnExpandVisible}
                isBtnTableVisible={false}
                name={ALLERGIES_MAIN}
                onExpand={this.handleExpand}
                currentPanel={ALLERGIES_MAIN}
              />
              <PluginMainPanel
                headers={columnsToShowConfig}
                resourceData={allAllergies}
                emptyDataMessage="No allergies"
                onHeaderCellClick={this.handleHeaderCellClick}
                onCellClick={this.handleDetailAllergiesClick}
                columnNameSortBy={columnNameSortBy}
                sortingOrder={sortingOrder}
                filteredData={filteredAllergies}
                totalEntriesAmount={_.size(allAllergies)}
                offset={offset}
                setOffset={this.handleSetOffset}
                isBtnCreateVisible={isBtnCreateVisible}
                onCreate={this.handleCreate}
                isLoading={isLoading}
              />
            </div>
          </Col> : null}
          {(expandedPanel === 'all' || isPanelDetails) && isDetailPanelVisible && !isCreatePanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <AllergiesDetail
              onExpand={this.handleExpand}
              name={ALLERGIES_DETAIL}
              openedPanel={openedPanel}
              onShow={this.handleShow}
              expandedPanel={expandedPanel}
              currentPanel={ALLERGIES_DETAIL}
              detail={allergieDetail}
              onEdit={this.handleEdit}
              editedPanel={editedPanel}
              onCancel={this.handleAllergieDetailCancel}
              onSaveSettings={this.handleSaveSettingsDetailForm}
              allergiePanelFormValues={allergiePanelFormState.values}
              metaPanelFormValues={metaPanelFormState.values}
              isSubmit={isSubmit}
            />
          </Col> : null}
          {(expandedPanel === 'all' || isPanelCreate) && isCreatePanelVisible && !isDetailPanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <PluginCreate
              onExpand={this.handleExpand}
              name={ALLERGIES_CREATE}
              openedPanel={openedPanel}
              onShow={this.handleShow}
              expandedPanel={expandedPanel}
              currentPanel={ALLERGIES_CREATE}
              onSaveSettings={this.handleSaveSettingsCreateForm}
              formValues={allergiesCreateFormState.values}
              onCancel={this.handleCreateCancel}
              isCreatePanelVisible={isCreatePanelVisible}
              componentForm={
                <AllergiesCreateForm isSubmit={isSubmit} />
              }
              title="Create Allergy"
            />
          </Col> : null}
        </Row>
      </div>
    </section>)
  }
}
