import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import _ from 'lodash/fp';
import { get } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lifecycle, compose } from 'recompose';

import PluginListHeader from '../../plugin-page-component/PluginListHeader';
import PluginBanner from '../../plugin-page-component/PluginBanner';
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
import { checkIsValidateForm, operationsOnCollection } from '../../../utils/plugin-helpers.utils';
import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';
import { imageSource } from './ImageSource';
import { themeConfigs } from '../../../themes.config';
import { isButtonVisible } from '../../../utils/themeSettings-helper';

const ALLERGIES_MAIN = 'allergiesMain';
const ALLERGIES_DETAIL = 'allergiesDetail';
const ALLERGIES_CREATE = 'allergiesCreate';
const ALLERGIE_PANEL = 'allergiePanel';
const META_PANEL = 'metaPanel';
const SYSTEM_INFO_PANEL = 'systemInformationPanel';

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
    columnNameSortBy: valuesNames.CAUSE,
    sortingOrder: 'asc',
    expandedPanel: 'all',
    isBtnCreateVisible: false,
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
    const sourceId = this.context.router.route.match.params.sourceId;
    const userId = this.context.router.route.match.params.userId;
    const hiddenButtons = get(themeConfigs, 'buttonsToHide.allergies', []);
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.ALLERGIES}/${sourceId}` && sourceId !== undefined) {
      this.setState({
        isSecondPanel: true,
        isDetailPanelVisible: true,
        isBtnExpandVisible: true,
        isBtnCreateVisible: isButtonVisible(hiddenButtons, 'create', true),
        isCreatePanelVisible: false
      })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.ALLERGIES}/create`) {
      this.setState({
        isSecondPanel: true,
        isBtnExpandVisible: true,
        isBtnCreateVisible: isButtonVisible(hiddenButtons, 'create', false),
        isCreatePanelVisible: true,
        openedPanel: ALLERGIES_CREATE,
        isDetailPanelVisible: false
      })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.ALLERGIES}`) {
      this.setState({
        isSecondPanel: false,
        isBtnExpandVisible: false,
        isBtnCreateVisible: isButtonVisible(hiddenButtons, 'create', true),
        isCreatePanelVisible: false,
        openedPanel: ALLERGIE_PANEL,
        isDetailPanelVisible: false,
        expandedPanel: 'all'
      })
    }

    /* istanbul ignore next */
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 500)
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

  handleDetailAllergiesClick = (sourceId) => {
    const { actions, userId } = this.props;
    const hiddenButtons = get(themeConfigs, 'buttonsToHide.allergies', []);
    this.setState({
      isSecondPanel: true,
      isDetailPanelVisible: true,
      isBtnExpandVisible: true,
      isBtnCreateVisible: isButtonVisible(hiddenButtons, 'create', true),
      isCreatePanelVisible: false,
      openedPanel: ALLERGIE_PANEL,
      editedPanel: {},
      isLoading: true,
      expandedPanel: 'all'
    });
    actions.fetchPatientAllergiesDetailRequest({ userId, sourceId });
    this.context.router.history.push(`${clientUrls.PATIENTS}/${userId}/${clientUrls.ALLERGIES}/${sourceId}`);
  };

  handleSetOffset = offset => this.setState({ offset });

  handleCreate = () => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: ALLERGIES_CREATE, isSecondPanel: true, isDetailPanelVisible: false, isLoading: true, isBtnExpandVisible: true, expandedPanel: 'all', isSubmit: false });
    this.context.router.history.push(`${clientUrls.PATIENTS}/${userId}/${clientUrls.ALLERGIES}/create`);
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
      isLoading: true,
    }))
  };

  handleSaveSettingsDetailForm = (formValues, name) => {
    const { allergieDetail, actions, allergiePanelFormState } = this.props;

    formValues[valuesNames.CAUSECODE] = allergieDetail[valuesNames.CAUSECODE];

    if (name === ALLERGIE_PANEL) {
      allergieDetail[valuesNames.CAUSE] = formValues[valuesNames.CAUSE];
      allergieDetail[valuesNames.REACTION] = formValues[valuesNames.REACTION];
      formValues[valuesNames.TERMINOLOGY] = allergieDetail[valuesNames.TERMINOLOGY];
    }
    if (name === META_PANEL) {
      formValues[valuesNames.CAUSE] = allergieDetail[valuesNames.CAUSE];
      formValues[valuesNames.REACTION] = allergieDetail[valuesNames.REACTION];
      allergieDetail[valuesNames.TERMINOLOGY] = formValues[valuesNames.TERMINOLOGY];
    }
    if (checkIsValidateForm(allergiePanelFormState)) {
      actions.fetchPatientAllergiesDetailEditRequest(this.formValuesToString(formValues, 'edit'));
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
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: ALLERGIE_PANEL, isSecondPanel: false, isBtnExpandVisible: false, expandedPanel: 'all', isSubmit: false, isLoading: true });
    this.context.router.history.push(`${clientUrls.PATIENTS}/${userId}/${clientUrls.ALLERGIES}`);
  };

  handleSaveSettingsCreateForm = (formValues) => {
    const { actions, userId, allergiesCreateFormState } = this.props;
    if (checkIsValidateForm(allergiesCreateFormState)) {
      actions.fetchPatientAllergiesCreateRequest(this.formValuesToString(formValues, 'create'));
      this.context.router.history.push(`${clientUrls.PATIENTS}/${userId}/${clientUrls.ALLERGIES}`);
      this.hideCreateForm();
      this.setState({ isLoading: true });
    } else {
      this.setState({ isSubmit: true });
    }
  };

  goBack = () => {
    this.context.router.history.goBack();
  };

  formValuesToString = (formValues, formName) => {
    const { userId, allergieDetail } = this.props;
    const sendData = {};

    sendData.userId = userId;
    sendData[valuesNames.CAUSE] = formValues[valuesNames.CAUSE];
    sendData[valuesNames.REACTION] = formValues[valuesNames.REACTION];
    sendData[valuesNames.TERMINOLOGY] = formValues[valuesNames.TERMINOLOGY];
    sendData[valuesNames.CAUSECODE] = formValues[valuesNames.CAUSECODE];

    sendData[valuesNames.ISIMPORT] = formValues[valuesNames.ISIMPORT];
    // add data about source from Documents Heading
    if (sendData[valuesNames.ISIMPORT]) {
      sendData[valuesNames.ORIGINAL_SOURCE] = formValues[valuesNames.ORIGINAL_SOURCE];
      sendData[valuesNames.ORIGINAL_COMPOSITION] = formValues[valuesNames.ORIGINAL_COMPOSITION];
    }

    if (formName === 'edit') {
      sendData[valuesNames.SOURCE_ID] = allergieDetail[valuesNames.SOURCE_ID];
      sendData[valuesNames.SOURCE] = 'ethercis';
    }

    if (formName === 'create') {
      sendData[valuesNames.SOURCE_ID] = '';
    }

    operationsOnCollection.propsToString(sendData);
    return sendData;
  };


  hideCreateForm = () => {
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: ALLERGIE_PANEL, isSecondPanel: false, expandedPanel: 'all', isBtnExpandVisible: false })
  };

  handleShow = (name) => {
    this.setState({ openedPanel: name })
  };

  formToShowCollection = (collection) => {
    const {columnNameSortBy, sortingOrder, nameShouldInclude} = this.state;

    collection = operationsOnCollection.modificate(collection, [{
      keyFrom: valuesNames.DATE_CREATED,
      keyTo: valuesNames.DATE_CREATED,
      fn: getDDMMMYYYY,
    }]);

    return operationsOnCollection.filterAndSort({
      collection: collection,
      filterBy: nameShouldInclude,
      sortingByKey: columnNameSortBy,
      sortingByOrder: sortingOrder,
      filterKeys: [valuesNames.CAUSE, valuesNames.DATE_CREATED, valuesNames.SOURCE]
    });
  };

  render() {
    const { selectedColumns, columnNameSortBy, sortingOrder, isSecondPanel, isDetailPanelVisible, isBtnExpandVisible, expandedPanel, openedPanel, isBtnCreateVisible, isCreatePanelVisible, editedPanel, offset, isLoading, isSubmit } = this.state;
    const { allAllergies, allergiePanelFormState, allergiesCreateFormState, metaPanelFormState, allergieDetail } = this.props;

    const isPanelDetails = (expandedPanel === ALLERGIES_DETAIL || expandedPanel === ALLERGIE_PANEL || expandedPanel === META_PANEL || expandedPanel === SYSTEM_INFO_PANEL);
    const isPanelMain = (expandedPanel === ALLERGIES_MAIN);
    const isPanelCreate = (expandedPanel === ALLERGIES_CREATE);

    const columnsToShowConfig = columnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);

    const filteredAllergies = this.formToShowCollection(allAllergies);

    let sourceId;
    if (isDetailPanelVisible && !_.isEmpty(allergieDetail)) {
      sourceId = allergieDetail[valuesNames.SOURCE_ID];
    }

    const historyState = this.context.router.history.location.state;
    const isImportFromDocuments = historyState && historyState.importData;

    const hiddenButtons = get(themeConfigs, 'buttonsToHide.allergies', []);

    return (<section className="page-wrapper">
      {!(isDetailPanelVisible || isCreatePanelVisible) ?
        <PluginBanner
          title='Allergies'
          subTitle='Those things that your body reacts against , that you have an allergy to'
          img={imageSource}
        />
        : null
      }
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
                emptyDataMessage="No information available"
                onHeaderCellClick={this.handleHeaderCellClick}
                onCellClick={this.handleDetailAllergiesClick}
                columnNameSortBy={columnNameSortBy}
                sortingOrder={sortingOrder}
                filteredData={filteredAllergies}
                totalEntriesAmount={_.size(filteredAllergies)}
                offset={offset}
                setOffset={this.handleSetOffset}
                isBtnCreateVisible={isBtnCreateVisible}
                onCreate={this.handleCreate}
                isLoading={isLoading}
                id={sourceId}
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
              headingName="allergies"
              openedPanel={openedPanel}
              onShow={this.handleShow}
              expandedPanel={expandedPanel}
              currentPanel={ALLERGIES_CREATE}
              onSaveSettings={this.handleSaveSettingsCreateForm}
              formValues={allergiesCreateFormState.values}
              onCancel={this.handleCreateCancel}
              isCreatePanelVisible={isCreatePanelVisible}
              isCreationPermitted={isButtonVisible(hiddenButtons, 'create', true)}
              isImport={isImportFromDocuments}
              onGoBack={this.goBack}
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
