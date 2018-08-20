import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import _ from 'lodash/fp';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lifecycle, compose } from 'recompose';
import { get } from 'lodash';
import PluginListHeader from '../../../plugin-page-component/PluginListHeader';
import PluginMainPanel from '../../../plugin-page-component/PluginMainPanel';
import PluginBanner from '../../../plugin-page-component/PluginBanner';
import PluginCreate from '../../../plugin-page-component/PluginCreate';
import { columnsConfig, defaultColumnsSelected } from './table-columns.config'
import { valuesNames } from './forms.config';
import { fetchPatientTopThreeThingsRequest } from './ducks/fetch-patient-top-three-things.duck';
import { fetchPatientTopThreeThingsCreateRequest } from './ducks/fetch-patient-top-three-things-create.duck';
import { fetchPatientTopThreeThingsDetailRequest } from './ducks/fetch-patient-top-three-things-detail.duck';
import { fetchPatientTopThreeThingsDetailEditRequest } from './ducks/fetch-patient-top-three-things-detail-edit.duck';
import { fetchPatientTopThreeThingsOnMount, fetchPatientTopThreeThingsDetailOnMount } from '../../config/synopsisRequests';
import { patientTopThreeThingsSelector, patientTopThreeThingsDetailSelector, topThreeThingPanelFormSelector, metaPanelFormStateSelector, topThreeThingsCreateFormStateSelector } from './selectors';
import { themeClientUrls } from '../../config/clientUrls';
import TopThreeThingsDetail from './TopThreeThingsDetail/TopThreeThingsDetail';
import TopThreeThingsCreateForm from './TopThreeThingsCreate/TopThreeThingsCreateForm';
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import { checkIsValidateForm, operationsOnCollection } from '../../../../utils/plugin-helpers.utils';
import { testConstants, isDevMode } from '../../../../config/for-test.constants';

const TOP_THREE_THINGS_MAIN = 'topThreeThingsMain';
const TOP_THREE_THINGS_CREATE = 'topThreeThingsCreate';
const TOP_THREE_THINGS_DETAIL = 'topThreeThingsDetail';
const TOP_THREE_THINGS_PANEL = 'topThreeThingsPanel';
const META_PANEL = 'metaPanel';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientTopThreeThingsRequest, fetchPatientTopThreeThingsCreateRequest, fetchPatientTopThreeThingsDetailRequest, fetchPatientTopThreeThingsDetailEditRequest }, dispatch) });

@connect(patientTopThreeThingsSelector, mapDispatchToProps)
@connect(patientTopThreeThingsDetailSelector, mapDispatchToProps)
@connect(topThreeThingPanelFormSelector)
@connect(topThreeThingsCreateFormStateSelector)
@connect(metaPanelFormStateSelector)
@compose(lifecycle(fetchPatientTopThreeThingsOnMount), lifecycle(fetchPatientTopThreeThingsDetailOnMount))
export default class TopThreeThings extends PureComponent {
  static propTypes = {
    allTopThreeThings: PropTypes.arrayOf(PropTypes.object),
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
  };

  state = {
    nameShouldInclude: '',
    selectedColumns: defaultColumnsSelected,
    openedPanel: TOP_THREE_THINGS_PANEL,
    columnNameSortBy: valuesNames.DATE,
    sortingOrder: 'asc',
    expandedPanel: 'all',
    isBtnExpandVisible: false,
    isAllPanelsVisible: false,
    isBtnCreateVisible: true,
    isDetailPanelVisible: false,
    isCreatePanelVisible: false,
    isSecondPanel: false,
    editedPanel: {},
    offset: 0,
    isSubmit: false,
    isLoading: true,
  };

  componentWillReceiveProps() {
    const sourceId = this.context.router.route.match.params.sourceId;
    const userId = this.context.router.route.match.params.userId;

    //TODO should be implemented common function, and the state stored in the store Redux
    if (this.context.router.history.location.pathname === `${themeClientUrls.PATIENTS}/${userId}/${themeClientUrls.TOP_THREE_THINGS}/${sourceId}` && sourceId !== undefined) {
      this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: false, isCreatePanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${themeClientUrls.PATIENTS}/${userId}/${themeClientUrls.TOP_THREE_THINGS}/create`) {
      this.setState({ isSecondPanel: true, isBtnExpandVisible: true, isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: TOP_THREE_THINGS_CREATE, isDetailPanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${themeClientUrls.PATIENTS}/${userId}/${themeClientUrls.TOP_THREE_THINGS}`) {
      this.setState({ isSecondPanel: false, isBtnExpandVisible: false, openedPanel: TOP_THREE_THINGS_PANEL, isDetailPanelVisible: false, expandedPanel: 'all', isBtnCreateVisible: true, isCreatePanelVisible: false })
    }

    /* istanbul ignore next */
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 500)
  }

  handleExpand = (name, currentPanel) => {
    if (currentPanel === TOP_THREE_THINGS_MAIN) {
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

  handleSaveSettingsCreateForm = (formValues) => {
    const { actions, userId, topThreeThingsCreateFormState } = this.props;
      if (checkIsValidateForm(topThreeThingsCreateFormState)) {
        actions.fetchPatientTopThreeThingsCreateRequest(this.formValuesToString(formValues, 'create'));
        this.context.router.history.push(`${themeClientUrls.PATIENTS}/${userId}/${themeClientUrls.TOP_THREE_THINGS}`);
        this.hideCreateForm();
        this.setState({ isLoading: true });
      } else {
        this.setState({ isSubmit: true });
      }
    };

  handleFilterChange = ({ target: { value } }) => this.setState({ nameShouldInclude: _.toLower(value) });

  handleHeaderCellClick = (e, { name, sortingOrder }) => this.setState({ columnNameSortBy: name, sortingOrder });

  handleDetailTopThreeThingsClick = (sourceId) => {
    const { actions, userId } = this.props;
    this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, openedPanel: TOP_THREE_THINGS_PANEL, editedPanel: {}, expandedPanel: 'all', isLoading: true });
    actions.fetchPatientTopThreeThingsDetailRequest({ userId, sourceId });
    this.context.router.history.push(`${themeClientUrls.PATIENTS}/${userId}/${themeClientUrls.TOP_THREE_THINGS}/${sourceId}`);
  };

  handleCreate = () => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: TOP_THREE_THINGS_CREATE, isSecondPanel: true, isDetailPanelVisible: false, isLoading: true, isBtnExpandVisible: true, expandedPanel: 'all', isSubmit: false });
    this.context.router.history.push(`${themeClientUrls.PATIENTS}/${userId}/${themeClientUrls.TOP_THREE_THINGS}/create`);
  };

  handleCreateCancel = () => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: TOP_THREE_THINGS_PANEL, isSecondPanel: false, isBtnExpandVisible: false, expandedPanel: 'all', isSubmit: false, isLoading: true });
    this.context.router.history.push(`${themeClientUrls.PATIENTS}/${userId}/${themeClientUrls.TOP_THREE_THINGS}`);
  };

  handleSetOffset = offset => this.setState({ offset });

  handleEdit = (name) => {
    this.setState(prevState => ({
      editedPanel: {
        ...prevState.editedPanel,
        [name]: true,
      },
      isSubmit: false,
    }))
  };

  handleShow = (name) => {
    this.setState({ openedPanel: name })
  };

  handleTopThreeThingsDetailCancel = (name) => {
    this.setState(prevState => ({
      editedPanel: {
        ...prevState.editedPanel,
        [name]: false,
      },
      isSubmit: false,
      isLoading: true,
    }))
  };

  hideCreateForm = () => {
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: TOP_THREE_THINGS_PANEL, isSecondPanel: false, expandedPanel: 'all', isBtnExpandVisible: false })
  };

  handleSaveSettingsDetailForm = (formValues, name) => {
    const { actions, topThreeThingFormState } = this.props;
    if (checkIsValidateForm(topThreeThingFormState)) {
      actions.fetchPatientTopThreeThingsDetailEditRequest(this.formValuesToString(formValues, 'edit'));
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

  goBack = () => {
    this.context.router.history.goBack();
  };

  formValuesToString = (formValues, formName) => {
    const { userId, topThreeThingDetail } = this.props;
    const sendData = {};
    const currentDate = new Date();

    sendData.userId = userId;
    sendData[valuesNames.NAME1] = formValues[valuesNames.NAME1];
    sendData[valuesNames.NAME2] = formValues[valuesNames.NAME2];
    sendData[valuesNames.NAME3] = formValues[valuesNames.NAME3];
    sendData[valuesNames.DESCRIPTION1] = formValues[valuesNames.DESCRIPTION1];
    sendData[valuesNames.DESCRIPTION2] = formValues[valuesNames.DESCRIPTION2];
    sendData[valuesNames.DESCRIPTION3] = formValues[valuesNames.DESCRIPTION3];
    sendData[valuesNames.DATE] = currentDate.getTime();
    sendData[valuesNames.SOURCE_ID] = topThreeThingDetail[valuesNames.SOURCE_ID];
    sendData[valuesNames.SOURCE] = topThreeThingDetail[valuesNames.SOURCE];

    operationsOnCollection.propsToString(sendData, valuesNames.DATE);
    return sendData;
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
      filterKeys: [valuesNames.NAME1, valuesNames.NAME2, valuesNames.NAME3, `${valuesNames.DATE}Convert`, valuesNames.SOURCE],
    });
  };

  render() {
    const { selectedColumns, columnNameSortBy, sortingOrder, isSecondPanel, isDetailPanelVisible, isCreatePanelVisible, isBtnExpandVisible, isBtnCreateVisible, expandedPanel, openedPanel, editedPanel, offset, isSubmit, isLoading } = this.state;
    const { allTopThreeThings, topThreeThingDetail, topThreeThingFormState, topThreeThingsCreateFormState, metaPanelFormState } = this.props;

    const isPanelDetails = (expandedPanel === TOP_THREE_THINGS_DETAIL || expandedPanel === TOP_THREE_THINGS_PANEL || expandedPanel === META_PANEL);
    const isPanelMain = (expandedPanel === TOP_THREE_THINGS_MAIN);
    const isPanelCreate = (expandedPanel === TOP_THREE_THINGS_CREATE);

    const columnsToShowConfig = columnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);

    const filteredTopThreeThings = this.formToShowCollection(allTopThreeThings);

    let sourceId;
    if (isDetailPanelVisible && !_.isEmpty(topThreeThingDetail)) {
      sourceId = topThreeThingDetail[valuesNames.SOURCE_ID];
    }

    const historyState = this.context.router.history.location.state;
    const isImportFromDocuments = historyState && historyState.importData;
    const isPatientHasTopThreeThings = (get(allTopThreeThings, 'length', 0) > 0) ? true : false;

    const imageLocation = '/images/banners/top3.jpg';
    const imageSource = isDevMode ? (testConstants.hostName + imageLocation) : imageLocation;

    return (<section className="page-wrapper">
      {!isDetailPanelVisible  || isCreatePanelVisible ?
        <PluginBanner
          title='Top 3 Things'
          subTitle='A place to record the top 3 issues that concern you today'
          img={imageSource}
        />
        : null
      }
      <div className={classNames('section', { 'full-panel full-panel-main': isPanelMain, 'full-panel full-panel-details': isPanelDetails })}>
        <Row>
          {(isPanelMain || expandedPanel === 'all') ? <Col xs={12} className={classNames({ 'col-panel-main': isSecondPanel })}>
            <div className="panel panel-primary">
              <PluginListHeader
                onFilterChange={this.handleFilterChange}
                panelTitle="Top 3 Things"
                isBtnExpandVisible={isBtnExpandVisible}
                name={TOP_THREE_THINGS_MAIN}
                onExpand={this.handleExpand}
                currentPanel={TOP_THREE_THINGS_MAIN}
              />
              <PluginMainPanel
                headers={columnsToShowConfig}
                resourceData={allTopThreeThings}
                emptyDataMessage="No top 3 things"
                onHeaderCellClick={this.handleHeaderCellClick}
                onCellClick={this.handleDetailTopThreeThingsClick}
                columnNameSortBy={columnNameSortBy}
                sortingOrder={sortingOrder}
                table="topThreeThings"
                filteredData={filteredTopThreeThings}
                totalEntriesAmount={_.size(filteredTopThreeThings)}
                offset={offset}
                setOffset={this.handleSetOffset}
                isBtnCreateVisible={!isPatientHasTopThreeThings}
                onCreate={this.handleCreate}
                id={sourceId}
                isLoading={isLoading}
              />
            </div>
          </Col> : null }
          {(expandedPanel === 'all' || isPanelDetails) && isDetailPanelVisible && !isCreatePanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <TopThreeThingsDetail
              onExpand={this.handleExpand}
              name={TOP_THREE_THINGS_DETAIL}
              openedPanel={openedPanel}
              expandedPanel={expandedPanel}
              currentPanel={TOP_THREE_THINGS_DETAIL}
              detail={topThreeThingDetail}
              onEdit={this.handleEdit}
              editedPanel={editedPanel}
              onCancel={this.handleTopThreeThingsDetailCancel}
              onSaveSettings={this.handleSaveSettingsDetailForm}
              topThreeThingFormValues={topThreeThingFormState.values}
              metaPanelFormValues={metaPanelFormState.values}
              isSubmit={isSubmit}
            />
          </Col> : null}
          {(expandedPanel === 'all' || isPanelCreate) && isCreatePanelVisible && !isDetailPanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <PluginCreate
              onExpand={this.handleExpand}
              name={TOP_THREE_THINGS_CREATE}
              openedPanel={openedPanel}
              onShow={this.handleShow}
              expandedPanel={expandedPanel}
              currentPanel={TOP_THREE_THINGS_CREATE}
              onSaveSettings={this.handleSaveSettingsCreateForm}
              formValues={topThreeThingsCreateFormState.values}
              onCancel={this.handleCreateCancel}
              isCreatePanelVisible={isCreatePanelVisible}
              isImport={isImportFromDocuments}
              onGoBack={this.goBack}
              componentForm={
                <TopThreeThingsCreateForm isSubmit={isSubmit} />
              }
              title="Create Top Three Things"
            />
            </Col> : null}
        </Row>
      </div>
    </section>)
  }
}
