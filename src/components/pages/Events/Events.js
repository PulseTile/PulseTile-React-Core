import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import _ from 'lodash/fp';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lifecycle, compose } from 'recompose';
import { debounce } from 'throttle-debounce';
import io from 'socket.io-client';
import moment from 'moment';

import EventsListHeader from './events-page-component/EventsListHeader';
import EventsMainPanel from './events-page-component/EventsMainPanel';

import { columnsConfig, defaultColumnsSelected } from './table-columns.config'
import { valuesNames } from './forms.config';
import { fetchPatientEventsRequest } from './ducks/fetch-patient-events.duck';
import { fetchPatientEventsDetailRequest } from './ducks/fetch-patient-events-detail.duck';
import { fetchPatientEventsDetailEditRequest } from './ducks/fetch-patient-events-detail-edit.duck';
import { fetchPatientEventsCreateRequest } from './ducks/fetch-patient-events-create.duck';
import { fetchPatientEventsOnMount, fetchPatientEventsDetailOnMount } from '../../../utils/HOCs/fetch-patients.utils';
import { patientEventsSelector, patientEventsDetailSelector, eventsDetailFormStateSelector, eventsCreateFormStateSelector, userSelector } from './selectors';
import { clientUrls } from '../../../config/client-urls.constants';
import { checkIsValidateForm, operationsOnCollection } from '../../../utils/plugin-helpers.utils';
import EventsDetail from './EventsDetail/EventsDetail';
import PluginCreate from '../../plugin-page-component/PluginCreate';
import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';
import { modificateEventsArr } from './events-helpers.utils';
import EventsCreateForm from './EventsCreate/EventsCreateForm'
import { isIDCRRole } from '../../../utils/auth/auth-check-permissions';

const EVENTS_MAIN = 'eventsMain';
const EVENTS_DETAIL = 'eventsDetail';
const EVENTS_CREATE = 'eventsCreate';
const EVENT_PANEL = 'eventPanel';
const META_PANEL = 'metaPanel';
const CHAT_PANEL = 'chatPanel';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientEventsRequest, fetchPatientEventsDetailRequest, fetchPatientEventsDetailEditRequest, fetchPatientEventsCreateRequest }, dispatch) });

@connect(patientEventsSelector, mapDispatchToProps)
@connect(patientEventsDetailSelector, mapDispatchToProps)
@connect(eventsDetailFormStateSelector)
@connect(eventsCreateFormStateSelector)
@connect(userSelector)
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

  constructor(props) {
    super(props);

    this.onRangeChange = this.onRangeChange.bind(this);
    this.onRangeChange = debounce(100, this.onRangeChange);
  }

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
    activeView: 'table',
    isLoading: true,
    eventsType: '',
    isTimelinesOpen: false,
    valueEventsRange: [],
    socket: null,
    token: null,
  };

  componentWillMount() {
    const socket = io.connect(`wss://${window.location.hostname}:${8070}`);
    const token = this.getCookie('JSESSIONID');
    this.setState({ socket, token })
  }

  componentDidMount() {
    const { socket } = this.state;
    socket.off('appointment:messages'); // remove dublicate socket listeners
    socket.off('appointment:close');
    socket.off('appointment:status');
    socket.on('appointment:messages', this.onMessages);
    socket.on('appointment:close', this.onClose);
    socket.on('appointment:status', this.onStatus);
  }

  componentWillReceiveProps() {
    const sourceId = this.context.router.route.match.params.sourceId;
    const userId = this.context.router.route.match.params.userId;

    //TODO should be implemented common function, and the state stored in the store Redux
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.EVENTS}/${sourceId}` && sourceId !== undefined) {
      this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, eventsType: 'initEventsType' })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.EVENTS}/create` && _.isEmpty(this.state.eventsType)) {
      this.setState({ isSecondPanel: true, isBtnExpandVisible: true, isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: EVENTS_CREATE, isDetailPanelVisible: false, eventsType: 'Transfer' })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.EVENTS}`) {
      this.setState({ isSecondPanel: false, isBtnExpandVisible: false, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: EVENT_PANEL, isDetailPanelVisible: false, eventsType: 'initEventsType', expandedPanel: 'all' })
    }

    /* istanbul ignore next */
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 500)
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

  handleDetailEventsClick = (sourceId) => {
    const { actions, userId } = this.props;
    this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: EVENT_PANEL, editedPanel: {}, expandedPanel: 'all', isLoading: true, eventsType: '' })
    actions.fetchPatientEventsDetailRequest({ userId, sourceId });
    this.context.router.history.push(`${clientUrls.PATIENTS}/${userId}/${clientUrls.EVENTS}/${sourceId}`);
  };

  handleSetOffset = offset => this.setState({ offset });

  handleCreate = (eventsType) => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: EVENTS_CREATE, isSecondPanel: true, isDetailPanelVisible: false, isSubmit: false, isLoading: true, eventsType })
    this.context.router.history.push(`${clientUrls.PATIENTS}/${userId}/${clientUrls.EVENTS}/create`);
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
      isLoading: true,
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
        isLoading: true,
      }))
    } else {
      this.setState({ isSubmit: true });
    }
  };

  handleCreateCancel = () => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: EVENT_PANEL, isSecondPanel: false, isBtnExpandVisible: false, expandedPanel: 'all', isSubmit: false, isLoading: true, eventsType: '' });
    this.context.router.history.push(`${clientUrls.PATIENTS}/${userId}/${clientUrls.EVENTS}`);
  };

  handleSaveSettingsCreateForm = (formValues) => {
    const { actions, userId, eventsCreateFormState } = this.props;

    if (checkIsValidateForm(eventsCreateFormState)) {
      actions.fetchPatientEventsCreateRequest(this.formValuesToString(formValues, 'create'));
      this.context.router.history.push(`${clientUrls.PATIENTS}/${userId}/${clientUrls.EVENTS}`);
      this.hideCreateForm();
      this.setState({ isSubmit: false, isLoading: true });
    } else {
      this.setState({ isSubmit: true });
    }
  };

  formValuesToString = (formValues, formName) => {
    const { userId, eventDetail } = this.props;
    const sendData = {};

    sendData.userId = userId;

    sendData[valuesNames.NAME] = formValues[valuesNames.NAME];
    sendData[valuesNames.TYPE] = formValues[valuesNames.TYPE];
    sendData[valuesNames.DATE_TIME] = new Date(formValues[valuesNames.DATE_TIME]);
    sendData[valuesNames.DESCRIPTION] = formValues[valuesNames.DESCRIPTION];
    sendData[valuesNames.AUTHOR] = formValues[valuesNames.AUTHOR];

    if (formName === 'edit') {
      sendData[valuesNames.SOURCE_ID] = eventDetail[valuesNames.SOURCE_ID];
    }

    operationsOnCollection.propsToString(sendData, valuesNames.DATE_TIME);
    return sendData;
  };

  hideCreateForm = () => {
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: EVENT_PANEL, isSecondPanel: false })
  };

  handleShow = (name) => {
    this.setState({ openedPanel: name })
  };

  toggleViewVisibility = (currentView) => {
    this.setState({ activeView: currentView })
  };

  formToShowCollection = (collection) => {
    const { columnNameSortBy, sortingOrder, nameShouldInclude, valueEventsRange } = this.state;
    const timeOneDay = (24 * 60 * 60 * 1000) - 1;

    if (valueEventsRange.length) {
      collection = collection.filter(el => el[valuesNames.DATE_TIME] >= valueEventsRange[0] && el[valuesNames.DATE_TIME] <= valueEventsRange[1] + timeOneDay);
    }

    collection = operationsOnCollection.modificate(collection, [{
      keyFrom: valuesNames.DATE_TIME,
      keyTo: `${valuesNames.DATE_TIME}Convert`,
      fn: getDDMMMYYYY,
    }]);

    collection = operationsOnCollection.filterAndSort({
      collection,
      filterBy: nameShouldInclude,
      sortingByKey: columnNameSortBy,
      sortingByOrder: sortingOrder,
      filterKeys: [valuesNames.NAME, valuesNames.TYPE, `${valuesNames.DATE_TIME}Convert`],
    });

    return collection;
  };

  toggleTimelinesVisibility = () => {
    this.setState(prevState => ({ isTimelinesOpen: !prevState.isTimelinesOpen }));
    this.setDefaultRangeValues();
  };

  /* istanbul ignore next */
  onRangeChange(value) {
    this.setState({ valueEventsRange: value })
  }

  setDefaultRangeValues = () => {
    const { allEvents } = this.props;
    const renges = [];

    const minValueRange = (!_.isEmpty(allEvents)) ? new Date(Math.min(...allEvents.map(item => item.dateTime))).getTime() : 0;
    const maxValueRange = (!_.isEmpty(allEvents)) ? new Date(Math.max(...allEvents.map(item => item.dateTime))).getTime() : 0;

    renges.push(minValueRange, maxValueRange);

    this.onRangeChange(renges)
  };

  getCookie = (name) => {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  onClose = (data) => {
    const { socket, token, eventDetail } = this.props;
    console.log('onClose ---> ', data);
    // $scope.showJoinAppointment = null;
    if (data.appointmentId === eventDetail[valuesNames.SOURCE_ID]) {
      socket.emit('appointment:status', { appointmentId: eventDetail[valuesNames.SOURCE_ID], token });
      socket.emit('appointment:messages', { appointmentId: eventDetail[valuesNames.SOURCE_ID], token });
    }
  };

  onStatus = (data) => {
    const { eventDetail } = this.props;
    console.log('onStatus ---> ', data, data.appointmentId, ' == ', eventDetail[valuesNames.SOURCE_ID]);
    if (data.appointmentId === eventDetail[valuesNames.SOURCE_ID]) {
      const isClosed = data.isClosed;
    }
  };

  onMessages = (dt) => {
    const { userAccount } = this.props;
    const data = JSON.parse(JSON.stringify(dt));
    if (!data.appointment) return;
    const messages = data.messages.map((message) => {
      message.timestamp = moment(+message.timestamp).format('HH:mm');
      if (!message.author) {
        message.author = '';
      } else {
        const role = isIDCRRole(userAccount) ? 'doctor' : 'patient';
        const opponent = !isIDCRRole(userAccount) ? 'doctor' : 'patient';
        if (message.author == role) {
          message.author = 'You: ';
        } else {
          message.author = `${data.appointment[opponent]}: `;
        }
      }
      return message;
    });
    console.log('onMessages ---> ', messages);
  };

  popupCenter = (w, h) => {
    const dualScreenLeft = (window.screenLeft !== undefined) ? window.screenLeft : screen.left;
    const dualScreenTop = (window.screenTop !== undefined) ? window.screenTop : screen.top;

    const width = (window.innerWidth ? window.innerWidth : document.documentElement.clientWidth) ? document.documentElement.clientWidth : screen.width;
    const height = (window.innerHeight ? window.innerHeight : document.documentElement.clientHeight) ? document.documentElement.clientHeight : screen.height;

    const left = ((width / 2) - (w / 2)) + dualScreenLeft;
    const top = ((height / 2) - (h / 2)) + dualScreenTop;
    return `width=${w}, height=${h}, top=${top}, left=${left}`;
  };

  openPopup = (id) => {
    window.windowObjectReference = window.windowObjectReference || null;
    const center = this.popupCenter(972, 734);
    const options = `${center},resizable=yes,scrollbars=yes,status=yes,minimizable=yes,location=no`;
    if (window.windowObjectReference == null || window.windowObjectReference.closed) {
      window.windowObjectReference = window.open(`${window.location.origin}/videochat/videochat.html?appointmentId=${id}`,
        'Video Chat', options);
      window.windowObjectReference.focus();
    } else {
      window.windowObjectReference.focus();
    }
  };

  startAppointment = () => {
    const { socket } = this.state;
    const { eventDetail, userId } = this.props;
    console.log('startAppointment ===> ', eventDetail);
    if (!eventDetail) return;

    socket.emit('appointment:init', {
      patientId: userId,
      appointmentId: eventDetail[valuesNames.SOURCE_ID],
    });

    this.openPopup(eventDetail[valuesNames.SOURCE_ID]);
  };

  render() {
    const { selectedColumns, columnNameSortBy, sortingOrder, isSecondPanel, isDetailPanelVisible, isBtnExpandVisible, expandedPanel, openedPanel, isBtnCreateVisible, isCreatePanelVisible, editedPanel, offset, isSubmit, activeView, isLoading, eventsType, isTimelinesOpen, valueEventsRange } = this.state;
    const { allEvents, eventsDetailFormState, eventsCreateFormState, eventDetail } = this.props;

    const isPanelDetails = (expandedPanel === EVENTS_DETAIL || expandedPanel === EVENT_PANEL || expandedPanel === META_PANEL || expandedPanel === CHAT_PANEL);
    const isPanelMain = (expandedPanel === EVENTS_MAIN);
    const isPanelCreate = (expandedPanel === EVENTS_CREATE);

    const columnsToShowConfig = columnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);

    const filteredEvents = this.formToShowCollection(allEvents);

    const sourceId = (isDetailPanelVisible && !_.isEmpty(eventDetail)) ? eventDetail.sourceId : '';
    const eventsTimeline = (!_.isEmpty(allEvents)) ? modificateEventsArr(filteredEvents) : {};

    const minValueRange = valueEventsRange[0];
    const maxValueRange = valueEventsRange[1];

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
                activeView={activeView}
                toggleViewVisibility={this.toggleViewVisibility}
                isTimelinesOpen={isTimelinesOpen}
                toggleTimelinesVisibility={this.toggleTimelinesVisibility}
              />
              <EventsMainPanel
                headers={columnsToShowConfig}
                resourceData={allEvents}
                emptyDataMessage="No events"
                onHeaderCellClick={this.handleHeaderCellClick}
                onCellClick={this.handleDetailEventsClick}
                columnNameSortBy={columnNameSortBy}
                sortingOrder={sortingOrder}
                table="events"
                filteredData={filteredEvents}
                totalEntriesAmount={_.size(filteredEvents)}
                offset={offset}
                setOffset={this.handleSetOffset}
                isBtnCreateVisible={isBtnCreateVisible}
                onCreate={this.handleCreate}
                id={sourceId}
                eventsTimeline={eventsTimeline}
                activeView={activeView}
                isLoading={isLoading}
                eventsType={eventsType}
                isTimelinesOpen={isTimelinesOpen}
                onRangeChange={this.onRangeChange}
                minValueRange={minValueRange}
                maxValueRange={maxValueRange}
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
              isSubmit={isSubmit}
              startAppointment={this.startAppointment}
            />
          </Col> : null}
          {(expandedPanel === 'all' || isPanelCreate) && isCreatePanelVisible && !isDetailPanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <PluginCreate
              title={`Create - ${eventsType}`}
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
                <EventsCreateForm
                  isSubmit={isSubmit}
                  eventsType={eventsType}
                />
              }
            />
          </Col> : null}
        </Row>
      </div>
    </section>)
  }
}
