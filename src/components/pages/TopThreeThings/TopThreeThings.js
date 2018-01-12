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
import { fetchPatientTopThreeThingsRequest } from './ducks/fetch-patient-top-three-things.duck';
import { fetchPatientTopThreeThingsDetailRequest } from './ducks/fetch-patient-top-three-things-detail.duck';
import { fetchPatientTopThreeThingsDetailEditRequest } from './ducks/fetch-patient-top-three-things-detail-edit.duck';
import { fetchPatientTopThreeThingsOnMount, fetchPatientTopThreeThingsDetailOnMount } from '../../../utils/HOCs/fetch-patients.utils';
import { patientTopThreeThingsSelector, patientTopThreeThingsDetailSelector, topThreeThingPanelFormSelector } from './selectors';
import { clientUrls } from '../../../config/client-urls.constants';
import TopThreeThingsDetail from './TopThreeThingsDetail/TopThreeThingsDetail';
import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';
import { checkIsValidateForm, operationsOnCollection } from '../../../utils/plugin-helpers.utils';

const TOP_THREE_THINGS_MAIN = 'topThreeThingsMain';
const TOP_THREE_THINGS_DETAIL = 'topThreeThingsDetail';
const TOP_THREE_THINGS_PANEL = 'topThreeThingsPanel';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientTopThreeThingsRequest, fetchPatientTopThreeThingsDetailRequest, fetchPatientTopThreeThingsDetailEditRequest }, dispatch) });

@connect(patientTopThreeThingsSelector, mapDispatchToProps)
@connect(patientTopThreeThingsDetailSelector, mapDispatchToProps)
@connect(topThreeThingPanelFormSelector)
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
    columnNameSortBy: valuesNames.NAME,
    sortingOrder: 'asc',
    expandedPanel: 'all',
    isBtnExpandVisible: false,
    isAllPanelsVisible: false,
    isDetailPanelVisible: false,
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
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.TOP_THREE_THINGS}/${sourceId}` && sourceId !== undefined) {
      this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.TOP_THREE_THINGS}`) {
      this.setState({ isSecondPanel: false, isBtnExpandVisible: false, openedPanel: TOP_THREE_THINGS_PANEL, isDetailPanelVisible: false, expandedPanel: 'all' })
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

  handleFilterChange = ({ target: { value } }) => this.setState({ nameShouldInclude: _.toLower(value) });

  handleHeaderCellClick = (e, { name, sortingOrder }) => this.setState({ columnNameSortBy: name, sortingOrder });

  handleDetailTopThreeThingsClick = (sourceId) => {
    const { actions, userId } = this.props;
    this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, openedPanel: TOP_THREE_THINGS_PANEL, editedPanel: {}, expandedPanel: 'all', isLoading: true });
    actions.fetchPatientTopThreeThingsDetailRequest({ userId, sourceId });
    this.context.router.history.push(`${clientUrls.PATIENTS}/${userId}/${clientUrls.TOP_THREE_THINGS}/${sourceId}`);
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

  formValuesToString = (formValues, formName) => {
    const { userId, topThreeThingDetail } = this.props;
    const sendData = {};
    const currentDate = new Date();

    sendData.userId = userId;
    sendData[valuesNames.NAME] = formValues[valuesNames.NAME];
    sendData[valuesNames.DESCRIPTION] = formValues[valuesNames.DESCRIPTION];
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
      filterKeys: [valuesNames.NAME, valuesNames.DESCRIPTION, `${valuesNames.DATE}Convert`, valuesNames.SOURCE],
    });
  };

  render() {
    const { selectedColumns, columnNameSortBy, sortingOrder, isSecondPanel, isDetailPanelVisible, isBtnExpandVisible, expandedPanel, openedPanel, editedPanel, offset, isSubmit, isLoading } = this.state;
    // const { allTopThreeThings, topThreeThingDetail, topThreeThingFormState } = this.props;
    const { topThreeThingFormState } = this.props;

    const allTopThreeThings = [
      {
        name: 'Item 1',
        description: 'Item 1 Description',
        dateCreated: 1513941745000,
        source: 'ethercis',
        sourceId: '7800e7a4-dd6b-464a-9cc8-3ded16b097f9',
      },
      {
        name: 'Item #2',
        description: 'Item 2 Description',
        dateCreated: 1483944745000,
        source: 'ethercis',
        sourceId: '7800e7a4-dd6b-464a-9cc8-3ded16b097f8',
      },
      {
        name: 'Item #3',
        description: 'Item 3 Description',
        dateCreated: 1493941745000,
        source: 'ethercis',
        sourceId: '7800e7a4-dd6b-464a-9cc8-3ded16b097f7',
      },
    ];

    let topThreeThingDetail;
    if (isDetailPanelVisible) {
      topThreeThingDetail = {
        name: 'Item 1',
        description: 'Item 1 Description',
        dateCreated: 1513941745000,
        source: 'ethercis',
        sourceId: '7800e7a4-dd6b-464a-9cc8-3ded16b097f9',
      };
    }


    const isPanelDetails = (expandedPanel === TOP_THREE_THINGS_DETAIL || expandedPanel === TOP_THREE_THINGS_PANEL);
    const isPanelMain = (expandedPanel === TOP_THREE_THINGS_MAIN);

    const columnsToShowConfig = columnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);

    const filteredTopThreeThings = this.formToShowCollection(allTopThreeThings);

    let sourceId;
    if (!_.isEmpty(topThreeThingDetail)) {
      sourceId = topThreeThingDetail[valuesNames.SOURCE_ID];
    }

    return (<section className="page-wrapper">
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
                isBtnCreateVisible={false}
                id={sourceId}
                isLoading={isLoading}
              />
            </div>
          </Col> : null }
          {(expandedPanel === 'all' || isPanelDetails) && isDetailPanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
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
              isSubmit={isSubmit}
            />
          </Col> : null}
        </Row>
      </div>
    </section>)
  }
}
