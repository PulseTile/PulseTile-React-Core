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
import OrdersCreateForm from './OrdersCreate/OrdersCreateForm';
import { columnsConfig, defaultColumnsSelected } from './table-columns.config'
import { valuesNames } from './forms.config';
import { fetchPatientOrdersRequest } from './ducks/fetch-patient-orders.duck';
import { fetchPatientOrdersDetailRequest } from './ducks/fetch-patient-orders-detail.duck';
import { fetchPatientOrdersCreateRequest } from './ducks/fetch-patient-orders-create.duck';
import { fetchListOrdersRequest } from './ducks/fetch-list-orders.duck';
import { fetchPatientOrdersOnMount, fetchPatientOrdersDetailOnMount, fetchListOrdersOnMount } from '../../../utils/HOCs/fetch-patients.utils';
import { patientOrdersSelector, patientOrdersDetailSelector, orderPanelFormSelector, ordersCreateFormStateSelector, listOrderSelector } from './selectors';
import { clientUrls } from '../../../config/client-urls.constants';
import OrdersDetail from './OrdersDetail/OrdersDetail';
import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';
import { checkIsValidateForm, operationsOnCollection } from '../../../utils/plugin-helpers.utils';

const ORDERS_MAIN = 'ordersMain';
const ORDERS_DETAIL = 'ordersDetail';
const ORDERS_CREATE = 'ordersCreate';
const ORDERS_PANEL = 'ordersPanel';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientOrdersRequest, fetchPatientOrdersDetailRequest, fetchPatientOrdersCreateRequest, fetchListOrdersRequest }, dispatch) });

@connect(patientOrdersSelector, mapDispatchToProps)
@connect(patientOrdersDetailSelector, mapDispatchToProps)
@connect(orderPanelFormSelector)
@connect(ordersCreateFormStateSelector)
@connect(listOrderSelector)
@compose(lifecycle(fetchPatientOrdersOnMount), lifecycle(fetchPatientOrdersDetailOnMount), lifecycle(fetchListOrdersOnMount))
export default class Orders extends PureComponent {
  static propTypes = {
    allOrders: PropTypes.arrayOf(PropTypes.object),
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
  };

  state = {
    nameShouldInclude: '',
    selectedColumns: defaultColumnsSelected,
    openedPanel: ORDERS_PANEL,
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
    chosenOrders: [],
  };

  componentWillReceiveProps() {
    const sourceId = this.context.router.route.match.params.sourceId;
    const userId = this.context.router.route.match.params.userId;

    //TODO should be implemented common function, and the state stored in the store Redux
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.ORDERS}/${sourceId}` && sourceId !== undefined) {
      this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.ORDERS}/create`) {
      this.setState({ isSecondPanel: true, isBtnExpandVisible: true, isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: ORDERS_CREATE, isDetailPanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.ORDERS}`) {
      this.setState({ isSecondPanel: false, isBtnExpandVisible: false, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: ORDERS_PANEL, isDetailPanelVisible: false, expandedPanel: 'all' })
    }

    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 500)
  }

  handleExpand = (name, currentPanel) => {
    if (currentPanel === ORDERS_MAIN) {
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

  handleDetailOrdersClick = (sourceId) => {
    const { actions, userId } = this.props;
    this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: ORDERS_PANEL, editedPanel: {}, expandedPanel: 'all', isLoading: true });
    actions.fetchPatientOrdersDetailRequest({ userId, sourceId });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.ORDERS}/${sourceId}`);
  };

  handleSetOffset = offset => this.setState({ offset });

  handleCreate = () => {
    const { actions, userId } = this.props;
    this.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: ORDERS_CREATE, isSecondPanel: true, isDetailPanelVisible: false, isBtnExpandVisible: true, expandedPanel: 'all', isSubmit: false, isLoading: true });
    actions.fetchListOrdersRequest();
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.ORDERS}/create`);
  };

  handleOrdersDetailCancel = (name) => {
    this.setState(prevState => ({
      editedPanel: {
        ...prevState.editedPanel,
        [name]: false,
      },
      isSubmit: false,
      isLoading: true,
    }))
  };

  handleCreateCancel = () => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: ORDERS_PANEL, isSecondPanel: false, isBtnExpandVisible: false, expandedPanel: 'all', isSubmit: false, isLoading: true });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.ORDERS}`);
  };

  handleSaveSettingsCreateForm = (formValues) => {
    const { actions, userId, ordersCreateFormState } = this.props;
    actions.fetchPatientOrdersCreateRequest(this.formValuesToString(formValues, 'create'));
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.ORDERS}`);
    this.hideCreateForm();
    this.setState({ isLoading: true });
  };

  formValuesToString = (formValues, formName) => {
    const { userId } = this.props;
    const { chosenOrders } = this.state;
    const sendData = {
      userId,
      ...chosenOrders,
    };

    return sendData;
  };

  hideCreateForm = () => {
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: ORDERS_PANEL, isSecondPanel: false, expandedPanel: 'all', isBtnExpandVisible: false })
  };

  formToShowCollection = (collection) => {
    const { columnNameSortBy, sortingOrder, nameShouldInclude } = this.state;

    collection = operationsOnCollection.modificate(collection, [{
      keyFrom: valuesNames.ORDER_DATE,
      keyTo: `${valuesNames.ORDER_DATE}Convert`,
      fn: getDDMMMYYYY,
    }]);

    return operationsOnCollection.filterAndSort({
      collection,
      filterBy: nameShouldInclude,
      sortingByKey: columnNameSortBy,
      sortingByOrder: sortingOrder,
      filterKeys: [valuesNames.NAME, `${valuesNames.ORDER_DATE}Convert`, valuesNames.SOURCE],
    });
  };

  setChosenOrders = (chosenOrders) => {
    this.setState({ chosenOrders })
  };

  render() {
    const { selectedColumns, columnNameSortBy, sortingOrder, isSecondPanel, isDetailPanelVisible, isBtnExpandVisible, expandedPanel, openedPanel, isBtnCreateVisible, isCreatePanelVisible, editedPanel, offset, isSubmit, isLoading, chosenOrders } = this.state;
    const { allOrders, orderDetail, ordersCreateFormState, listOrders } = this.props;

    const isPanelDetails = (expandedPanel === ORDERS_DETAIL || expandedPanel === ORDERS_PANEL);
    const isPanelMain = (expandedPanel === ORDERS_MAIN);
    const isPanelCreate = (expandedPanel === ORDERS_CREATE);

    const columnsToShowConfig = columnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);

    const filteredOrders = this.formToShowCollection(allOrders);

    let sourceId;
    if (!_.isEmpty(orderDetail)) {
      sourceId = orderDetail[valuesNames.SOURCE_ID];
    }

    return (<section className="page-wrapper">
      <div className={classNames('section', { 'full-panel full-panel-main': isPanelMain, 'full-panel full-panel-details': (isPanelDetails || isPanelCreate) })}>
        <Row>
          {(isPanelMain || expandedPanel === 'all') ? <Col xs={12} className={classNames({ 'col-panel-main': isSecondPanel })}>
            <div className="panel panel-primary">
              <PluginListHeader
                onFilterChange={this.handleFilterChange}
                panelTitle="Orders"
                isBtnExpandVisible={isBtnExpandVisible}
                isBtnTableVisible
                name={ORDERS_MAIN}
                onExpand={this.handleExpand}
                currentPanel={ORDERS_MAIN}
              />
              <PluginMainPanel
                headers={columnsToShowConfig}
                resourceData={allOrders}
                emptyDataMessage="No orders"
                onHeaderCellClick={this.handleHeaderCellClick}
                onCellClick={this.handleDetailOrdersClick}
                columnNameSortBy={columnNameSortBy}
                sortingOrder={sortingOrder}
                table="orders"
                filteredData={filteredOrders}
                totalEntriesAmount={_.size(filteredOrders)}
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
            <OrdersDetail
              onExpand={this.handleExpand}
              name={ORDERS_DETAIL}
              openedPanel={openedPanel}
              expandedPanel={expandedPanel}
              currentPanel={ORDERS_DETAIL}
              detail={orderDetail}
              editedPanel={editedPanel}
              onCancel={this.handleOrdersDetailCancel}
              isSubmit={isSubmit}
            />
          </Col> : null}
          {(expandedPanel === 'all' || isPanelCreate) && isCreatePanelVisible && !isDetailPanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <PluginCreate
              onExpand={this.handleExpand}
              name={ORDERS_CREATE}
              openedPanel={openedPanel}
              onShow={this.handleShow}
              expandedPanel={expandedPanel}
              currentPanel={ORDERS_CREATE}
              onSaveSettings={this.handleSaveSettingsCreateForm}
              formValues={ordersCreateFormState.values}
              onCancel={this.handleCreateCancel}
              isCreatePanelVisible={isCreatePanelVisible}
              componentForm={
                !_.isEmpty(listOrders) && <OrdersCreateForm
                  isSubmit={isSubmit}
                  listOrders={listOrders}
                  setChosenOrders={this.setChosenOrders}
                />
              }
              title="Create Orders"
            />
          </Col> : null}
        </Row>
      </div>
    </section>)
  }
}
