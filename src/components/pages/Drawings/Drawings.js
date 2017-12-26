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
import { fetchPatientDrawingsRequest } from './ducks/fetch-patient-drawings.duck';
import { fetchPatientDrawingsCreateRequest } from './ducks/fetch-patient-drawings-create.duck';
import { fetchPatientDrawingsDetailRequest } from './ducks/fetch-patient-drawings-detail.duck';
import { fetchPatientDrawingsDetailEditRequest } from './ducks/fetch-patient-drawings-detail-edit.duck';
import { fetchPatientDrawingsOnMount, fetchPatientDrawingsDetailOnMount } from '../../../utils/HOCs/fetch-patients.utils';
import { patientDrawingsSelector, drawingsDetailFormStateSelector, drawingsCreateFormStateSelector, drawingsFormStateSelector, patientDrawingsDetailSelector } from './selectors';
import { clientUrls } from '../../../config/client-urls.constants';
import { checkIsValidateForm, operationsOnCollection } from '../../../utils/plugin-helpers.utils';
import DrawingsDetail from './DrawingsDetail/DrawingsDetail';
import PluginCreate from '../../plugin-page-component/PluginCreate';
import DrawingsCreateForm from './DrawingsCreate/DrawingsCreateForm'
import DrawingsPaint from './drawings-page-component/DrawingsPaint';
import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';

const DRAWINGS_MAIN = 'drawingsMain';
const DRAWINGS_DETAIL = 'drawingsDetail';
const DRAWINGS_CREATE = 'drawingsCreate';
const DRAWING_PANEL = 'drawingPanel';
const DRAWING = 'drawing';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientDrawingsRequest, fetchPatientDrawingsCreateRequest, fetchPatientDrawingsDetailRequest, fetchPatientDrawingsDetailEditRequest }, dispatch) });

@connect(patientDrawingsSelector, mapDispatchToProps)
@connect(patientDrawingsDetailSelector, mapDispatchToProps)
@connect(drawingsDetailFormStateSelector)
@connect(drawingsCreateFormStateSelector)
@connect(drawingsFormStateSelector)
@compose(lifecycle(fetchPatientDrawingsOnMount), lifecycle(fetchPatientDrawingsDetailOnMount))

export default class Drawings extends PureComponent {
  static propTypes = {
    allDrawings: PropTypes.arrayOf(PropTypes.object),
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
  };

  state = {
    nameShouldInclude: '',
    selectedColumns: defaultColumnsSelected,
    openedPanel: DRAWING,
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
    drawingImage: '',
  };

  componentWillReceiveProps() {
    const sourceId = this.context.router.route.match.params.sourceId;
    const userId = this.context.router.route.match.params.userId;

    //TODO should be implemented common function, and the state stored in the store Redux
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.DRAWINGS}/${sourceId}` && sourceId !== undefined) {
      this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.DRAWINGS}/create`) {
      this.setState({ isSecondPanel: true, isBtnExpandVisible: true, isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: DRAWINGS_CREATE, isDetailPanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.DRAWINGS}`) {
      this.setState({ isSecondPanel: false, isBtnExpandVisible: false, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: DRAWING, isDetailPanelVisible: false, expandedPanel: 'all' })
    }

    /* istanbul ignore next */
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 500)
  }

  handleExpand = (name, currentPanel) => {
    if (currentPanel === DRAWINGS_MAIN) {
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

  handleDetailDrawingsClick = (sourceId) => {
    const { actions, userId } = this.props;
    this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: DRAWING, editedPanel: {}, expandedPanel: 'all', isLoading: true })
    actions.fetchPatientDrawingsDetailRequest({ userId, sourceId });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.DRAWINGS}/${sourceId}`);
  };

  handleSetOffset = offset => this.setState({ offset });

  handleCreate = () => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: DRAWINGS_CREATE, isSecondPanel: true, isDetailPanelVisible: false, isSubmit: false, isLoading: true })
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.DRAWINGS}/create`);
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

  handleDrawingDetailCancel = (name) => {
    this.setState(prevState => ({
      editedPanel: {
        ...prevState.editedPanel,
        [name]: false,
      },
      isSubmit: false,
      isLoading: false,
    }))
    if (name === DRAWING_PANEL) {
      this.setState({ isLoading: true })
    }
  };

  handleSaveSettingsDetailForm = (formValues, name) => {
    const { actions, drawingsDetailFormState } = this.props;
    if (checkIsValidateForm(drawingsDetailFormState)) {
      actions.fetchPatientDrawingsDetailEditRequest(this.formValuesToString(formValues, 'edit'));
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
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: DRAWING, isSecondPanel: false, isBtnExpandVisible: false, expandedPanel: 'all', isSubmit: false, isLoading: true });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.DRAWINGS}`);
  };

  handleSaveSettingsCreateForm = (formValues) => {
    const { actions, userId, drawingsCreateFormState } = this.props;

    if (checkIsValidateForm(drawingsCreateFormState)) {
      actions.fetchPatientDrawingsCreateRequest(this.formValuesToString(formValues, 'create'));
      this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.DRAWINGS}`);
      this.hideCreateForm();
      this.setState({ isSubmit: false, isLoading: true });
    } else {
      this.setState({ isSubmit: true });
    }
  };

  formValuesToString = (formValues, formName) => {
    const { userId, drawingDetail, drawingsDetailFormState, drawingsCreateFormState } = this.props;
    const { drawingImage } = this.state;
    const sendData = {};

    sendData.userId = userId;

    if (!_.isEmpty(drawingsDetailFormState) || formName === 'create') {
      sendData[valuesNames.NAME] = formValues[valuesNames.NAME];
      sendData[valuesNames.AUTHOR] = formValues[valuesNames.AUTHOR];
    }

    if (!_.isEmpty(drawingsDetailFormState)) {
      sendData[valuesNames.DRAWING] = drawingDetail[valuesNames.DRAWING];
      sendData[valuesNames.SOURCE_ID] = drawingDetail[valuesNames.SOURCE_ID];
    }

    if (drawingImage.length) {
      sendData[valuesNames.DRAWING] = drawingImage;
      if (_.isEmpty(drawingsDetailFormState) && _.isEmpty(drawingsCreateFormState)) {
        sendData[valuesNames.NAME] = drawingDetail[valuesNames.NAME];
        sendData[valuesNames.AUTHOR] = drawingDetail[valuesNames.AUTHOR];
        sendData[valuesNames.SOURCE_ID] = drawingDetail[valuesNames.SOURCE_ID];
      }
    }

    operationsOnCollection.propsToString(sendData);
    return sendData;
  };

  hideCreateForm = () => {
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: DRAWING, isSecondPanel: false })
  };

  handleShow = (name) => {
    this.setState({ openedPanel: name })
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
      filterKeys: [valuesNames.NAME, `${valuesNames.DATE_CREATED}Convert`, valuesNames.SOURCE],
    });
  };

  onChangeImageCanvas = (canvasImage) => {
    this.setState({ drawingImage: canvasImage })
  };

  render() {
    const { selectedColumns, columnNameSortBy, sortingOrder, isSecondPanel, isDetailPanelVisible, isBtnExpandVisible, expandedPanel, openedPanel, isBtnCreateVisible, isCreatePanelVisible, editedPanel, offset, isSubmit, isLoading } = this.state;
    const { allDrawings, drawingsDetailFormState, drawingsCreateFormState, drawingsFormState, drawingDetail } = this.props;

    const isPanelDetails = (expandedPanel === DRAWINGS_DETAIL || expandedPanel === DRAWING || expandedPanel === DRAWING_PANEL);
    const isPanelMain = (expandedPanel === DRAWINGS_MAIN);
    const isPanelCreate = (expandedPanel === DRAWINGS_CREATE);

    const columnsToShowConfig = columnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);

    const filteredDrawings = this.formToShowCollection(allDrawings);

    let sourceId;
    if (!_.isEmpty(drawingDetail)) {
      sourceId = drawingDetail.sourceId;
    }

    return (<section className="page-wrapper">
      <div className={classNames('section', { 'full-panel full-panel-main': isPanelMain, 'full-panel full-panel-details': (isPanelDetails || isPanelCreate) })}>
        <Row>
          {(isPanelMain || expandedPanel === 'all') ? <Col xs={12} className={classNames({ 'col-panel-main': isSecondPanel })}>
            <div className="panel panel-primary">
              <PluginListHeader
                onFilterChange={this.handleFilterChange}
                panelTitle="Drawings"
                isBtnExpandVisible={isBtnExpandVisible}
                isBtnTableVisible={false}
                name={DRAWINGS_MAIN}
                onExpand={this.handleExpand}
                currentPanel={DRAWINGS_MAIN}
              />
              <PluginMainPanel
                headers={columnsToShowConfig}
                resourceData={allDrawings}
                emptyDataMessage="No drawings"
                onHeaderCellClick={this.handleHeaderCellClick}
                onCellClick={this.handleDetailDrawingsClick}
                columnNameSortBy={columnNameSortBy}
                sortingOrder={sortingOrder}
                table="drawings"
                filteredData={filteredDrawings}
                totalEntriesAmount={_.size(filteredDrawings)}
                offset={offset}
                setOffset={this.handleSetOffset}
                isBtnCreateVisible={isBtnCreateVisible}
                onCreate={this.handleCreate}
                id={sourceId}
                isLoading={isLoading}
              />
            </div>
          </Col> : null}
          {(expandedPanel === 'all' || isPanelDetails) && isDetailPanelVisible && !isCreatePanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <DrawingsDetail
              onExpand={this.handleExpand}
              name={DRAWINGS_DETAIL}
              openedPanel={openedPanel}
              onShow={this.handleShow}
              expandedPanel={expandedPanel}
              currentPanel={DRAWINGS_DETAIL}
              detail={drawingDetail}
              onEdit={this.handleEdit}
              editedPanel={editedPanel}
              onCancel={this.handleDrawingDetailCancel}
              onSaveSettings={this.handleSaveSettingsDetailForm}
              drawingsDetailFormValues={drawingsDetailFormState.values}
              drawingsFormValues={drawingsFormState.values}
              isSubmit={isSubmit}
              onChangeImageCanvas={this.onChangeImageCanvas}
            />
          </Col> : null}
          {(expandedPanel === 'all' || isPanelCreate) && isCreatePanelVisible && !isDetailPanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <PluginCreate
              title="Create Drawing"
              onExpand={this.handleExpand}
              name={DRAWINGS_CREATE}
              openedPanel={openedPanel}
              onShow={this.handleShow}
              expandedPanel={expandedPanel}
              currentPanel={DRAWINGS_CREATE}
              onSaveSettings={this.handleSaveSettingsCreateForm}
              formValues={drawingsCreateFormState.values}
              onCancel={this.handleCreateCancel}
              isCreatePanelVisible={isCreatePanelVisible}
              componentForm={
                <div>
                  <DrawingsPaint
                    onChangeImageCanvas={this.onChangeImageCanvas}
                  />
                  <DrawingsCreateForm isSubmit={isSubmit} />
                </div>
              }
            />
          </Col> : null}
        </Row>
      </div>
    </section>)
  }
}
