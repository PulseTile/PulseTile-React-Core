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
import FeedsCreateForm from './FeedsCreate/FeedsCreateForm';
import { columnsConfig, defaultColumnsSelected } from './table-columns.config'
import { valuesNames } from './forms.config';
import { fetchFeedsRequest } from './ducks/fetch-feeds.duck';
import { fetchFeedsDetailRequest } from './ducks/fetch-feeds-detail.duck';
import { fetchFeedsDetailEditRequest } from './ducks/fetch-feeds-detail-edit.duck';
import { fetchFeedsCreateRequest } from './ducks/fetch-feeds-create.duck';
import { fetchFeedsOnMount, fetchFeedsDetailOnMount } from '../../../utils/HOCs/fetch-patients.utils';
import { feedsSelector, feedsDetailSelector, feedPanelFormSelector, feedCreateFormStateSelector } from './selectors';
import { clientUrls } from '../../../config/client-urls.constants';
import FeedsDetail from './FeedsDetail/FeedsDetail';
import { checkIsValidateForm, operationsOnCollection } from '../../../utils/plugin-helpers.utils';

const FEEDS_MAIN = 'feedsMain';
const FEEDS_DETAIL = 'feedsDetail';
const FEEDS_CREATE = 'feedsCreate';
const FEEDS_PANEL = 'feedsPanel';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchFeedsRequest, fetchFeedsDetailRequest, fetchFeedsDetailEditRequest, fetchFeedsCreateRequest }, dispatch) });

@connect(feedsSelector, mapDispatchToProps)
@connect(feedsDetailSelector, mapDispatchToProps)
@connect(feedPanelFormSelector)
@connect(feedCreateFormStateSelector)
@compose(lifecycle(fetchFeedsOnMount), lifecycle(fetchFeedsDetailOnMount))
export default class Feeds extends PureComponent {
  static propTypes = {
    feeds: PropTypes.arrayOf(PropTypes.object),
    feedsDetail: PropTypes.arrayOf(PropTypes.object),
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
  };

  state = {
    nameShouldInclude: '',
    selectedColumns: defaultColumnsSelected,
    openedPanel: FEEDS_PANEL,
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
    // isLoading: true,
  };

  componentWillReceiveProps() {
    const sourceId = this.context.router.route.match.params.sourceId;

    //TODO should be implemented common function, and the state stored in the store Redux
    if (this.context.router.history.location.pathname === `${clientUrls.USER_PROFILE}/${clientUrls.FEEDS}/${sourceId}` && sourceId !== undefined) {
      this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.USER_PROFILE}/${clientUrls.FEEDS}/create`) {
      this.setState({ isSecondPanel: true, isBtnExpandVisible: true, isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: FEEDS_CREATE, isDetailPanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.USER_PROFILE}/${clientUrls.FEEDS}`) {
      this.setState({ isSecondPanel: false, isBtnExpandVisible: false, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: FEEDS_PANEL, isDetailPanelVisible: false, expandedPanel: 'all' })
    }

    /* istanbul ignore next */
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 500)
  }

  handleExpand = (name, currentPanel) => {
    if (currentPanel === FEEDS_MAIN) {
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

  handleDetailFeedsClick = (sourceId) => {
    const { actions } = this.props;
    this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: FEEDS_PANEL, editedPanel: {}, expandedPanel: 'all', isLoading: false });
    actions.fetchFeedsDetailRequest({ sourceId });
    // this.context.router.history.push(`${clientUrls.USER_PROFILE}/${clientUrls.FEEDS}/${sourceId}`);
  };

  handleSetOffset = offset => this.setState({ offset });

  handleCreate = () => {
    this.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: FEEDS_CREATE, isSecondPanel: true, isDetailPanelVisible: false, isBtnExpandVisible: true, expandedPanel: 'all', isSubmit: false, isLoading: true });
    // this.context.router.history.push(`${clientUrls.USER_PROFILE}/${clientUrls.FEEDS}/create`);
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

  handleFeedsDetailCancel = (name) => {
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
    const { actions, feedFormState } = this.props;
    if (checkIsValidateForm(feedFormState)) {
      actions.fetchFeedsDetailEditRequest(this.formValuesToString(formValues, 'edit'));
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
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: FEEDS_PANEL, isSecondPanel: false, isBtnExpandVisible: false, expandedPanel: 'all', isSubmit: false, isLoading: true });
    // this.context.router.history.push(`${clientUrls.USER_PROFILE}/${clientUrls.FEEDS}`);
  };

  handleSaveSettingsCreateForm = (formValues) => {
    const { actions, feedCreateFormState } = this.props;
    if (checkIsValidateForm(feedCreateFormState)) {
      actions.fetchFeedsCreateRequest(this.formValuesToString(formValues, 'create'));
      // this.context.router.history.push(`${clientUrls.USER_PROFILE}/${clientUrls.FEEDS}`);
      this.hideCreateForm();
      this.setState({ isLoading: true });
    } else {
      this.setState({ isSubmit: true });
    }
  };

  formValuesToString = (formValues, formName) => {
    const { feedsDetail } = this.props;
    const sendData = {};
    sendData[valuesNames.NAME] = formValues[valuesNames.NAME];
    sendData[valuesNames.LANDING_PAGE_URL] = formValues[valuesNames.LANDING_PAGE_URL];
    sendData[valuesNames.RSS_FEED_URL] = formValues[valuesNames.RSS_FEED_URL];
    sendData[valuesNames.AUTHOR] = formValues[valuesNames.AUTHOR];
    if (formName === 'edit') {
      sendData[valuesNames.SOURCE_ID] = feedsDetail[valuesNames.SOURCE_ID];
    }

    operationsOnCollection.propsToString(sendData, valuesNames.DATE_CREATED);
    return sendData;
  };

  hideCreateForm = () => {
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: FEEDS_PANEL, isSecondPanel: false, expandedPanel: 'all', isBtnExpandVisible: false })
  };

  formToShowCollection = (collection) => {
    const { columnNameSortBy, sortingOrder, nameShouldInclude } = this.state;

    return operationsOnCollection.filterAndSort({
      collection: collection,
      filterBy: nameShouldInclude,
      sortingByKey: columnNameSortBy,
      sortingByOrder: sortingOrder,
      filterKeys: [valuesNames.NAME, valuesNames.LANDING_PAGE_URL]
    });
  };

  render() {

    const { selectedColumns, columnNameSortBy, sortingOrder, isSecondPanel, isDetailPanelVisible, isBtnExpandVisible, expandedPanel, openedPanel, isBtnCreateVisible, isCreatePanelVisible, editedPanel, offset, isSubmit, isLoading } = this.state;
    const { feeds, feedsDetail, feedFormState, feedCreateFormState } = this.props;
    const isPanelDetails = (expandedPanel === FEEDS_DETAIL || expandedPanel === FEEDS_PANEL);
    const isPanelMain = (expandedPanel === FEEDS_MAIN);
    const isPanelCreate = (expandedPanel === FEEDS_CREATE);
    const columnsToShowConfig = columnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);
    const filteredFeeds = this.formToShowCollection(feeds);

    let sourceId;
    if (isDetailPanelVisible && !_.isEmpty(feedsDetail)) {
      sourceId = feedsDetail[valuesNames.SOURCE_ID];
    }

    return (<section className="page-wrapper">
      <div className={classNames('section', { 'full-panel full-panel-main': isPanelMain, 'full-panel full-panel-details': (isPanelDetails || isPanelCreate) })}>
        <Row>
          {(isPanelMain || expandedPanel === 'all') ? <Col xs={12} className={classNames({ 'col-panel-main': isSecondPanel })}>
            <div className="panel panel-primary">
              <PluginListHeader
                onFilterChange={this.handleFilterChange}
                panelTitle="List"
                isBtnExpandVisible={isBtnExpandVisible}
                isBtnTableVisible={false}
                name={FEEDS_MAIN}
                onExpand={this.handleExpand}
                currentPanel={FEEDS_MAIN}
              />
              <PluginMainPanel
                headers={columnsToShowConfig}
                resourceData={feeds}
                emptyDataMessage="No feeds"
                onHeaderCellClick={this.handleHeaderCellClick}
                onCellClick={this.handleDetailFeedsClick}
                columnNameSortBy={columnNameSortBy}
                sortingOrder={sortingOrder}
                table="feeds"
                filteredData={filteredFeeds}
                totalEntriesAmount={_.size(filteredFeeds)}
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
            <FeedsDetail
              onExpand={this.handleExpand}
              name={FEEDS_DETAIL}
              openedPanel={openedPanel}
              expandedPanel={expandedPanel}
              currentPanel={FEEDS_DETAIL}
              detail={feedsDetail}
              onEdit={this.handleEdit}
              editedPanel={editedPanel}
              onCancel={this.handleFeedsDetailCancel}
              onSaveSettings={this.handleSaveSettingsDetailForm}
              feedFormValues={feedFormState.values}
              isSubmit={isSubmit}
            />
          </Col> : null}
          {(expandedPanel === 'all' || isPanelCreate) && isCreatePanelVisible && !isDetailPanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <PluginCreate
              onExpand={this.handleExpand}
              name={FEEDS_CREATE}
              openedPanel={openedPanel}
              onShow={this.handleShow}
              expandedPanel={expandedPanel}
              currentPanel={FEEDS_CREATE}
              onSaveSettings={this.handleSaveSettingsCreateForm}
              formValues={feedCreateFormState.values}
              onCancel={this.handleCreateCancel}
              isCreatePanelVisible={isCreatePanelVisible}
              componentForm={
                <FeedsCreateForm isSubmit={isSubmit} />
              }
              title="Create Feed"
            />
          </Col> : null}
        </Row>
      </div>
    </section>)
  }
}
