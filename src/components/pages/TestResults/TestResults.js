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
import { fetchPatientTestResultsRequest } from './ducks/fetch-patient-test-results.duck';
import { fetchPatientTestResultsDetailRequest } from './ducks/fetch-patient-test-results-detail.duck';
import { fetchPatientTestResultsOnMount } from '../../../utils/HOCs/fetch-patients.utils';
import { patientTestResultsSelector, patientTestResultsDetailSelector } from './selectors';
import { clientUrls } from '../../../config/client-urls.constants';
import { operationsOnCollection } from '../../../utils/plugin-helpers.utils';
import TestResultsDetail from './TestResultsDetail/TestResultsDetail';
import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';

const TEST_RESULTS_MAIN = 'testResultsMain';
const TEST_RESULTS_DETAIL = 'testResultsDetail';
const TEST_RESULTS_CREATE = 'testResultsCreate';
const TEST_RESULT_PANEL = 'testResultPanel';
const META_PANEL = 'metaPanel';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientTestResultsRequest, fetchPatientTestResultsDetailRequest }, dispatch) });

@connect(patientTestResultsSelector, mapDispatchToProps)
@connect(patientTestResultsDetailSelector, mapDispatchToProps)
@compose(lifecycle(fetchPatientTestResultsOnMount))
export default class TestResults extends PureComponent {
  static propTypes = {
    allTestResults: PropTypes.arrayOf(PropTypes.object),
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
  };

  state = {
    nameShouldInclude: '',
    selectedColumns: defaultColumnsSelected,
    openedPanel: TEST_RESULT_PANEL,
    columnNameSortBy: valuesNames.NAME,
    sortingOrder: 'asc',
    expandedPanel: 'all',
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
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.TEST_RESULTS}/${sourceId}` && sourceId !== undefined) {
      this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.TEST_RESULTS}`) {
      this.setState({ isSecondPanel: false, isBtnExpandVisible: false, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: TEST_RESULT_PANEL, isDetailPanelVisible: false })
    }

    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 500)
  }

 handleExpand = (name, currentPanel) => {
   if (currentPanel === TEST_RESULTS_MAIN) {
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

  handleDetailTestResultsClick = (sourceId) => {
    const { actions, userId } = this.props;
    this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, openedPanel: TEST_RESULT_PANEL, editedPanel: {}, isLoading: true })
    actions.fetchPatientTestResultsDetailRequest({ userId, sourceId });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.TEST_RESULTS}/${sourceId}`);
  };

  handleSetOffset = offset => this.setState({ offset });

  handleCreate = () => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: TEST_RESULTS_CREATE, isSecondPanel: true, isDetailPanelVisible: false, isSubmit: false, isLoading: true })
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.TEST_RESULTS}/create`);
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

  handleTestResultDetailCancel = (name) => {
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

  handleShow = (name) => {
    this.setState({ openedPanel: name })
  };

  formToShowCollection = (collection) => {
    const {columnNameSortBy, sortingOrder, nameShouldInclude} = this.state;

    collection = operationsOnCollection.modificate(collection, [{
      keyFrom: valuesNames.TAKEN,
      keyTo: `${valuesNames.TAKEN}Convert`,
      fn: getDDMMMYYYY
    }, {
      keyFrom: valuesNames.DATE,
      keyTo: `${valuesNames.DATE}Convert`,
      fn: getDDMMMYYYY
    }]);

    return operationsOnCollection.filterAndSort({
      collection: collection,
      filterBy: nameShouldInclude,
      sortingByKey: columnNameSortBy,
      sortingByOrder: sortingOrder,
      filterKeys: [valuesNames.NAME, `${valuesNames.TAKEN}Convert`, `${valuesNames.DATE}Convert`, valuesNames.SOURCE]
    });
  };

  render() {
    const { selectedColumns, columnNameSortBy, sortingOrder, isSecondPanel, isDetailPanelVisible, isBtnExpandVisible, expandedPanel, openedPanel, isBtnCreateVisible, isCreatePanelVisible, editedPanel, offset, isSubmit, isLoading } = this.state;
    const { allTestResults, testResultDetail } = this.props;

    const isPanelDetails = (expandedPanel === TEST_RESULTS_DETAIL || expandedPanel === TEST_RESULT_PANEL || expandedPanel === META_PANEL);
    const isPanelMain = (expandedPanel === TEST_RESULTS_MAIN);
    const isPanelCreate = (expandedPanel === TEST_RESULTS_CREATE);

    const columnsToShowConfig = columnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);

    const filteredTestResults = this.formToShowCollection(allTestResults);

    let sourceId;
    if (!_.isEmpty(testResultDetail)) {
      sourceId = testResultDetail.sourceId;
    }

    return (<section className="page-wrapper">
      <div className={classNames('section', { 'full-panel full-panel-main': isPanelMain, 'full-panel full-panel-details': (isPanelDetails || isPanelCreate) })}>
        <Row>
          {(isPanelMain || expandedPanel === 'all')
            ? <Col xs={12} className={classNames({ 'col-panel-main': isSecondPanel })}>
              <div className="panel panel-primary">
                <PluginListHeader
                  onFilterChange={this.handleFilterChange}
                  panelTitle="TestResults"
                  isBtnExpandVisible={isBtnExpandVisible}
                  isBtnTableVisible={false}
                  name={TEST_RESULTS_MAIN}
                  onExpand={this.handleExpand}
                  currentPanel={TEST_RESULTS_MAIN}
                />
                <PluginMainPanel
                  headers={columnsToShowConfig}
                  resourceData={allTestResults}
                  emptyDataMessage="No test results"
                  onHeaderCellClick={this.handleHeaderCellClick}
                  onCellClick={this.handleDetailTestResultsClick}
                  columnNameSortBy={columnNameSortBy}
                  sortingOrder={sortingOrder}
                  table="testResults"
                  filteredData={filteredTestResults}
                  totalEntriesAmount={_.size(filteredTestResults)}
                  offset={offset}
                  setOffset={this.handleSetOffset}
                  onCreate={this.handleCreate}
                  id={sourceId}
                  isLoading={isLoading}
                />
              </div>
            </Col> : null}
          {(expandedPanel === 'all' || isPanelDetails) && isDetailPanelVisible && !isCreatePanelVisible
            ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
              <TestResultsDetail
                onExpand={this.handleExpand}
                name={TEST_RESULTS_DETAIL}
                openedPanel={openedPanel}
                onShow={this.handleShow}
                expandedPanel={expandedPanel}
                currentPanel={TEST_RESULTS_DETAIL}
                detail={testResultDetail}
                onEdit={this.handleEdit}
                editedPanel={editedPanel}
                onCancel={this.handleTestResultDetailCancel}
                onSaveSettings={this.handleSaveSettingsDetailForm}
                isSubmit={isSubmit}
              />
            </Col> : null}
        </Row>
      </div>
    </section>)
  }
}
