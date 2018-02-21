import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import _ from 'lodash/fp';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lifecycle, compose } from 'recompose';

import PromsListHeader from './proms-page-component/PromsListHeader';
import PromsMainPanel from './proms-page-component/PromsMainPanel';

import { columnsConfig, defaultColumnsSelected } from './table-columns.config'
import { valuesNames } from './forms.config';
import { fetchPatientPromsRequest } from './ducks/fetch-patient-proms.duck';
import { fetchPatientPromsCreateRequest } from './ducks/fetch-patient-proms-create.duck';
import { fetchPatientPromsDetailRequest } from './ducks/fetch-patient-proms-detail.duck';
import { fetchPatientPromsDetailEditRequest } from './ducks/fetch-patient-proms-detail-edit.duck';
import { fetchPatientPromsOnMount, fetchPatientPromsDetailOnMount } from '../../../utils/HOCs/fetch-patients.utils';
import { patientPromsSelector, promsDetailFormStateSelector, promsCreateFormStateSelector, patientPromsDetailSelector } from './selectors';
import { clientUrls } from '../../../config/client-urls.constants';
import { checkIsValidateForm, operationsOnCollection } from '../../../utils/plugin-helpers.utils';
import PromsDetail from './PromsDetail/PromsDetail';
import PluginCreate from '../../plugin-page-component/PluginCreate';
import PromsCreateForm from './PromsCreate/PromsCreateForm'
import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';
import { serviceProms } from './proms-helpers.utils';


const PROMS_MAIN = 'promsMain';
const PROMS_DETAIL = 'promsDetail';
const PROMS_CREATE = 'promsCreate';
const PROM_PANEL = 'promPanel';

const promDetail = {
  name: 'test Proms 1',
  records: [
    {
      date: 1482190593395,
      name: 'test records',
      source: 'test records source',
      sourceId: 'test records sourceId',
      type: 'test records type',
      typeTitle: 'test records typeTitle',
    },
  ],
  score: 9,
  dateCreated: 1482170593395,
  specific_Q1: 'No Pain',
  specific_Q2: 'No limitations',
  specific_Q3: 'Around the house',
  specific_Q4: 'No difficulty',
  author: 'DR Mary Jones',
  source: 'openehr',
  sourceId: 'testSourceID1',
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchPatientPromsRequest,
    fetchPatientPromsCreateRequest,
    fetchPatientPromsDetailRequest,
    fetchPatientPromsDetailEditRequest,
  }, dispatch) });

@connect(patientPromsSelector, mapDispatchToProps)
@connect(patientPromsDetailSelector)
@connect(promsDetailFormStateSelector)
@connect(promsCreateFormStateSelector)
@compose(lifecycle(fetchPatientPromsOnMount), lifecycle(fetchPatientPromsDetailOnMount))

export default class Proms extends PureComponent {
  static propTypes = {
    allProms: PropTypes.arrayOf(PropTypes.object),
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
  };

  state = {
    nameShouldInclude: '',
    selectedColumns: defaultColumnsSelected,
    openedPanel: PROM_PANEL,
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
    activeView: 'tableNews',
    scoreStatus: '',
  };

  componentWillReceiveProps(nextProps) {
    // const { promDetail } = this.props;
    const sourceId = this.context.router.route.match.params.sourceId;
    const userId = this.context.router.route.match.params.userId;

    //TODO should be implemented common function, and the state stored in the store Redux
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.PROMS}/${sourceId}` && sourceId !== undefined && !_.isEmpty(nextProps.promDetail)) {
      this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.PROMS}/create`) {
      this.setState({ isSecondPanel: true, isBtnExpandVisible: true, isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: PROMS_CREATE, isDetailPanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.PROMS}`) {
      this.setState({ isSecondPanel: false, isBtnExpandVisible: false, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: PROM_PANEL, isDetailPanelVisible: false, expandedPanel: 'all' })
    }

    // if (!_.isEmpty(nextProps.promDetail) || !_.isEmpty(nextProps.promsCreateFormState)) {
    //   if (!_.isEmpty(nextProps.promsDetailFormState.values)) {
    //     this.setVitalStatuses(nextProps.promsDetailFormState.values)
    //   } else if (!_.isEmpty(nextProps.promsCreateFormState.values)) {
    //     this.setVitalStatuses(nextProps.promsCreateFormState.values)
    //   } else {
    //     this.setVitalStatuses(nextProps.promDetail)
    //   }
    // }

    // if(!_.isEmpty(promDetail)) {
    //   this.setState({ scoreStatus: serviceProms.getStatusOnValue(promDetail.score) })
    // }

    /* istanbul ignore next */
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 500)
  }

  handleExpand = (name, currentPanel) => {
    if (currentPanel === PROMS_MAIN) {
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

  handleDetailPromsClick = (sourceId) => {
    const { actions, userId } = this.props;
    this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: PROM_PANEL, editedPanel: {}, expandedPanel: 'all', isLoading: true })
    actions.fetchPatientPromsDetailRequest({ userId, sourceId });
    this.context.router.history.push(`${clientUrls.PATIENTS}/${userId}/${clientUrls.PROMS}/${sourceId}`);
  };

  handleSetOffset = offset => this.setState({ offset });

  handleCreate = () => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: PROMS_CREATE, isSecondPanel: true, isDetailPanelVisible: false, isSubmit: false, isLoading: true })
    this.context.router.history.push(`${clientUrls.PATIENTS}/${userId}/${clientUrls.PROMS}/create`);
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

  handlePromDetailCancel = (name) => {
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
    const { actions, promsDetailFormState } = this.props;
    if (checkIsValidateForm(promsDetailFormState)) {
      actions.fetchPatientPromsDetailEditRequest(this.formValuesToString(formValues, 'edit'));
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
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: PROM_PANEL, isSecondPanel: false, isBtnExpandVisible: false, expandedPanel: 'all', isSubmit: false, isLoading: true });
    this.context.router.history.push(`${clientUrls.PATIENTS}/${userId}/${clientUrls.PROMS}`);
  };

  handleSaveSettingsCreateForm = (formValues) => {
    const { actions, userId, promsCreateFormState } = this.props;

    if (checkIsValidateForm(promsCreateFormState)) {
      actions.fetchPatientPromsCreateRequest(this.formValuesToString(formValues, 'create'));
      this.context.router.history.push(`${clientUrls.PATIENTS}/${userId}/${clientUrls.PROMS}`);
      this.hideCreateForm();
      this.setState({ isSubmit: false, isLoading: true });
    } else {
      this.setState({ isSubmit: true });
    }
  };

  formValuesToString = (formValues, formName) => {
    const { userId } = this.props;
    // const { userId, promDetail } = this.props;
    const sendData = {};
    const currentDate = new Date().getTime();

    sendData.userId = userId;
    sendData[valuesNames.NAME] = formValues[valuesNames.NAME];
    sendData[valuesNames.RECORDS] = formValues[valuesNames.RECORDS];
    sendData[valuesNames.SCORE] = formValues[valuesNames.SCORE];
    sendData[valuesNames.SPECIFIC_Q1] = formValues[valuesNames.SPECIFIC_Q1];
    sendData[valuesNames.SPECIFIC_Q2] = formValues[valuesNames.SPECIFIC_Q2];
    sendData[valuesNames.SPECIFIC_Q3] = formValues[valuesNames.SPECIFIC_Q3];
    sendData[valuesNames.SPECIFIC_Q4] = formValues[valuesNames.SPECIFIC_Q4];
    sendData[valuesNames.SOURCE] = formValues[valuesNames.SOURCE];
    sendData[valuesNames.DATE_CREATED] = currentDate;

    if (formName === 'edit') {
      sendData[valuesNames.SOURCE_ID] = promDetail[valuesNames.SOURCE_ID];
    }

    operationsOnCollection.propsToString(sendData, valuesNames.RECORDS, valuesNames.DATE_CREATED);

    return sendData;
  };

  hideCreateForm = () => {
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: PROM_PANEL, isSecondPanel: false })
  };

  formToShowCollection = (collection) => {
    const { columnNameSortBy, sortingOrder, nameShouldInclude } = this.state;

    collection = operationsOnCollection.modificate(collection, [{
      keyFrom: valuesNames.DATE_CREATED,
      keyTo: `${valuesNames.DATE_CREATED}Convert`,
      fn: getDDMMMYYYY,
    }]);

    return operationsOnCollection.filterAndSort({
      collection,
      filterBy: nameShouldInclude,
      sortingByKey: columnNameSortBy,
      sortingByOrder: sortingOrder,
      filterKeys: [`${valuesNames.DATE_CREATED}Convert`, valuesNames.NAME, valuesNames.SCORE, valuesNames.SOURCE],
      modeSorting: {
        number: [valuesNames.SCORE],
      },
    });
  };

  toggleViewVisibility = (currentView) => {
    this.setState({ activeView: currentView });
  };

  chartLoad = (proms) => {
    const dataChart = {
      labels: operationsOnCollection.getDateLabels(proms, valuesNames.DATE_CREATED),
    };
    const datasetsData = {
      score: [],
      sourceId: [],
    };

    if (!_.isEmpty(proms)) {
      proms.forEach((item) => {
        datasetsData.score.push(item.score);
        datasetsData.sourceId.push(item.sourceId);
      });
    }

    dataChart.datasetsData = datasetsData;

    return dataChart;
  };

  modificateProms = (allProms) => {
    let proms;
    if (!_.isEmpty(allProms)) {
      proms = serviceProms.modificatePromsArr(allProms);
    }
    return proms
  };

  changeScoreStatus = value => this.setState({ scoreStatus: serviceProms.getStatusOnValue(value) });

  render() {
    const { selectedColumns, columnNameSortBy, sortingOrder, isSecondPanel, isDetailPanelVisible, isBtnExpandVisible, expandedPanel, openedPanel, isBtnCreateVisible, isCreatePanelVisible, editedPanel, offset, isSubmit, isLoading, activeView, nameShouldInclude, scoreStatus } = this.state;
    // const { allProms, promsDetailFormState, promsCreateFormState, promDetail } = this.props;
    const { promsDetailFormState, promsCreateFormState, match } = this.props;

    const allProms = [
      {
        name: 'test Proms 1',
        score: 9,
        dateCreated: 1482170593395,
        source: 'openehr',
        sourceId: 'testSourceID1',
      },
      {
        name: 'test Proms 2',
        score: 3,
        dateCreated: 1482190593395,
        source: 'openehr',
        sourceId: 'testSourceID2',
      },
      {
        name: 'test Proms 3',
        score: 6,
        dateCreated: 1492170593395,
        source: 'openehr',
        sourceId: 'testSourceID3',
      },
    ];

    const isPanelDetails = (expandedPanel === PROMS_DETAIL || expandedPanel === PROM_PANEL);
    const isPanelMain = (expandedPanel === PROMS_MAIN);
    const isPanelCreate = (expandedPanel === PROMS_CREATE);

    const filteredProms = this.formToShowCollection(this.modificateProms(allProms));
    const columnsToShowConfig = columnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);

    let sourceId;
    if (isDetailPanelVisible && !_.isEmpty(promDetail)) {
      sourceId = promDetail.sourceId;
    }

    return (<section className="page-wrapper">
      <div className={classNames('section', { 'full-panel full-panel-main': isPanelMain, 'full-panel full-panel-details': (isPanelDetails || isPanelCreate) })}>
        <Row>
          {(isPanelMain || expandedPanel === 'all') ? <Col xs={12} className={classNames({ 'col-panel-main': isSecondPanel })}>
            <div className="panel panel-primary">
              <PromsListHeader
                onFilterChange={this.handleFilterChange}
                panelTitle="PROMs"
                isBtnExpandVisible={isBtnExpandVisible}
                isBtnTableVisible={false}
                name={PROMS_MAIN}
                onExpand={this.handleExpand}
                currentPanel={PROMS_MAIN}
                activeView={activeView}
                toggleViewVisibility={this.toggleViewVisibility}
                nameShouldInclude={nameShouldInclude}
              />
              <PromsMainPanel
                headers={columnsToShowConfig}
                resourceData={allProms}
                emptyDataMessage="No proms"
                onHeaderCellClick={this.handleHeaderCellClick}
                onCellClick={this.handleDetailPromsClick}
                columnNameSortBy={columnNameSortBy}
                sortingOrder={sortingOrder}
                table="proms"
                filteredData={filteredProms}
                totalEntriesAmount={_.size(filteredProms)}
                offset={offset}
                setOffset={this.handleSetOffset}
                isBtnCreateVisible={isBtnCreateVisible}
                onCreate={this.handleCreate}
                id={sourceId}
                isLoading={isLoading}
                activeView={activeView}
                chartLoad={this.chartLoad}
              />
            </div>
          </Col> : null}
          {(expandedPanel === 'all' || isPanelDetails) && isDetailPanelVisible && !isCreatePanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <PromsDetail
              onExpand={this.handleExpand}
              name={PROMS_DETAIL}
              openedPanel={openedPanel}
              onShow={this.handleShow}
              expandedPanel={expandedPanel}
              currentPanel={PROMS_DETAIL}
              detail={promDetail}
              onEdit={this.handleEdit}
              editedPanel={editedPanel}
              onCancel={this.handlePromDetailCancel}
              onSaveSettings={this.handleSaveSettingsDetailForm}
              promsDetailFormValues={promsDetailFormState.values}
              isSubmit={isSubmit}
              status={scoreStatus}
              changeScoreStatus={this.changeScoreStatus}
              match={match}
            />
          </Col> : null}
          {(expandedPanel === 'all' || isPanelCreate) && isCreatePanelVisible && !isDetailPanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <PluginCreate
              title="Create PROM"
              onExpand={this.handleExpand}
              name={PROMS_CREATE}
              openedPanel={openedPanel}
              onShow={this.handleShow}
              expandedPanel={expandedPanel}
              currentPanel={PROMS_CREATE}
              onSaveSettings={this.handleSaveSettingsCreateForm}
              formValues={promsCreateFormState.values}
              onCancel={this.handleCreateCancel}
              isCreatePanelVisible={isCreatePanelVisible}
              componentForm={
                <PromsCreateForm
                  isSubmit={isSubmit}
                  changeScoreStatus={this.changeScoreStatus}
                  status={scoreStatus}
                  match={match}
                />
              }
            />
          </Col> : null}
        </Row>
      </div>
    </section>)
  }
}
