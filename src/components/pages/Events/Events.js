import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import _ from 'lodash/fp';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lifecycle, compose } from 'recompose';

import EventsListHeader from './events-page-component/EventsListHeader';
import PluginMainPanel from '../../plugin-page-component/PluginMainPanel';

import { columnsConfig, defaultColumnsSelected } from './table-columns.config'
import { valuesNames } from './forms.config';
import { fetchPatientEventsRequest } from './ducks/fetch-patient-events.duck';
import { fetchPatientEventsOnMount, fetchPatientEventsDetailOnMount } from '../../../utils/HOCs/fetch-patients.utils';
import { patientEventsSelector } from './selectors';
import { clientUrls } from '../../../config/client-urls.constants';
import { checkIsValidateForm } from '../../../utils/plugin-helpers.utils';
import PluginCreate from '../../plugin-page-component/PluginCreate';
import { getDDMMMYYYY, getHHmm } from '../../../utils/time-helpers.utils';

const EVENTS_MAIN = 'eventsMain';
const EVENTS_DETAIL = 'eventsDetail';
const EVENTS_CREATE = 'eventsCreate';
const EVENT_PANEL = 'eventPanel';
const META_PANEL = 'metaPanel';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientEventsRequest }, dispatch) });

@connect(patientEventsSelector, mapDispatchToProps)
@compose(lifecycle(fetchPatientEventsOnMount), lifecycle(fetchPatientEventsDetailOnMount))

export default class Events extends PureComponent {
  static propTypes = {
    allEvents: PropTypes.arrayOf(PropTypes.object),
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
  };

  state = {
    nameShouldInclude: '',
    selectedColumns: defaultColumnsSelected,
    openedPanel: EVENT_PANEL,
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
  };

  componentWillReceiveProps() {
    const sourceId = this.context.router.route.match.params.sourceId;
    const userId = this.context.router.route.match.params.userId;
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.EVENTS}/${sourceId}` && sourceId !== undefined) {
      this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false })
    }
  }

  handleExpand = (name, currentPanel) => {
    if (currentPanel === EVENTS_MAIN) {
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

  handleDetailEventsClick = (id, name, sourceId) => {
    const { actions, userId } = this.props;
    this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: EVENT_PANEL, editedPanel: {} })
    actions.fetchPatientEventsDetailRequest({ userId, sourceId });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.EVENTS}/${sourceId}`);
  };

  filterAndSortEvents = (events) => {
    const { columnNameSortBy, sortingOrder, nameShouldInclude } = this.state;

    const filterByNamePredicate = _.flow(_.get(valuesNames.NAME), _.toLower, _.includes(nameShouldInclude));
    const filterByDatePredicate = _.flow(_.get(`${valuesNames.DATE_OF_EVENT}Convert`), _.toLower, _.includes(nameShouldInclude));
    const filterByTimePredicate = _.flow(_.get(`${valuesNames.TIME}Convert`), _.toLower, _.includes(nameShouldInclude));
    const filterBySourcePredicate = _.flow(_.get(valuesNames.SOURCE), _.toLower, _.includes(nameShouldInclude));

    const reverseIfDescOrder = _.cond([
      [_.isEqual('desc'), () => _.reverse],
      [_.stubTrue, () => v => v],
    ])(sortingOrder);

    if (events !== undefined) {
      events.map((item) => {
        item[`${valuesNames.DATE_OF_EVENT}Convert`] = getDDMMMYYYY(item[valuesNames.DATE_OF_EVENT]);
        item[`${valuesNames.TIME}Convert`] = getHHmm(item[valuesNames.TIME]);
      });
    }

    const filterByName = _.flow(_.sortBy([item => item[columnNameSortBy].toString().toLowerCase()]), reverseIfDescOrder, _.filter(filterByNamePredicate))(events);
    const filterByDate = _.flow(_.sortBy([item => item[columnNameSortBy]]), reverseIfDescOrder, _.filter(filterByDatePredicate))(events);
    const filterByTime = _.flow(_.sortBy([item => item[columnNameSortBy]]), reverseIfDescOrder, _.filter(filterByTimePredicate))(events);
    const filterBySource = _.flow(_.sortBy([item => item[columnNameSortBy].toString().toLowerCase()]), reverseIfDescOrder, _.filter(filterBySourcePredicate))(events);

    const filteredAndSortedEvents = [filterByName, filterByDate, filterByTime, filterBySource].filter((item) => {
      return _.size(item) !== 0;
    });

    return _.head(filteredAndSortedEvents)
  };

  handleSetOffset = offset => this.setState({ offset });

  handleCreate = () => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: EVENTS_CREATE, isSecondPanel: true, isDetailPanelVisible: false, isSubmit: false })
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.EVENTS}/create`);
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

  handleEventDetailCancel = (name) => {
    this.setState(prevState => ({
      editedPanel: {
        ...prevState.editedPanel,
        [name]: false,
      },
      isSubmit: false,
    }))
  };

  handleSaveSettingsDetailForm = (formValues, name) => {
    const { actions, eventsDetailFormState } = this.props;
    if (checkIsValidateForm(eventsDetailFormState)) {
      actions.fetchPatientEventsDetailEditRequest(this.formValuesToString(formValues, 'edit'));
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
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: EVENT_PANEL, isSecondPanel: false, isBtnExpandVisible: false, expandedPanel: 'all', isSubmit: false, isLoading: true });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.EVENTS}`);
  };

  handleSaveSettingsCreateForm = (formValues) => {
    const { actions, userId, eventsCreateFormState } = this.props;

    if (checkIsValidateForm(eventsCreateFormState)) {
      actions.fetchPatientEventsCreateRequest(this.formValuesToString(formValues, 'create'));
      this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.EVENTS}`);
      this.hideCreateForm();
      this.setState({ isSubmit: false });
    } else {
      this.setState({ isSubmit: true });
    }
  };

  formValuesToString = (formValues, formName) => {
    const { userId, eventDetail } = this.props;
    const sendData = {};
    const currentDate = new Date();
    const currentTime = currentDate - new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    sendData.userId = userId;

    sendData[valuesNames.NAME] = formValues[valuesNames.NAME];
    sendData[valuesNames.DATE_OF_EVENT] = formValues[valuesNames.DATE_OF_EVENT];
    sendData[valuesNames.PERFORMER] = formValues[valuesNames.PERFORMER];
    sendData[valuesNames.NOTES] = formValues[valuesNames.NOTES];
    sendData[valuesNames.TERMINOLOGY] = formValues[valuesNames.TERMINOLOGY];
    sendData[valuesNames.CODE] = formValues[valuesNames.CODE];
    sendData[valuesNames.AUTHOR] = formValues[valuesNames.AUTHOR];
    sendData[valuesNames.EVENT_NAME] = formValues[valuesNames.NAME];
    sendData[valuesNames.TIME] = currentTime;

    sendData[valuesNames.DATE] = currentDate;
    sendData[valuesNames.SOURCE] = 'ethercis';

    if (formName === 'edit') {
      sendData[valuesNames.SOURCE_ID] = eventDetail[valuesNames.SOURCE_ID];

      sendData[valuesNames.STATUS] = eventDetail[valuesNames.STATUS];
      sendData[valuesNames.ORIGINAL_COMPOSITION] = eventDetail[valuesNames.ORIGINAL_COMPOSITION];
      sendData[valuesNames.ORIGINAL_SOURCE] = eventDetail[valuesNames.ORIGINAL_SOURCE];
    }

    if (formName === 'create') {
      sendData[valuesNames.STATUS] = "";
      sendData[valuesNames.ORIGINAL_COMPOSITION] = "";
      sendData[valuesNames.ORIGINAL_SOURCE] = "";
    }

    return sendData;
  };

  hideCreateForm = () => {
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: EVENT_PANEL, isSecondPanel: false })
  };

  handleShow = (name) => {
    this.setState({ openedPanel: name })
  };

  render() {
    const { selectedColumns, columnNameSortBy, sortingOrder, isSecondPanel, isDetailPanelVisible, isBtnExpandVisible, expandedPanel, openedPanel, isBtnCreateVisible, isCreatePanelVisible, editedPanel, offset, isSubmit } = this.state;
    const { allEvents, eventsDetailFormState, eventsCreateFormState, metaPanelFormState, eventDetail, eventsPerPageAmount } = this.props;

    const isPanelDetails = (expandedPanel === EVENTS_DETAIL || expandedPanel === EVENT_PANEL || expandedPanel === META_PANEL);
    const isPanelMain = (expandedPanel === EVENTS_MAIN);
    const isPanelCreate = (expandedPanel === EVENTS_CREATE);

    const columnsToShowConfig = columnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);

    const filteredEvents = this.filterAndSortEvents(allEvents);

    let sourceId;
    if (!_.isEmpty(eventDetail)) {
      sourceId = eventDetail.sourceId;
    }

    return (<section className="page-wrapper">
      <div className={classNames('section', { 'full-panel full-panel-main': isPanelMain, 'full-panel full-panel-details': (isPanelDetails || isPanelCreate) })}>
        <Row>
          {(isPanelMain || expandedPanel === 'all') ? <Col xs={12} className={classNames({ 'col-panel-main': isSecondPanel })}>
            <div className="panel panel-primary">
              <EventsListHeader
                onFilterChange={this.handleFilterChange}
                panelTitle="Events"
                isBtnExpandVisible={isBtnExpandVisible}
                isBtnTableVisible
                name={EVENTS_MAIN}
                onExpand={this.handleExpand}
                currentPanel={EVENTS_MAIN}
              />
              <PluginMainPanel
                headers={columnsToShowConfig}
                resourceData={allEvents}
                emptyDataMessage="No events"
                onHeaderCellClick={this.handleHeaderCellClick}
                onCellClick={this.handleDetailEventsClick}
                columnNameSortBy={columnNameSortBy}
                sortingOrder={sortingOrder}
                table="events"
                filteredData={filteredEvents}
                totalEntriesAmount={_.size(allEvents)}
                offset={offset}
                setOffset={this.handleSetOffset}
                isBtnCreateVisible={isBtnCreateVisible}
                onCreate={this.handleCreate}
                id={sourceId}
              />
            </div>
          </Col> : null}
          {(expandedPanel === 'all' || isPanelDetails) && isDetailPanelVisible && !isCreatePanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <EventsDetail
              onExpand={this.handleExpand}
              name={EVENTS_DETAIL}
              openedPanel={openedPanel}
              onShow={this.handleShow}
              expandedPanel={expandedPanel}
              currentPanel={EVENTS_DETAIL}
              detail={eventDetail}
              onEdit={this.handleEdit}
              editedPanel={editedPanel}
              onCancel={this.handleEventDetailCancel}
              onSaveSettings={this.handleSaveSettingsDetailForm}
              eventsDetailFormValues={eventsDetailFormState.values}
              metaPanelFormValues={metaPanelFormState.values}
              isSubmit={isSubmit}
            />
          </Col> : null}
          {(expandedPanel === 'all' || isPanelCreate) && isCreatePanelVisible && !isDetailPanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <PluginCreate
              title="Create Event"
              onExpand={this.handleExpand}
              name={EVENTS_CREATE}
              openedPanel={openedPanel}
              onShow={this.handleShow}
              expandedPanel={expandedPanel}
              currentPanel={EVENTS_CREATE}
              onSaveSettings={this.handleSaveSettingsCreateForm}
              formValues={eventsCreateFormState.values}
              onCancel={this.handleCreateCancel}
              isCreatePanelVisible={isCreatePanelVisible}
              componentForm={
                <EventsCreateForm isSubmit={isSubmit} />
              }
            />
          </Col> : null}
        </Row>
      </div>
    </section>)
  }
}