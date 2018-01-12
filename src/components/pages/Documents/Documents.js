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
import { fetchPatientDocumentsRequest } from './ducks/fetch-patient-documents.duck';
import { fetchPatientDocumentsDetailRequest } from './ducks/fetch-patient-documents-detail.duck';
import {fetchPatientDocumentsOnMount, fetchPatientDocumentsDetailOnMount} from '../../../utils/HOCs/fetch-patients.utils';
import { patientDocumentsSelector, patientDocumentsDetailSelector } from './selectors';
import { clientUrls } from '../../../config/client-urls.constants';
import { operationsOnCollection } from '../../../utils/plugin-helpers.utils';
import DocumentsDetail from './DocumentsDetail/DocumentsDetail';
import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';

const DOCUMENTS_MAIN = 'documentsMain';
const DOCUMENTS_DETAIL = 'documentsDetail';
const DOCUMENT_PANEL = 'documentPanel';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientDocumentsRequest, fetchPatientDocumentsDetailRequest }, dispatch) });

@connect(patientDocumentsSelector, mapDispatchToProps)
@connect(patientDocumentsDetailSelector, mapDispatchToProps)
@compose(lifecycle(fetchPatientDocumentsOnMount), lifecycle(fetchPatientDocumentsDetailOnMount))
export default class Documents extends PureComponent {
  static propTypes = {
    allDocuments: PropTypes.arrayOf(PropTypes.object),
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
  };

  state = {
    nameShouldInclude: '',
    selectedColumns: defaultColumnsSelected,
    openedPanel: DOCUMENT_PANEL,
    columnNameSortBy: valuesNames.TYPE,
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
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.DOCUMENTS}/${sourceId}` && sourceId !== undefined) {
      this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.DOCUMENTS}`) {
      this.setState({ isSecondPanel: false, isBtnExpandVisible: false, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: DOCUMENT_PANEL, isDetailPanelVisible: false, expandedPanel: 'all' })
    }

    /* istanbul ignore next */
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 500)
  }

 handleExpand = (name, currentPanel) => {
   if (currentPanel === DOCUMENTS_MAIN) {
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

  handleDetailDocumentsClick = (sourceId) => {
    const { actions, userId } = this.props;
    this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, openedPanel: DOCUMENT_PANEL, editedPanel: {}, expandedPanel: 'all', isLoading: true })
    actions.fetchPatientDocumentsDetailRequest({ userId, sourceId });
    this.context.router.history.push(`${clientUrls.PATIENTS}/${userId}/${clientUrls.DOCUMENTS}/${sourceId}`);
  };

  handleSetOffset = offset => this.setState({ offset });

  handleCreate = () => {};

  handleEdit = (name) => {
    this.setState(prevState => ({
      editedPanel: {
        ...prevState.editedPanel,
        [name]: true,
      },
      isSubmit: false,
    }))
  };

  handleDocumentDetailCancel = (name) => {
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
      keyFrom: valuesNames.DATE_CREATED,
      keyTo: `${valuesNames.DATE_CREATED}Convert`,
      fn: getDDMMMYYYY
    }]);

    return operationsOnCollection.filterAndSort({
      collection: collection,
      filterBy: nameShouldInclude,
      sortingByKey: columnNameSortBy,
      sortingByOrder: sortingOrder,
      filterKeys: [valuesNames.TYPE, `${valuesNames.DATE_CREATED}Convert`, valuesNames.SOURCE]
    });
  };

  render() {
    const { selectedColumns, columnNameSortBy, sortingOrder, isSecondPanel, isDetailPanelVisible, isBtnExpandVisible, expandedPanel, openedPanel, editedPanel, offset, isSubmit, isLoading } = this.state;
    const { allDocuments, documentDetail, userId } = this.props;

    const isPanelDetails = (expandedPanel === DOCUMENTS_DETAIL || expandedPanel === DOCUMENT_PANEL);
    const isPanelMain = (expandedPanel === DOCUMENTS_MAIN);

    const columnsToShowConfig = columnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);

    const filteredDocuments = this.formToShowCollection(allDocuments);

    let sourceId;
    if (!_.isEmpty(documentDetail)) {
      sourceId = documentDetail.sourceId;
    }

    return (<section className="page-wrapper">
      <div className={classNames('section', { 'full-panel full-panel-main': isPanelMain, 'full-panel full-panel-details': (isPanelDetails) })}>
        <Row>
          {(isPanelMain || expandedPanel === 'all')
            ? <Col xs={12} className={classNames({ 'col-panel-main': isSecondPanel })}>
              <div className="panel panel-primary">
                <PluginListHeader
                  onFilterChange={this.handleFilterChange}
                  panelTitle="Documents"
                  isBtnExpandVisible={isBtnExpandVisible}
                  isBtnTableVisible={false}
                  name={DOCUMENTS_MAIN}
                  onExpand={this.handleExpand}
                  currentPanel={DOCUMENTS_MAIN}
                />
                <PluginMainPanel
                  headers={columnsToShowConfig}
                  resourceData={allDocuments}
                  emptyDataMessage="No documents"
                  onHeaderCellClick={this.handleHeaderCellClick}
                  onCellClick={this.handleDetailDocumentsClick}
                  columnNameSortBy={columnNameSortBy}
                  sortingOrder={sortingOrder}
                  table="documents"
                  filteredData={filteredDocuments}
                  totalEntriesAmount={_.size(filteredDocuments)}
                  offset={offset}
                  setOffset={this.handleSetOffset}
                  onCreate={this.handleCreate}
                  id={sourceId}
                  isLoading={isLoading}
                />
              </div>
            </Col> : null}
          {(expandedPanel === 'all' || isPanelDetails) && isDetailPanelVisible
            ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
              <DocumentsDetail
                onExpand={this.handleExpand}
                name={DOCUMENTS_DETAIL}
                openedPanel={openedPanel}
                onShow={this.handleShow}
                expandedPanel={expandedPanel}
                currentPanel={DOCUMENTS_DETAIL}
                detail={documentDetail}
                onEdit={this.handleEdit}
                editedPanel={editedPanel}
                onCancel={this.handleDocumentDetailCancel}
                onSaveSettings={this.handleSaveSettingsDetailForm}
                isSubmit={isSubmit}
                userId={userId}
              />
            </Col> : null}
        </Row>
      </div>
    </section>)
  }
}
